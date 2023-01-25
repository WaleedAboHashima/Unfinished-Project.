import React from "react";
import { RingLoader } from "react-spinners";

function Loading() {
  return (
    <div className="loading-page">
      <RingLoader color={"#00FFFF"} />
    </div>
  );
}

export default Loading;
