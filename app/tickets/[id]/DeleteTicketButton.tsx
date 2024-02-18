"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteTicketButton = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const [isError, setisError] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const deleteTicket = async () => {
    try {
      setisDeleting(true);
      await axios.delete("/api/tickets/" + ticketId);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setisDeleting(false);
      setisError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <CrossCircledIcon></CrossCircledIcon>Delete Ticket
            {isDeleting && <LoadingSpinner></LoadingSpinner>}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This will delete the ticket.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteTicket}>
                Delete ticket
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={isError}>
        {" "}
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Something went wrong</AlertDialog.Title>
          <AlertDialog.Description size="2">
            We were not able to delete this ticket please try again after some
            time.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="green"
            mt="1"
            onClick={() => setisError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteTicketButton;
