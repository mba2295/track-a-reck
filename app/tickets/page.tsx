"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TicketsPage = () => {
  return (
    <div className="h-200">
      <Button>
        <Link href="/tickets/new">New Ticket</Link>
      </Button>
    </div>
  );
};

export default TicketsPage;
