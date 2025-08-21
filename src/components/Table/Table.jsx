import React from "react";

const Table = ({ headers, data, onClick, clickable = false }) => {
  const handleRowClick = (rowData) => {
    if (onClick) {
      onClick(rowData);
    }
  };

  return (
    <div className="text-nowrap overflow-x-auto border border-neutral-200 rounded-[16px]">
      <table className="min-w-full table-auto rounded-[16px] overflow-hidden border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers?.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-neutral-200 text-left text-neutral-900 text-sm font-medium font-['Poppins'] leading-[21px]"
              >
                {header?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {clickable ? (
                <tr
                  onClick={clickable ? () => handleRowClick(row) : null}
                  className="hover:bg-gray-50"
                >
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border-b border-neutral-200 text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px] cursor-pointer"
                    >
                      {row[header?.key]}
                    </td>
                  ))}
                </tr>
              ) : (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border-b border-neutral-200 text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]"
                    >
                      {row[header?.key]}
                    </td>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
