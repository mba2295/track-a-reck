import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "lime" | "orange" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  INPROGRESS: { label: "In Progress", color: "orange" },
  RESOLVED: { label: "Resolved", color: "lime" },
  CLOSED: { label: "Closed", color: "green" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
