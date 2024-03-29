"use client";
import { Status, Ticket } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const StatusFilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusList: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.INPROGRESS },
    { label: "Resolved", value: Status.RESOLVED },
    { label: "Closed", value: Status.CLOSED },
  ];
  const statusSelectChangeHandler = (status: Status) => {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    const queryString = params.size ? "?" + params.toString() : "";
    router.push("/tickets" + queryString);
  };

  return (
    <>
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        onValueChange={statusSelectChangeHandler}
      >
        <Select.Trigger placeholder="Filter by Status" />
        <Select.Content>
          {statusList?.map((status, i) => {
            return (
              <Select.Item key={i} value={status.value || "All"}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default StatusFilterSelect;
