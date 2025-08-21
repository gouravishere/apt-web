import React, { useEffect } from "react";
import Container from "../../../components/Container/Container";
import DescriptionHeading from "../DashboardComponents/DescriptionHeading/DescriptionHeading";
import DashBoardHeading from "../DashboardComponents/DashBoardHeading/DashboardHeading";
import DetailedCard from "../DashboardComponents/DetailedCard/DetailedCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCreatedLeadData,
  getMyLeads,
} from "../../../redux/ServiceDetailsSlice/ServiceDetailsSlice";
import { CONSTANTS } from "../../PricingPage/PricingConstant";
import Heading from "../../../components/Heading/Heading";
import dayjs from "dayjs";
import SmallLoading from "../../../components/LoadingSpinner/SmallLoading";

const ServicesTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AllLeads = useSelector((state) => state?.Leads?.myLeadData.data);
  const isLoading = useSelector((state) => state?.Leads?.loading);

  useEffect(() => {
    dispatch(getMyLeads());
  }, [dispatch]);

  useEffect(() => {
    dispatch(emptyCreatedLeadData());
  }, [dispatch]);

  const detailsCard = (i) => {
    return [
      {
        label: "Started On",
        content: AllLeads?.leads?.[i]?.startDate
          ? dayjs(AllLeads?.leads?.[i]?.startDate).format("DD MMM YYYY")
          : dayjs(AllLeads?.leads?.[i]?.createdAt).format("DD MMM YYYY"),
      },
      {
        label: "Country",
        content: AllLeads?.leads?.[i]?.plan?.service?.countries?.[0]?.name,
      },
      {
        label: "Last Updated on",
        content: dayjs(AllLeads?.leads?.[i]?.updatedAt).format("DD MMM YYYY"),
      },
    ];
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <DashBoardHeading heading={"Services"} />

      <Container>
        <DescriptionHeading heading={"Active Services"} />

        {isLoading && (
          <div className="py-10">
            <SmallLoading />
          </div>
        )}

        {AllLeads?.leads?.filter((data) => data.status !== "CLOSED")?.length !==
        0 ? (
          AllLeads?.leads
            ?.filter((data) => data.status !== "CLOSED")
            ?.map((data, index) => (
              <DetailedCard
                key={data._id}
                progressStatus={"Please upload your pending documents here."}
                percentage={data.documentProgress.percentage}
                heading={CONSTANTS[data?.plan?.name] || data?.plan?.name || ""}
                idNumber={`#${data?.leadNo}`}
                details={detailsCard(index)}
                FirstButtonText={"Upload Documents"}
                onFirstClick={() =>
                  navigate(`/dashboard/services/service-details/${data?._id}`)
                }
                loaderColor={
                  data?.documentProgress?.percentage === 100
                    ? "green-500"
                    : "primary-500"
                }
              />
            ))
        ) : (
          <Heading weight="medium" size={"xl"}>
            No Active Services
          </Heading>
        )}
      </Container>

      <Container>
        <div className="flex justify-between w-full items-center">
          <DescriptionHeading heading={"Past Services"} />
        </div>
        {AllLeads?.leads?.filter((data) => data.status === "CLOSED").length >
        0 ? (
          AllLeads?.leads
            ?.filter((data) => data.status === "CLOSED")
            ?.map((data, index) => (
              <DetailedCard
                key={data._id}
                status={data.status}
                progressStatus={`Service completed on the ${dayjs(
                  data.endDate
                ).format("DD MMM, YYYY")}`}
                percentage={data.documentProgress.percentage}
                heading={CONSTANTS[data?.plan?.name] || data?.plan?.name}
                idNumber={`#${data.leadNo}`}
                details={detailsCard(index)}
                FirstButtonText={"View Details"}
                onFirstClick={() =>
                  navigate(`/dashboard/services/service-details/${data._id}`)
                }
                loaderColor={
                  data.documentProgress.percentage === 100
                    ? "green-500"
                    : "primary-500"
                }
              />
            ))
        ) : (
          <Heading weight="medium" size={"xl"}>
            No Past Services
          </Heading>
        )}
      </Container>
    </div>
  );
};

export default ServicesTab;
