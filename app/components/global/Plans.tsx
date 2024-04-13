import React from "react";
import ContentHeader from "./web-default/ContentHeader";
import { IconButton } from "./web-default/Buttons";
import Card from "./web-default/Card";
import SinglePlan from "./web-default/SinglePlan";

function Plans() {
  return (
    <section className="w-full py-28  ">
      <div className="container-width">
        
        <ContentHeader title="Investment Plans" caption="Invest Offer" text=" Select an investment plan to get started" />

        <div
          className="flex justify-center flex-col lg:flex-row items-center gap-8"
        >
          <SinglePlan price="$200 - $3000" total="3000" title="Basic" />
          <SinglePlan price="$500 -$5999" total="5999" title="Bronze" />
          <SinglePlan price="$1000 -$15000" total="$15000" title="Gold" />
        </div>
      </div>
    </section>
  );
}

export default Plans;
