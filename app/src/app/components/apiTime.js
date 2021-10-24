import React, { useMemo, useState, useEffect } from "react";
import { Chart } from "react-charts";
import "./apiTime.css";

export default function apiTime() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://status.smokese.sh/api/v1/getaverage", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((r) => r.json())
      .then((r) => {
        setApiData(r.data.reverse().map((key, index) => [new Date(key.time), key.average]));
      });
  }, []);
  console.log(apiData);
  const data = [{label: "Response Times", data: [...apiData]}]

  const axes = useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  return (
    <div className="apiContainer">
      <Chart className="chart" data={data} axes={axes} tooltip />
    </div>
  );
}
