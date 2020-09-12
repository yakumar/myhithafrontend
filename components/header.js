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
          ml={["3rem", "10rem", "29rem"]}
        >
          Place Order
        </Button>
      </Link>
      <Link href="/addVeg">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          cursor="pointer"
          ml={["1rem", "5rem", "4rem", "2rem"]}
          w={["4.5rem", "5rem", "6rem", "7rem"]}
        >
          Add item
        </Button>
      </Link>
    </Box>
  );
};

export default Header;
