import React, { useMemo, useState, useEffect } from "react";
import { Chart } from "react-charts";
import "./apiTime.css";

export default function apiTime() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:42069/api/v1/getaverage", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((r) => r.json())
      .then((r) => {
        setApiData(r.data.map((key, index) => [index, key.average]));
        console.log(apiData);
      });
  }, []);
  const data = useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
      {
        label: "Series 2",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
    ],
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  return (
    <div className="apiContainer">
      <Chart data={data} axes={axes} />
    </div>
  );
}
