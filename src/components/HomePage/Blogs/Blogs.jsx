import React, { useEffect, useState } from "react";
import Button from "../../Button/Button";
import spark from "../../../assets/icons/sparkle.svg";
import MultiArticleCard from "../../BlogsArticles/MultiArticleCard";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils";
import axios from "axios";

const token = process.env.REACT_APP_BLOGS_TOKEN

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/blogs/?populate=*`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
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
    <div className="flex flex-col gap-16 my-24 ">
      <div className="relative text-[32px] font-medium text-center">
        Blog and articles
        <img
          className="absolute w-8 h-8 -top-3 left-[51%] rotate-[-43deg]"
          src={spark}
          alt=""
        />
      </div>
      <div className="xl:px-[120px] lg:px-[90px] md:px-[50px] sm:px-[30px] p-1">
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-[40px]">
          {blogs?.slice(0, 4).map((article, index) => (
            <MultiArticleCard
              key={index}
              imageUrl={`${process.env.REACT_APP_STRAPI_URL}${article.Image?.url}`}
              title={article.Title}
              name={article?.author?.name}
              blog={article}
              date={formatDate(article.createdAt)}
              tags={article.services?.map((service) => service?.name)}
              duration={`${Math.ceil(
                article.body?.split(" ").length / 200
              )} min read`}
            />
          ))}
        </div>
      </div>
      <div
        onClick={() => navigate("/blog")}
        className="flex flex-col gap-3 items-center"
      >
        <Button variant="outline" size="md">
          Read all Blogs
        </Button>
      </div>
    </div>
  );
};

export default Blogs;
