import React, { lazy } from "react";
import Banner from "./components/banner";
import ApiTime from "./components/apiTime";

export default function App() {
  return (
    <React.Suspense fallback={<div></div>}>
      <div>
        <Banner />

        <div class="Data">
            <p>SYSTEM METRICS</p>
            <div>
                <ApiTime />
            </div>
        </div>
      </div>
    </React.Suspense>
  );
}
