"use client";
import { Ticket, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/Index";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ ticket }: { ticket: Ticket }) => {
  const { data: users, error, isLoading } = useUsers();
  const userSelectChangeHandler = (userId: string) => {
    axios
      .patch("/api/tickets/" + ticket.id, {
        assignedToUserId: userId || null,
      })
      .catch(() =>
        toast.error("Error updating the assignee, please try again")
      );
  };
  if (error) return null;
  if (isLoading) return <Skeleton></Skeleton>;

  return (
    <>
      <Toaster></Toaster>
      <Select.Root
        defaultValue={ticket?.assignedToUserId || "0"}
        onValueChange={userSelectChangeHandler}
      >
        <Select.Trigger placeholder="Assignee" />
        <Select.Content>
          <Select.Item key="0000" value="0">
            Un assigned
          </Select.Item>
          {users?.map((user) => {
            return (
              <Select.Item key={user?.id} value={user?.id}>
                {user?.name}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });

export default AssigneeSelect;
