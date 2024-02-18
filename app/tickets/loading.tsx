import { Table } from "@radix-ui/themes";
import React from "react";
import TicketToolBar from "./TicketToolBar";
import { Skeleton } from "@/app/components/Index";
const LoadingTickets = () => {
  const tickets = [1, 2, 3, 4, 5];
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
                <Table.Row key={ticket}>
                  <Table.RowHeaderCell>
                    <Skeleton></Skeleton>
                    <div className="block md:hidden">
                      <Skeleton></Skeleton>
                    </div>
                    <div className="block md:hidden">
                      <Skeleton></Skeleton>
                    </div>
                  </Table.RowHeaderCell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton></Skeleton>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton></Skeleton>
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

export default LoadingTickets;
