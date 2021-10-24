import React, { useMemo, useState, useEffect } from "react";
import { Chart } from "react-charts";
import "./apiTime.css";

export default function apiTime() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://status.smokese.sh/api/v1/getaverage", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((r) => r.json())
      .then((r) => {
        setApiData(r.data.reverse().map((key, index) => [index, key.average]));
      });
  }, []);
  const data = useMemo(
    () => [
      {
        label: "Series 1",
        data: [...apiData],
      }
    ],
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
    ],
    []
  );
  return (
    <div className="apiContainer">
      <Chart data={data} axes={axes} />
    </div>
  );
}
