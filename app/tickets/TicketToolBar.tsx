import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilterSelect from "./_components/StatusFilterSelect";

const TicketToolBar = () => {
  return (
    <Flex mb="4" justify="between">
      <StatusFilterSelect></StatusFilterSelect>
      <Button>
        <Link href="/tickets/new">New Ticket</Link>
      </Button>
    </Flex>
  );
};

export default TicketToolBar;
