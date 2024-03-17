import { Box, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React, { ReactNode } from "react";
export interface TicketItem {
  label: string;
  value: string;
  icon?: ReactNode;
  changeIcon?: ReactNode;
  changeDescription?: string;
  changePercentage?: string;
  viewAllDescription?: string;
  link?: string;
}

interface TicketItems {
  items: TicketItem[];
}
const CardGrid = ({ items }: TicketItems) => {
  return (
    <div>
      <Grid gap="5" mb="5" mt="5" columns={{ initial: "1", sm: "2", lg: "4" }}>
        {items.map((item, index) => (
          <Box
            position="relative"
            pt={{ initial: "5", sm: "6" }}
            px={{ initial: "4", sm: "6" }}
            pb="9"
            key={index}
            color="white"
            className="shadow rounded-lg overflow-hidden"
          >
            <dt>
              <Box position="absolute" p="3" className="bg-lime-300 rounded-md">
                {item.icon}
              </Box>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.label}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-lime-300">
                {item.changeIcon}
                <span className="sr-only"> {item.changeDescription}</span>
                {item.changePercentage}
              </p>
              <Box className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <Box className="text-sm">
                  <Link
                    href={item.link || "#"}
                    className="font-medium text-lime-500 hover:text-green-600"
                  >
                    {item.viewAllDescription}
                    <span className="sr-only"></span>
                  </Link>
                </Box>
              </Box>
            </dd>
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default CardGrid;
