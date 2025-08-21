import axiosInstance from './axiosInstance'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom'; // If using React Router

const handlePayment = async ({
  planId,
  couponCode,
  questionAnswers,
  navigate,
  setIsLoading,
  razorpayKey,
  onSuccessRedirect,
  onFailureRedirect,
  prefillDetails,
  themeColor,
}) => {
  setIsLoading(true);

  try {
    // Create an order
    const orderData = await axiosInstance.post("/leads", {
      planId,
      couponCode,
      questionAnswers,
    });

    if (!orderData?.data?.data?.orderId && orderData?.status === 201) {
      navigate(onFailureRedirect || "/dashboard?non-fix");
      return;
    }

    setIsLoading(false);

    // Razorpay options
    const options = {
      key: razorpayKey, // Your Razorpay API Key
      amount: orderData.data.data.amount, // Amount in paise
      currency: orderData.data.data.currency,
      name: "APT Global",
      description: "Test Transaction",
      order_id: orderData.data.data.orderId, // Order ID generated on the backend
      handler: async function (response) {
        setIsLoading(true);
        try {
          await axiosInstance.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          setIsLoading(false);
          navigate(onSuccessRedirect || "/dashboard?status=COMPLETED");
        } catch (error) {
          setIsLoading(false);
          console.error(error);
          navigate(onFailureRedirect || "/dashboard?status=FAILED");
        }
      },
      theme: {
        color: themeColor || "#fedc60",
      },
      modal: {
        ondismiss: function () {
          navigate(onFailureRedirect || "/dashboard?status=FAILED");
        },
      },
    };

    // Initialize Razorpay
    const rzp = new window.Razorpay(options);
    if (orderData?.data?.data?.orderId) {
      rzp.open();

      rzp.on("payment.failed", async function (response) {
        try {
          await axiosInstance.post("/payments/failed", {
            razorpay_order_id: response.error.metadata.order_id,
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  } catch (error) {
    setIsLoading(false);
    console.error(error);
    navigate(onFailureRedirect || "/dashboard?status=FAILED");
  }
};

export default handlePayment;