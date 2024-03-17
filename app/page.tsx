import { LockOpen2Icon } from "@radix-ui/react-icons";
import { TbProgress } from "react-icons/tb";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import CardGrid, { TicketItem } from "./tickets/_components/dashboard/CardGrid";
import RecentTickets from "./tickets/_components/dashboard/RecentTickets";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import DashboardBarChart from "./tickets/_components/dashboard/DashboardBarChart";
import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const cardItems: TicketItem[] = await Promise.all(
    Object.keys(Status).map(async (key) => {
      const status = Status[key as keyof typeof Status];
      return await generateCardItemsForStatus(status);
    })
  );

  return (
    <main>
      <CardGrid items={cardItems} />
      <Grid columns={{ initial: "1", sm: "1", lg: "2" }} gap="2" width="auto">
        <DashboardBarChart tickets={cardItems}></DashboardBarChart>
        <RecentTickets></RecentTickets>
      </Grid>
    </main>
  );
}

const getCountForStatus = async (status: Status): Promise<string> => {
  return (
    await prisma.ticket.count({
      where: {
        status: status,
      },
    })
  ).toString();
};
const generateCardItemsForStatus = async (
  status: Status
): Promise<TicketItem> => {
  const count = await getCountForStatus(status);
  const params = new URLSearchParams();
  params.append("status", status);
  const queryString = params.size ? "?" + params.toString() : "";

  switch (status) {
    case Status.OPEN:
      return {
        label: "Open",
        value: count,
        icon: <LockOpen2Icon />,
        link: "/tickets" + queryString,
        /* changeIcon: </>, */
        // changeDescription: 'Change description for Open',
        // changePercentage: 'Change percentage for Open',
        viewAllDescription: "View all Open tickets",
      };

    case Status.INPROGRESS:
      return {
        label: "In Progress",
        value: count,
        icon: <TbProgress />,
        link: "/tickets" + queryString,
        viewAllDescription: "View all In progress tickets",
      };
    case Status.RESOLVED:
      return {
        label: "Resolved",
        value: count,
        icon: <MdDone />,
        link: "/tickets" + queryString,
        viewAllDescription: "View all Resolved tickets",
      };
    case Status.CLOSED:
      return {
        label: "Closed",
        value: count,
        icon: <MdOutlineDoneAll />,
        link: "/tickets" + queryString,
        viewAllDescription: "View all Closed tickets",
      };
    default:
      throw new Error("Unhandled status");
  }
};

export const metadata: Metadata = {
  title: "Track a reck - Tickets Dashboard",
  description: "View the recent activity and insights",
};
