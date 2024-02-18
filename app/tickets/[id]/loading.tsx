import LoadingSpinner from "@/app/components/LoadingSpinner";
import StatusBadge from "@/app/components/StatusBadge";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components/Index";
const Loading = async () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="2">
        <Skeleton width="3rem" />
        <Text>
          <Skeleton width="5rem" />
        </Text>
      </Flex>
      <Card className="prose mt-5">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default Loading;
