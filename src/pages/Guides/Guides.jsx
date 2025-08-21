import React, { useEffect, useState } from "react";
import MultiSelectTabs from "../../components/MultiSelectTabs/MultiSelectTabs";
import Pagination from "../../components/Pagination/Pagination";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import GuideArticleCard from "../../components/GuideArticleCard/GuideArticleCard";
import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import GuideSideLogo from "../../assets/icons/guideSideLogo.svg";
import axios from "axios";

const token = process.env.REACT_APP_BLOGS_TOKEN;

const Guide = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [guide, setGuide] = useState(null);
  const articlesPerPage = 8; // Customize this value
  const totalPages = Math.ceil(guide?.length / articlesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedArticles = guide?.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!selectedServices) {
          console.error("No selected services");
        }
        const response1 = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/services/${selectedServices}/?populate=guides.image`,
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
  }, [selectedServices]);


  const handleSelect = (selected) => {
    setSelectedServices(selected);
  };

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedServices([categories[0].documentId]);
    }
  }, []);



  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="relative">
          <HeadingBreadCrumb
            heading={
              <span className="relative flex items-center">
                <span>Gu</span>
                <span className="relative inline-block">
                  i
                  <span
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-yellow-500 rounded-full 
          w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3"
                  ></span>
                </span>
                <span>des</span>
                {/* Image */}
                <img
                  src={GuideSideLogo}
                  className="absolute top-[-21px] left-[calc(100%+6px)] sm:left-[calc(100%+12px)] md:left-[calc(100%+16px)] w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16"
                  alt="Guide Side Logo"
                />
              </span>
            }
            description={
              "Your Complete Resource for Understanding Tax Regulations and Setting Up Your Business Successfully"
            }
          />
        </div>
        <div className="">
          <div className="flex flex-col gap-10">
            <MultiSelectTabs
              options={categories}
              allowMultiSelect={false}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedArticles?.map((article, index) => (
                <GuideArticleCard
                  key={index}
                  imageUrl={
                    `${process.env.REACT_APP_STRAPI_URL}${article?.image?.[0].url}` ||
                    "/default-image.jpg"
                  }
                  title={article.title.length > 85 ? article.title?.slice(0,85) + "..." : article.title}
                  tags={article.tags}
                  guide={article}
                  serviceId={categories.filter((data) => selectedServices.includes(data.documentId))}
                />
              ))}
            </div>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div></div>
        <div>
          <FAQs />
        </div>
      </div>
    </>
  );
};

export default Guide;
