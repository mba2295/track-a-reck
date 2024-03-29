import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditTicketButton from "./EditTicketButton";
import TicketDetails from "./TicketDetails";
import DeleteTicketButton from "./DeleteTicketButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "../_components/AssigneeSelect";
import StatusSelect from "../_components/StatusSelect";
interface Props {
  params: { id: string };
}
const fetchTicket = cache((ticketId: number) =>
  prisma.ticket.findUnique({
    where: { id: ticketId },
  })
);

const TicketDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!Number(params.id)) {
    notFound();
  }
  const ticket = await fetchTicket(parseInt(params.id));
  if (!ticket) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <TicketDetails ticket={ticket}></TicketDetails>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          {session && (
            <>
              <AssigneeSelect ticket={ticket}></AssigneeSelect>
              <StatusSelect ticket={ticket}></StatusSelect>
              <EditTicketButton ticketId={ticket?.id} />
              <DeleteTicketButton ticketId={ticket?.id} />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};
export async function generateMetadata({ params }: Props) {
  const ticket = await fetchTicket(parseInt(params.id));
  return {
    title: ticket?.title,
    description: ticket?.description,
  };
}
export const revalidate = 0;
export default TicketDetailsPage;
