import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
};

export default layout;
