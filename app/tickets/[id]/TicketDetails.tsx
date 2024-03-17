import StatusBadge from "@/app/components/StatusBadge";
import { Ticket } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  return (
    <>
      <Heading>{ticket?.title}</Heading>
      <Flex gap="2">
        <StatusBadge status={ticket?.status}></StatusBadge>
        <Text>{ticket?.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5 max-w-full">
        <ReactMarkdown>{ticket?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TicketDetails;
