import prisma from "@/prisma/client";
import { Card, Heading, Text, Flex, Box, Separator } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Avatar, StatusBadge } from "../../../components/Index";

const RecentTickets = async () => {
  const recentTickets = await prisma.ticket.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      description: true,
      assignedToUser: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Card size="4">
        <Heading as="h3" size="6" trim="start" mb="2" className="text-gray-500">
          Recent activity
        </Heading>

        <Text as="p" size="2" mb="2" className="text-lime-500">
          Review what has happened over the past days.
        </Text>
        {recentTickets.map((ticket) => {
          return (
            <Flex direction="column" key={ticket?.id}>
              <Flex direction="column" gap="3" mb="3" mt="3">
                <Flex justify="between" align="center">
                  <Flex gap="3" align="center">
                    <Avatar
                      width={30}
                      height={30}
                      src={ticket.assignedToUser?.image || ""}
                      alt={ticket.assignedToUser?.name?.[0] || ""}
                    />
                    <Box>
                      <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                      <Text as="div" size="2" color="gray">
                        {ticket?.assignedToUser?.name}
                      </Text>
                      <StatusBadge status={ticket.status} />
                    </Box>
                  </Flex>

                  <Text size="2" color="gray">
                    {ticket?.createdAt?.toDateString()}
                  </Text>
                </Flex>
              </Flex>

              <Box>
                <Separator size="4" />
              </Box>
            </Flex>
          );
        })}
      </Card>
    </>
  );
};

export default RecentTickets;
