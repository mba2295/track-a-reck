import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import TicketToolBar from "./TicketToolBar";
import { Link, StatusBadge } from "../components/Index";
import NextLink from "next/link";
import { Status } from "@prisma/client";
import {
  ArrowUpIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
interface Props {
  searchParams: { status: Status; orderBy: string; page: string };
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

  const columns = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const orderByCondition =
    columns.map((column) => column.value).includes(orderby) &&
    ["asc", "desc"].includes(direction)
      ? { [orderby]: direction }
      : undefined;
  console.log(direction);
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
        <Table.Root className="mt-5" variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column, idx) => {
                return (
                  <Table.ColumnHeaderCell
                    key={idx}
                    className={column?.className ? column.className : ""}
                  >
                    <NextLink
                      href={{
                        query: {
                          ...searchParams,
                          orderBy:
                            searchParams?.orderBy === `${column.value} asc`
                              ? `${column.value} desc`
                              : `${column.value} asc`,
                        },
                      }}
                    >
                      {column.label}
                    </NextLink>
                    {column.value === `${column.value} asc` && (
                      <ThickArrowUpIcon className="inline" />
                    )}
                    {column.value === `${column.value} desc` && (
                      <ThickArrowDownIcon className="inline" />
                    )}
                  </Table.ColumnHeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets?.map((ticket) => {
              return (
                <Table.Row key={ticket.id}>
                  <Table.RowHeaderCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title} </Link>
                    <div className="block md:hidden">
                      Status: <StatusBadge status={ticket.status}></StatusBadge>
                    </div>
                    <div className="block md:hidden">
                      Created At: {ticket.createdAt?.toDateString()}
                    </div>
                  </Table.RowHeaderCell>

                  <Table.Cell className="hidden md:table-cell">
                    <StatusBadge status={ticket.status}></StatusBadge>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {ticket.createdAt?.toDateString()}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
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
