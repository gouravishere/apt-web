import React from "react";
import Tree from "react-d3-tree";

const orgChart = {
  name: "CEO",
  attributes: { department: "Executive" },
  children: [
    {
      name: "VP of Sales",
      attributes: { department: "Sales" },
      children: [
        {
          name: "Sales Manager 1",
          attributes: { department: "North Region" },
        },
        {
          name: "Sales Manager 2",
          attributes: { department: "South Region" },
        },
      ],
    },
    {
      name: "VP of Marketing",
      attributes: { department: "Marketing" },
      children: [
        {
          name: "Marketing Manager 1",
          attributes: { department: "Digital Marketing" },
          children: [
            {
              name: "Content Specialist",
              attributes: { department: "Content Creation" },
            },
            {
              name: "SEO Specialist",
              attributes: { department: "SEO Optimization" },
            },
          ],
        },
        {
          name: "Marketing Manager 2",
          attributes: { department: "Branding" },
        },
      ],
    },
    {
      name: "VP of Engineering",
      attributes: { department: "Engineering" },
      children: [
        {
          name: "Engineering Manager 1",
          attributes: { department: "Software Development" },
        },
        {
          name: "Engineering Manager 2",
          attributes: { department: "Hardware Development" },
        },
      ],
    },
  ],
};

const CustomNode = ({ nodeDatum }) => (
  <g>
    {/* Square Box */}
    <rect
      width="100"
      height="100"
      x="-50"
      y="-50"
      fill="lightblue"
      stroke="black"
      strokeWidth="2"
    />
    {/* Image inside the box */}
    <image
      href="https://cdn-icons-png.flaticon.com/512/149/149071.png"
      x="-25"
      y="-25"
      width="50"
      height="50"
    />
    {/* Text inside the box */}
    <text x="0" y="40" textAnchor="middle" fontSize="14" fill="black">
      {nodeDatum.name}
    </text>
    <text x="0" y="60" textAnchor="middle" fontSize="12" fill="black">
      {nodeDatum.attributes.department}
    </text>
  </g>
);

export default function OrgChartTree() {
  return (
    <div id="treeWrapper" className="border-4 flex justify-center items-center">
      <Tree
        data={orgChart}
        // zoomable={false}
        // draggable={false}
        // collapsible={false}
        orientation="vertical"
        pathFunc="diagonal"
        nodeSize={{ x: 250, y: 150 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
      />
    </div>
  );
}
