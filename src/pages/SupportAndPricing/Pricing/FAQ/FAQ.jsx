import { useState } from "react";
import Accordion from "../../../../components/Accordion/Accordion";
import { jobOpenings } from "../../../../components/HomePage/FAQs/dummyData";

export default function FAQ(){
    const [openIndex, setOpenIndex] = useState(null);
        const handleToggle = (index) => {
            setOpenIndex(openIndex === index ? null : index);
        };
    return <div>
        <div>
            <div>
            <div className="flex justify-center w-full mt-52 mb-16 mx-10">
        <div className="text-3xl font-medium ">
          <span>Frequently asked quest</span>
          <span className="relative ">
            i
            <span className="absolute left-1 -translate-x-1 bg-yellow-500 rounded-full w-2 h-2.5"></span>
          </span>ons
        </div>
      </div>
            </div>
        <div className="space-y-6 mx-16">
                        {jobOpenings?.map((ele, i) => (
                            <Accordion
                                key={i}
                                heading={ele?.title}
                                isOpen={openIndex === i}
                                onToggle={() => handleToggle(i)}
                                containerClass="border-b-[1px] border-b-neutral-400"
                                titleClass="text-base py-4 px-4"
                                childClass="pl-4 py-2"
                            >
                                <p>{ele?.desc}</p>
                            </Accordion>
                        ))}
                    </div>
        </div>
    </div>
  }