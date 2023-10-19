import React from "react";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { How } from "./How";
import { Services } from "./Services";

const index = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Services />
      {/* <How /> */}
    </div>
  );
};

export default index;
