import React from "react";
import Carousel from "../../Carousel/Carousel";
import TestimonialCard from "../../TestimonialCard/TestimonialCard";
const Testimonial = () => {
  const testimonialData = {
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with a valid image URL
    name: "John Doe",
    title: "CEO",
    company: "Tech Innovations Ltd.",
    quote:
      "This product revolutionized our workflow and improved productivity significantly!",
  };
  const testimonialData2 = {
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with a valid image URL
    name: "John Doe",
    title: "CEO",
    company: "Tech Innovations Ltd.",
    quote: "This product revolutionized our workflow!",
  };
  const CustomComponent1 = () => (
    <div className="  ">
      <TestimonialCard
        image={testimonialData2.image}
        name={testimonialData2.name}
        title={testimonialData2.title}
        company={testimonialData2.company}
        quote={testimonialData2.quote}
      />
    </div>
  );

  const CustomComponent2 = () => (
    <div className="  ">
      <TestimonialCard
        image={testimonialData.image}
        name={testimonialData.name}
        title={testimonialData.title}
        company={testimonialData.company}
        quote={testimonialData.quote}
      />
    </div>
  );

  const CustomComponent3 = () => (
    <div className="  ">
      <TestimonialCard
        image={testimonialData.image}
        name={testimonialData.name}
        title={testimonialData.title}
        company={testimonialData.company}
        quote={testimonialData.quote}
      />
    </div>
  );

  const components = [
    <CustomComponent1 />,
    <CustomComponent2 />,
    <CustomComponent3 />,
  ];
  return (
    <div className="flex flex-col py-20 gap-24">
      <div className="text-[32px] font-medium text-center">
        What people says about us
      </div>
      <div className="">
        <Carousel components={components} autoPlay={true} interval={3000} />
      </div>
    </div>
  );
};

export default Testimonial;
