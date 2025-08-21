import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import { formatDate } from "../../utils";

import Button from "../../components/Button/Button";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import Markdown from "react-markdown";
import GuideArticleCard from "../../components/GuideArticleCard/GuideArticleCard";
import { Helmet } from "react-helmet-async";

const token = process.env.REACT_APP_BLOGS_TOKEN;

const customRenderers = {
  p: ({ children }) => (
    <p className="text-[16px] font-[400] mt-[80px] text-neutral-900 leading-[32px]">
      {children}
    </p>
  ),
};

const GuideDetailsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [guide, setGuide] = useState([]);
  const blogId = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  const location = useLocation();
  const guideData = location.state;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response1 = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/services/${guideData?.serviceId}/?populate=guides.image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const guide = response1.data.data?.guides;
        setGuide(guide);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Guide: {guideData.title} - Step-by-Step Tax & Business Help |
          Ezyfiling
        </title>
        <meta
          name="description"
          content={`Learn everything about ${guideData.title} with our expert guide designed for simplified understanding. Only on Ezyfiling.`}
        />
        <meta
          name="keywords"
          content="step-by-step tax guide, business help, GST information, income tax guidance, ezyfiling resources"
        />
      </Helmet>
      <div className="max-w-[1440px] mx-auto">
        <HeadingBreadCrumb
          excludePaths={[guideData.title.replaceAll(" ", "%20")]}
          isId={false}
          heading={guideData?.Title}
          subHeading={guideData?.subTitle}
        />
        <div className="flex flex-col items-center justify-center">
          <img
            className="rounded-[24px]  w-full max-h-[463px] object-cover object-center "
            src={
              `${process.env.REACT_APP_STRAPI_URL}${guideData?.image?.[0].url}` ||
              "/default-image.jpg"
            }
            alt=""
          />
          <div className=" mx-auto">
            <p className="text-[16px] font-[400] mt-[80px] text-neutral-900 leading-[32px]">
              <Markdown components={customRenderers}>{guideData.body}</Markdown>
            </p>

            <hr className="bg-neutral-300 border-0 h-[1px] my-5" />
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {guideData?.services?.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-neutral-200 cursor-pointer  px-3 py-1 rounded-full text-xs "
                  >
                    {tag?.name?.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="text-slate-600 text-sm font-normal leading-snug">
                {formatDate(guideData.publishedAt)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center text-slate-500 text-[32px] font-medium mt-[120px] leading-10">
            More Guides
          </div>
          <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-[40px]">
            {guide?.map((article, index) => (
              <GuideArticleCard
                key={index}
                imageUrl={
                  `${process.env.REACT_APP_STRAPI_URL}${article?.image?.[0].url}` ||
                  "/default-image.jpg"
                }
                title={article.title}
                tags={article.tags}
                guide={article}
              />
            ))}
          </div>
          <div className="mt-[40px]  flex justify-center">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate("/guide")}
            >
              View More
            </Button>
          </div>
        </div>

        <FAQs />
      </div>
    </>
  );
};

export default GuideDetailsPage;
