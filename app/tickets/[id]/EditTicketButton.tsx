import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTicketButton = ({ ticketId }: { ticketId: number }) => {
  return (
    <Button>
      <Pencil1Icon></Pencil1Icon>
      <Link href={`/tickets/edit/${ticketId}`}>Edit Ticket</Link>
    </Button>
  );
};

export default EditTicketButton;
