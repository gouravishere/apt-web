import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/fullSizeBlogPic.jpg";
import MultiArticleCard from "../../components/BlogsArticles/MultiArticleCard";
import Button from "../../components/Button/Button";
import FAQs from "../../components/HomePage/FAQs/FAQs";

import HeadingBreadCrumb from "../../components/HeadingBreadCrumb/HeadingBreadCrumb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils";
import Markdown from "react-markdown";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const token = process.env.REACT_APP_BLOGS_TOKEN;

const customRenderers = {
  p: ({ children }) => (
    <p className="text-[16px] font-[400] mt-[80px] text-neutral-900 leading-[32px]">
      {children}
    </p>
  ),
};

const BlogDetails = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const articlesPerPage = 8;
  const blogId = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId?.blogId]);

  const paginatedArticles = blogs?.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const location = useLocation();
  const blog = location.state;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/blogs/?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBlogs(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog: {blog?.Title} - Tax & Business Insights | Ezyfiling</title>
        <meta
          name="description"
          content={`Read this detailed blog on ${blog?.Title} to understand key financial and business concepts. Powered by Ezyfiling experts.`}
        />
        <meta
          name="keywords"
          content="tax insights, business blog, GST tips, income tax articles, ezyfiling blog"
        />
      </Helmet>
      <div className="max-w-[1440px] mx-auto">
        <HeadingBreadCrumb
          excludePaths={[blog.Title.replaceAll(" ", "%20")]}
          isId={false}
          heading={blog?.Title}
          subHeading={blog?.subTitle}
        />
        <div className="flex flex-col items-center justify-center">
          <img
            className="rounded-[24px]  w-full max-h-[463px] object-cover object-center "
            src={`${process.env.REACT_APP_STRAPI_URL}${blog.Image?.url}` || avatar}
            alt=""
          />
          <div className=" mx-auto">
            <p className="text-[16px] font-[400] mt-[80px] text-neutral-900 leading-[32px]">
              <Markdown components={customRenderers}>{blog.body}</Markdown>
            </p>

            <hr className="bg-neutral-300 border-0 h-[1px] my-5" />
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {blog?.services?.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-neutral-200 cursor-pointer  px-3 py-1 rounded-full text-xs "
                  >
                    {tag?.name?.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="text-slate-600 text-sm font-normal leading-snug">
                {blog?.author?.name} • {formatDate(blog?.publishedAt)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center text-slate-500 text-[32px] font-medium mt-[120px] leading-10">
            Our Blogs
          </div>
          <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-[40px]">
            {paginatedArticles?.slice(0, 4)?.map((article, index) => (
              <MultiArticleCard
                key={index}
                imageUrl={
                  `${process.env.REACT_APP_STRAPI_URL}${article.Image?.url}` ||
                  "/default-image.jpg"
                }
                title={article.Title}
                blog={article}
                userImage={
                  `${process.env.REACT_APP_STRAPI_URL}${article.Image?.url}` ||
                  "/default-image.jpg"
                }
                name={article?.author?.name}
                date={formatDate(article.createdAt)}
                tags={article?.services?.map((service) => service?.name)}
              />
            ))}
          </div>
          <div className="mt-[40px]  flex justify-center">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate("/blog")}
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

export default BlogDetails;
