import { NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import React from "react";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Hero
        title="404"
        subtitle="Page Not Found"
        content="buddy... I don't know how you got here, but there is nothing to see..."
        displayButtons={false}
        rocksModeOnly={true}
      />
    </div>
  );
};

export default NotFoundPage;
