import React from "react";
import TicketFormSkeleton from "@/app/tickets/_components/TicketFormSkeleton";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const TicketForm = dynamic(
  () => import("@/app/tickets/_components/TicketForm"),
  {
    ssr: false,
    loading: () => <TicketFormSkeleton />,
  }
);
interface Props {
  params: { id: string };
}
const TicketEditPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) {
    notFound();
  }
  return <TicketForm ticket={ticket}></TicketForm>;
};

export default TicketEditPage;
