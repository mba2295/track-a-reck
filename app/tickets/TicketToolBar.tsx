import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TicketToolBar = () => {
  return (
    <Button>
      <Link href="/tickets/new">New Ticket</Link>
    </Button>
  );
};

export default TicketToolBar;
