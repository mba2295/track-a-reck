import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditTicketButton from "./EditTicketButton";
import TicketDetails from "./TicketDetails";
import DeleteTicketButton from "./DeleteTicketButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "../_components/AssigneeSelect";
interface Props {
  params: { id: string };
}
const TicketDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!Number(params.id)) {
    notFound();
  }
  const ticket = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
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
              <EditTicketButton ticketId={ticket?.id} />
              <DeleteTicketButton ticketId={ticket?.id} />{" "}
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default TicketDetailsPage;
