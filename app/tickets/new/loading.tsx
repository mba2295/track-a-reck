import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>
      <Skeleton height="20rem"></Skeleton>
    </Box>
  );
};

export default Loading;
