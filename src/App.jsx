import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ReactGA from "react-ga4";

import PrivateRoute from "./utils/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import BlogsArticles from "./pages/BlogsArticles/BlogsArticles";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import Layout from "./Layout";
import Calculators from "./pages/Calculators/Calculators";
import HraCalculator from "./pages/Calculators/HraCalculator/HraCalculator";
import NSCcalculator from "./pages/Calculators/NSCcalculator/NSCcalculator";
import NPScalculator from "./pages/Calculators/NPScalculator/NPScalculator";
import OldAndNewTaxRegime from "./pages/Calculators/OldAndNewTaxRegime/OldAndNewTaxRegime";
import SIPCalculatorPage from "./pages/Calculators/SIPCalculator/SIPCalculator";
import HomeloanCalculator from "./pages/Calculators/HomeloanCalculator/HomeloanCalculator";
import HomeRentReceipt from "./pages/Calculators/HomeRentReceipt/HomeRentReceipt";
import GratuityCalculator from "./pages/Calculators/GratuityCalculator/GratuityCalculator";
import IncomeTaxCalculator from "./pages/Calculators/IncomeTaxCalculator/IncomeTaxCalculator";
import Dashboard from "./pages/Dashboard/Dashboard";
import LeadDetailsPage from "./pages/LeadDetailsPage/LeadDetailsPage";
import ServicesTab from "./pages/Dashboard/ServicesTab/ServicesTab";
import DashboardTab from "./pages/Dashboard/DashboardTab/DashboardTab";
import DashBoardSettingTab from "./pages/Dashboard/DashBoardSettingTab/DashBoardSettingTab";
import UserSupportTab from "./pages/Dashboard/UserSupportTab/UserSupportTab";
import PaymentTab from "./pages/Dashboard/PaymentTab/PaymentTab";
import DocumentsTab from "./pages/Dashboard/DocumentsTab/DocumentsTab";
import TicketDetails from "./pages/TicketDetails/TicketDetails";
import FrequentlyAskedQuestions from "./pages/SupportAndPricing/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import Contact from "./pages/SupportAndPricing/ContactUS/ContactUs";
import Pricing from "./pages/SupportAndPricing/Pricing/Pricing";
import Guides from "./pages/Guides/Guides";
import ServiceDetailsPage from "./pages/ServiceDetailsPage/ServiceDetailsPage";
import PricingPage from "./pages/PricingPage/PricingPage";
import PartnerRegister from "./pages/PartnerRegisterPage/PartnerRegister/PartnerRegister";
import PartnerPage from "./pages/PartnerPage/PartnerPage";
import Service from "./pages/ServiceDetail/Service";
import { useDispatch, useSelector } from "react-redux";
import GuideDetailsPage from "./pages/GuideDetailsPage/GuideDetailsPage";
import PricingPayPage from "./pages/PricingPage/PricingPayPage/PricingPayPage";
import UrlList from "./components/UrlList/UrlList";
import { getUserDetails } from "./redux/authSlice/authSlice";
import { metaData } from "./utils/meteData";
import TermsAndConditions from "./pages/T&C/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import CancellationPolicy from "./pages/CancellationPolicy/CancellationPolicy";
import { fetchUnseenNotifications } from "./redux/NotificationSlice/NotificationSlice";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const AdminPage = React.lazy(() => import("./pages/AdminPage/AdminPage"));
const ConsultantPage = React.lazy(() =>
  import("./pages/ConsultantPage/ConsultantPage")
);
const UserPage = React.lazy(() => import("./pages/UserPage/UserPage"));
const UnauthorizedPage = React.lazy(() =>
  import("./pages/UnauthorizedPage/UnauthorizedPage")
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const UserProfilePage = React.lazy(() =>
  import("./pages/UserProfilePage/UserProfilePage")
);
const ProductDetailPage = React.lazy(() =>
  import("./pages/ProductDetailPage/ProductDetailPage")
);
const ServerErrorPage = React.lazy(() =>
  import("./pages/ServerErrorPage/ServerErrorPage")
);

const RedirectDashboard = ({ path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  }, [navigate, path]);
  return null;
};

const App = () => {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user = "user",
    userDetails,
  } = useSelector((state) => state.auth);
  const [startTime, setStartTime] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const entryTime = Date.now();
    setStartTime(entryTime);

    return () => {
      const exitTime = Date.now();
      const timeSpent = (exitTime - entryTime) / 1000;
      ReactGA.event({
        category: "User Engagement",
        action: "Time Spent on Page",
        label: location.pathname,
        value: userDetails?.user?.fullName
          ? `${userDetails?.user?.fullName} with email ${userDetails?.user?.email} spent ${timeSpent} seconds`
          : `User not logged in spent ${timeSpent} seconds`,
      });
    };
  }, [
    location.pathname,
    userDetails?.user?.email,
    userDetails?.user?.fullName,
  ]);

  useEffect(() => {
    // dispatch(fetchUnseenNotifications());
  }, []);

  useEffect(() => {
    isAuthenticated && dispatch(getUserDetails());
  }, [dispatch, isAuthenticated]);

  const currentMeta = metaData[location.pathname] || {
    title: "Ezyfiling - Simplifying Your Financial Journey",
    description: "Ezyfiling provides expert financial and compliance services.",
    keywords: "ezyfiling, tax, compliance",
  };

  return (
    <HelmetProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Helmet>
          <title>{currentMeta.title}</title>
          <meta name="description" content={currentMeta.description} />
          <meta name="keywords" content={currentMeta.keywords} />
        </Helmet>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<VerifyOtp />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/dashbaord"
            element={
                <RedirectDashboard path={"/dashboard"} />
            }
          />

          <Route path="/" element={<HomePage />} />

          <Route path="/partner" element={<PartnerRegister />} />

          <Route to="/" element={<Layout />}>
            <Route path="/blog" element={<BlogsArticles />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />{" "}
            {/* Dynamic meta in component */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/consultant"
              element={
                <PrivateRoute roles={["consultant"]}>
                  <ConsultantPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute roles={["user"]}>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <PrivateRoute roles={["admin", "consultant", "user"]}>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <PrivateRoute roles={["admin", "user"]}>
                  <ProductDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={["admin", "user"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<DashboardTab />} />
              <Route
                path="services/service-details/:leadId?"
                element={<ServiceDetailsPage />}
              />
              <Route path="services" element={<ServicesTab />} />
              <Route path="documents" element={<DocumentsTab />} />
              <Route path="payments" element={<PaymentTab />} />
              <Route path="user-support" element={<UserSupportTab />} />
              <Route path="user-support/:id" element={<TicketDetails />} />
              <Route path="settings" element={<DashBoardSettingTab />} />
            </Route>
            <Route
              path="/Dashboard/income-tax-return-file"
              element={<LeadDetailsPage />}
            />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/hra" element={<HraCalculator />} />
            <Route path="/calculators/nsc" element={<NSCcalculator />} />
            <Route path="/calculators/nps" element={<NPScalculator />} />
            <Route path="/calculators/sip" element={<SIPCalculatorPage />} />
            <Route
              path="/calculators/old-and-new-tax-regime"
              element={<OldAndNewTaxRegime />}
            />
            <Route
              path="/calculators/home-loan-emi"
              element={<HomeloanCalculator />}
            />
            <Route
              path="/calculators/home-rent-receipt"
              element={<HomeRentReceipt />}
            />
            <Route
              path="/calculators/gratuity"
              element={<GratuityCalculator />}
            />
            <Route
              path="/calculators/income-tax"
              element={<IncomeTaxCalculator />}
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route
              path="/pay-card"
              element={
                <PrivateRoute roles={["admin", "consultant", "user"]}>
                  <PricingPayPage />
                </PrivateRoute>
              }
            />
            <Route path="/FAQs" element={<FrequentlyAskedQuestions />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/supportandpricing/pricing" element={<Pricing />} />
            <Route path="/guide" element={<Guides />} />
            <Route path="/guide/:id" element={<GuideDetailsPage />} />{" "}
            {/* Dynamic meta in component */}
            <Route path="/url-list" element={<UrlList />} />
            <Route
              path="/service/:countryName/:serviceName"
              element={<Service />}
            />
            <Route path="/partnerpage" element={<PartnerPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/error" element={<ServerErrorPage />} />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
