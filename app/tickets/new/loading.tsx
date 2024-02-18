import { Skeleton } from "@/app/components/Index";
import { Box } from "@radix-ui/themes";
import React from "react";
import TicketFormSkeleton from "../_components/TicketFormSkeleton";
const Loading = () => {
  return <TicketFormSkeleton></TicketFormSkeleton>;
};

export default Loading;
