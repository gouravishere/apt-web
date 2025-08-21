const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {["I Want to Invest", "I Know My Goal"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded ${
            activeTab === tab
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
