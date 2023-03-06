import { NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import React from "react";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Hero
        title="404"
        subtitle="Page Not Found"
        displayButtons={false}
        rocksModeOnly={true}
      >
        <p>
          buddy... I don&apos;t know how you got here, but there is nothing to
          see...
        </p>
      </Hero>
    </div>
  );
};

export default NotFoundPage;
