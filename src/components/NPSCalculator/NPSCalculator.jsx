import React, { useState } from "react";
import Tabs from "./Tabs";
import InputForm from "./InputForm";
import Results from "./Results";

const NPSCalculator = () => {
  const [activeTab, setActiveTab] = useState("I Want to Invest");
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">NPS Calculator</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <InputForm activeTab={activeTab} setResults={setResults} />
      {results && <Results results={results} />}
    </div>
  );
};

export default NPSCalculator;
