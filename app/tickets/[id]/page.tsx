import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import ReactMarkdown from "react-markdown";
import delay from "delay";
interface Props {
  params: { id: string };
}
const TicketDetailsPage = async ({ params }: Props) => {
  if (!Number(params.id)) {
    notFound();
  }
  const ticket = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) {
    notFound();
  }
  await delay(2000);
  return (
    <div>
      <Heading>{ticket?.title}</Heading>
      <Flex gap="2">
        <StatusBadge status={ticket?.status}></StatusBadge>
        <Text>{ticket?.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5">
        <ReactMarkdown>{ticket?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default TicketDetailsPage;
