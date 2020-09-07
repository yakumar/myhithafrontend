import React from "react";
import { Box, Button } from "@chakra-ui/core";
import Link from "next/link";

const Header = (props) => {
  return (
    <Box backgroundColor="bg1" h="4rem">
      <Link href="/shop">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          cursor="pointer"
          ml="29rem"
        >
          Place an Order
        </Button>
      </Link>
    </Box>
  );
};

export default Header;
