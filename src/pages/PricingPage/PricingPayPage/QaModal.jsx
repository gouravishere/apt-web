import { useState } from "react";
import Button from "../../../components/Button/Button";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";

export default function QAModal({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const handleChange = (value) => {
    setResponses((prev) => {
      const updatedResponses = [...prev];
      updatedResponses[currentIndex] = {
        key: questions[currentIndex].key,
        value: value,
      };
      return updatedResponses;
    });
  };

  const handleNext = () => {
    if (!responses[currentIndex]?.value) return; // Prevent empty answer submission

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(responses);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex justify-center items-center p-4 z-50 min-h-screen">
      <div className="bg-white rounded-xl absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 my-auto h-[270px] flex flex-col shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentIndex + 1} .
        </h2>
        <div className="mt-2">
          <label className="block text-gray-700 font-medium mb-1">
            {questions[currentIndex].label}
          </label>
          {questions[currentIndex].format === "MM/YYYY" ? (
            <div className="relative w-full h-20 ">
              <div className="absolute w-full z-50 left-0">
                <DatePicker
                  selected={
                    responses[currentIndex]?.value
                      ? dayjs(responses[currentIndex]?.value).format("YYYY-MM")
                      : ""
                  }
                  onChange={(date) => {
                    if (date) {
                      // Set date to the 3rd of the selected month
                      const newDate = dayjs(date).set("date", 3).toDate();
                      handleChange(newDate.toISOString());
                    }
                  }}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  minDate={(responses?.[0] && currentIndex === 1) ? dayjs(responses?.[0]?.value).add(1, 'month').format("YYYY-MM") : dayjs().subtract(5, "year").format("YYYY-MM")} // 5 
                  maxDate={dayjs().add(5, "year").format("YYYY-MM")}
                  className="w-full  border mt-2 z-[1000] border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-0"
                  wrapperClassName="w-full z-[1000]"
                  popperClassName="bg-white border z-[1000] border-gray-200 rounded-lg shadow-lg"
                  calendarClassName="rasta-stripes bg-red-300"
                />
              </div>
              {/* <input
                type="month"
                className="w-full border rounded p-2"
                value={
                  responses[currentIndex]?.value
                    ? dayjs(responses[currentIndex]?.value).format("YYYY-MM")
                    : ""
                }
                // 1 year in the future
                onChange={(e) =>
                  handleChange(dayjs(`${e.target.value}-01`).toISOString())
                }
              /> */}
            </div>
          ) : (
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter your answer"
              value={responses[currentIndex]?.value || ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
        </div>

        <div className="flex gap-4 self-end mt-auto justify-between">
          {currentIndex !== 0 && (
            <Button
              className="ml-auto"
              variant="outline"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </Button>
          )}
          {responses[currentIndex] ? (
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={!responses[currentIndex]?.value}
            >
              {currentIndex < questions.length - 1 ? "Next" : "Submit"}
            </Button>
          ) : (
            <Button
              variant="disabled"
              disabled={!responses[currentIndex]?.value}
            >
              {currentIndex < questions.length - 1 ? "Next" : "Submit"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
