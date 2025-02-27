import React from "react";
import { Loader } from "react-feather";

export default function FullScreenLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );
}
