const Results = ({ results }) => {
  return (
    <div className="bg-green-100 p-4 rounded mt-6 w-full max-w-lg">
      <h3 className="text-xl font-bold mb-4">Calculation Results</h3>
      {Object.keys(results).map((key) => (
        <p key={key} className="text-gray-700">
          <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
          {results[key]}
        </p>
      ))}
    </div>
  );
};

export default Results;
