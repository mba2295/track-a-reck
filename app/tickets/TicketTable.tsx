import { StatusBadge } from "@/app/components/Index";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Ticket, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: string;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  tickets: Ticket[];
}

const TicketTable = ({ searchParams, tickets: tickets }: Props) => {
  return (
    <Table.Root variant="surface">
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
                {searchParams?.orderBy === `${column.value} asc` && (
                  <ThickArrowUpIcon className="inline" />
                )}
                {searchParams?.orderBy === `${column.value} desc` && (
                  <ThickArrowDownIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tickets.map((ticket) => (
          <Table.Row key={ticket.id}>
            <Table.Cell>
              <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
              <div className="block md:hidden">
                <StatusBadge status={ticket.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <StatusBadge status={ticket.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {ticket.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: string;
  className?: string;
}[] = [
  { label: "Ticket", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames: string[] = columns.map((column) => column.value);

export default TicketTable;
