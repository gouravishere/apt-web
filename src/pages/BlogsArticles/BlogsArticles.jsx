import React, { Suspense, useEffect, useState } from "react";
import MultiSelectTabs from "../../components/MultiSelectTabs/MultiSelectTabs";
import ArticleCard from "../../components/BlogsArticles/ArticleCard";
import SmallArticleCard from "../../components/BlogsArticles/SmallArticleCard";
import MultiArticleCard from "../../components/BlogsArticles/MultiArticleCard";
import Pagination from "../../components/Pagination/Pagination";
import BlogLightning from "../../assets/icons/BlogsLight.svg";
import FAQs from "../../components/HomePage/FAQs/FAQs";
import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import Banner from "../../components/Banner/Banner";
import axios from "axios";
import { formatDate } from "../../utils";

const token = process.env.REACT_APP_BLOGS_TOKEN;

const BlogsArticles = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bottomBlogs, setBottomBlogs] = useState([]);
  const [fetauredBlogs, setFetauredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;
  const totalPages = Math.ceil(bottomBlogs?.length / articlesPerPage);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedArticles = bottomBlogs?.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSelect = (selected) => {
    setSelectedServices(selected);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedServices([categories[0].documentId]);
    }
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCategories(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setBottomLoading(true);
      try {
        const response1 = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/blogs/?populate=*&filters[categories][documentId][$eq]=${selectedServices}&filters[featured][featured][$eq]=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response2 = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/blogs/?populate=*&filters[categories][documentId][$eq]=${selectedServices}&filters[featured][$null]=true
 `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const blogs1 = response1?.data?.data || []; // Featured blogs
        const blogs2 = response2?.data?.data || []; // All blogs in the category
        setFetauredBlogs(blogs1);
        setBottomBlogs(blogs2);
        setBottomLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please try again later.");
        setBottomLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedServices]);

  return (
    <>
      {/* {loading && bottomLoading && <LoadingSpinner/>} */}
      <div className="">
        <HeadingBreadCrumb
          leftDesign={true}
          designCloud={true}
          heading="Blogs & Articles"
          description={
            " Dive into expert opinions, emerging trends, success stories, and actionable insights for smarter financial decisions"
          }
        />
        <div className="">
          <div className="flex flex-col gap-10 ">
            <MultiSelectTabs options={categories} onSelect={handleSelect} />
            <div className="flex flex-col gap-4">
              <p className="text-lg font-medium"> Featured Articles</p>
              <div className="lg:grid lg:grid-cols-5 lg:grid-rows-3 md:grid md:grid-cols-5 md:grid-rows-3 sm:flex sm:flex-col mobile:flex mobile:flex-col  gap-2">
                <div className="col-span-3 row-span-3 h-full">
                  {fetauredBlogs?.[0] && (
                    <ArticleCard
                      key={fetauredBlogs?.[0]?.id}
                      blog={fetauredBlogs[0]}
                      name={fetauredBlogs?.[0]?.author?.name}
                      imageUrl={
                        `${process.env.REACT_APP_STRAPI_URL}${fetauredBlogs?.[0]?.Image?.url}` ||
                        "/default-image.jpg"
                      }
                      title={fetauredBlogs?.[0]?.Title}
                      description={fetauredBlogs?.[0]?.subTitle}
                      readTime={formatDate(fetauredBlogs?.[0]?.createdAt)}
                      tags={fetauredBlogs?.[0]?.categories?.map(
                        (service) => service.name
                      )}
                    />
                  )}
                </div>

                <div className="col-span-2 col-start-4">
                  {fetauredBlogs?.[1] && (
                    <SmallArticleCard
                      imageUrl={
                        `${process.env.REACT_APP_STRAPI_URL}${fetauredBlogs?.[1]?.Image?.url}` ||
                        "/default-image.jpg"
                      }
                      title={fetauredBlogs?.[1]?.Title}
                      blog={fetauredBlogs[1]}
                      name={fetauredBlogs?.[1]?.author?.name}
                      date={formatDate(fetauredBlogs?.[1]?.createdAt)}
                      tags={fetauredBlogs?.[1]?.categories?.map(
                        (service) => service?.name
                      )}
                    />
                  )}
                </div>

                <div className="col-span-2 col-start-4 row-start-2">
                  {fetauredBlogs?.[2] && (
                    <SmallArticleCard
                      imageUrl={
                        `${process.env.REACT_APP_STRAPI_URL}${fetauredBlogs?.[2]?.Image?.url}` ||
                        "/default-image.jpg"
                      }
                      title={fetauredBlogs?.[2]?.Title}
                      blog={fetauredBlogs[2]}
                      name={fetauredBlogs?.[2]?.author?.name}
                      date={formatDate(fetauredBlogs?.[2]?.createdAt)}
                      tags={fetauredBlogs?.[2]?.categories?.map(
                        (service) => service?.name
                      )}
                    />
                  )}
                </div>
                <div className="col-span-2 col-start-4 row-start-3">
                  {fetauredBlogs?.[3] && (
                    <SmallArticleCard
                      imageUrl={
                        `${process.env.REACT_APP_STRAPI_URL}${fetauredBlogs?.[3]?.Image?.url}` ||
                        "/default-image.jpg"
                      }
                      title={fetauredBlogs?.[3]?.Title}
                      blog={fetauredBlogs[3]}
                      name={fetauredBlogs?.[3]?.author?.name}
                      date={formatDate(fetauredBlogs?.[3]?.createdAt)}
                      tags={fetauredBlogs?.[3]?.categories?.map(
                        (service) => service?.name
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-medium"> Our Latest Post</p>
            <div className="lg:grid gap-6 md:grid-cols-2 lg:grid-cols-4 sm:flex sm:flex-col mobile:flex mobile:flex-col">
              {paginatedArticles?.map((article) => (
                <MultiArticleCard
                  key={article.id || article.documentId} // Use a unique identifier as the key
                  imageUrl={
                    article.Image?.url
                      ? `${process.env.REACT_APP_STRAPI_URL}${article.Image.url}`
                      : "/default-image.jpg" // Correctly handle fallback image
                  }
                  title={article.Title || "Untitled"} // Handle missing title
                  blog={article}
                  name={article?.author?.name || "Anonymous"} // Provide a fallback for author name
                  date={
                    article.createdAt
                      ? formatDate(article.createdAt)
                      : "Unknown Date"
                  } // Handle missing date
                  tags={
                    article.categories?.map((service) => service?.name) || []
                  } // Ensure tags are an array
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <img
              alt=""
              src={BlogLightning}
              className="absolute -left-24 top-0"
            />
          </div>
        </div>
        <div>
          <Banner />
        </div>
        <div>
          <FAQs />
        </div>
      </div>
    </>
  );
};

export default BlogsArticles;
