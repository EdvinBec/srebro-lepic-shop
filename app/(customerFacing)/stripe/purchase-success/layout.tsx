import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}

export default layout;
