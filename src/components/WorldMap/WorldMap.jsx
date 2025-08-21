import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";

const mapURL = "https://unpkg.com/world-atlas@2.0.2/land-110m.json";

const markers = [
  {
    id: "marker-1",
    coordinates: [77.209, 28.6139],
    address: "Delhi, India: Connaught Place, New Delhi, 110001",
  },
  {
    id: "marker-2",
    coordinates: [-74.006, 40.7128],
    address: "New York, USA",
  },
  {
    id: "marker-3",
    coordinates: [78.4744, 17.385044],
    address: "Hyderabad, India: Banjara Hills, 500034",
  },
  {
    id: "marker-4",
    coordinates: [73.8567, 18.5204],
    address: "Pune, India: Shivaji Nagar, 411005",
  },
];


const MapChart = () => {
  return (
    <div className="w-full h-full mt-28">
      {/* Define a dotted pattern for the land */}
      <svg style={{ width: 0, height: 0 }}>
        <defs>
          <pattern
            id="dottedPattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="3" fill="lightgray" />
          </pattern>
        </defs>
      </svg>

      <ComposableMap
        projection="geoMercator"
        className="w-full h-[90vh] rounded-md"
      >
        <Geographies geography={mapURL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "url(#dottedPattern)", // Use the dotted pattern for land fill
                    stroke: "none", // Remove borders
                  },
                  hover: {
                    fill: "url(#dottedPattern)",
                  },
                  pressed: {
                    fill: "url(#dottedPattern)",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* Add markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinates={marker.coordinates}
            data-tooltip-id={marker.id}
            data-tooltip-content={marker.address}
          >
            <circle
              r={6}
              fill="#F00"
              stroke="#fff"
              strokeWidth={2}
              className="fill-blue-500 hover:fill-blue-700 cursor-pointer"
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Add tooltips */}
      {markers.map((marker) => (
        <ReactTooltip
          key={marker.id}
          id={marker.id}
          place="top"
          content={marker.address}
        />
      ))}
    </div>
  );
};

export default memo(MapChart);
