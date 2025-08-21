import React from "react";
import OrgChart from "react-orgchart";
import "../../App.css";
import "react-orgchart/index.css";

const OrgTree = () => {
  const itCompanyOrg = {
    name: "CEO",
    actor: "Alice Johnson",
    children: [
      {
        name: "CTO",
        actor: "Bob Smith",
        children: [
          {
            name: "Engineering Manager",
            actor: "Charlie Brown",
            children: [
              {
                name: "Frontend Developer",
                actor: "Eve White",
              },
              {
                name: "Backend Developer",
                actor: "Frank Black",
              },
              {
                name: "DevOps Engineer",
                actor: "Grace Green",
              },
            ],
          },
          {
            name: "QA Manager",
            actor: "Diana Blue",
            children: [
              {
                name: "QA Tester",
                actor: "Harry Yellow",
              },
            ],
          },
        ],
      },
      {
        name: "CFO",
        actor: "Emma Davis",
        children: [
          {
            name: "Accountant",
            actor: "Isla Brown",
          },
          {
            name: "Financial Analyst",
            actor: "Jack Wilson",
          },
        ],
      },
      {
        name: "COO",
        actor: "Oliver Taylor",
        children: [
          {
            name: "Operations Manager",
            actor: "Liam Martin",
            children: [
              {
                name: "HR Specialist",
                actor: "Sophia Clark",
              },
              {
                name: "Recruiter",
                actor: "Mia Adams",
              },
            ],
          },
        ],
      },
    ],
  };

  const MyNodeComponent = ({ node }) => {
    return (
      <div className="initechNode tooltip">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="avatar"
          alt="Avatar"
        />
        <br />
        <span className="font-bold">{node.actor}</span>
        <br />
        <span className="text-gray-400 text-xs">{node.name}</span>
        <div className="tooltiptext">
          {node.name}: {node.actor}
        </div>
      </div>
    );
  };

  return (
    <div id="initechOrgChart" className="">
      <OrgChart tree={itCompanyOrg} NodeComponent={MyNodeComponent} />
    </div>
  );
};

export default OrgTree;
