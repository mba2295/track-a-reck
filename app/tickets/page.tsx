import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import TicketToolBar from "./TicketToolBar";
import { Link, StatusBadge } from "../components/Index";
import { useRouter } from "next/navigation";
const TicketsPage = async () => {
  const tickets = await prisma?.ticket.findMany();
  return (
    <>
      <TicketToolBar></TicketToolBar>
      <div className="h-200">
        <Table.Root className="mt-5" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
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
      </div>
    </>
  );
};
export const dynamic = "force-dynamic";
export default TicketsPage;
