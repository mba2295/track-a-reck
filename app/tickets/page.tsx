import prisma from "@/prisma/client";
import TicketToolBar from "./TicketToolBar";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import TicketTable, { IssueQuery, columnNames } from "./TicketTable";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery;
}
const TicketsPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams?.status)
    ? searchParams?.status
    : undefined;
  const where = {
    status: status,
  };
  const orderby = searchParams?.orderBy
    ? searchParams.orderBy.split(" ")[0]
    : "";
  const direction = searchParams?.orderBy
    ? searchParams.orderBy.split(" ")[1]
    : "";
  const pageSize = 10;
  const pageNo = parseInt(searchParams.page) || 1;

  const orderByCondition =
    columnNames.includes(orderby) && ["asc", "desc"].includes(direction)
      ? { [orderby]: direction }
      : undefined;
  const tickets = await prisma?.ticket.findMany({
    where,
    orderBy: orderByCondition,
    skip: (pageNo - 1) * pageSize,
    take: pageSize,
  });
  const totalTicketsCount = await prisma.ticket.count({ where });
  return (
    <>
      <TicketToolBar></TicketToolBar>
      <div className="h-200">
        <TicketTable
          searchParams={searchParams}
          tickets={tickets}
          key={1}
        ></TicketTable>
        <Pagination
          pageSize={pageSize}
          itemCount={totalTicketsCount}
          currentPage={pageNo}
        ></Pagination>
      </div>
    </>
  );
};
export const dynamic = "force-dynamic";
export default TicketsPage;

export const metadata: Metadata = {
  title: "Track a reck - Tickets List",
  description: "View the list of tickets",
};
