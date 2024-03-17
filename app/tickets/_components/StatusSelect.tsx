"use client";
import { Status, Ticket } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Skeleton } from "@/app/components/Index";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const StatusSelect = ({ ticket }: { ticket: Ticket }) => {
  const router = useRouter();
  const { data: statuses, error, isLoading } = useStatuses();
  const statusSelectChangeHandler = (status: Status) => {
    axios
      .patch("/api/tickets/" + ticket.id, {
        status: status,
      })
      .then(() => router.refresh())
      .catch(() => toast.error("Error updating the status, please try again"));
  };
  if (error) return null;
  if (isLoading) return <Skeleton></Skeleton>;
  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={ticket.status}
        onValueChange={statusSelectChangeHandler}
      >
        <SelectTrigger placeholder="Status">{ticket.status}</SelectTrigger>
        <SelectContent>
          {statuses?.map((statusValue) => (
            <SelectItem key={statusValue} value={statusValue}>
              {statusValue.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select.Root>
    </>
  );
};
const useStatuses = () =>
  useQuery<string[]>({
    queryKey: ["statuses"],
    queryFn: () => {
      return Object.values(Status).map((statusValue) =>
        statusValue.toUpperCase()
      );
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
export default StatusSelect;
