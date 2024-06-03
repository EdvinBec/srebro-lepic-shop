import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
};

export default loading;
