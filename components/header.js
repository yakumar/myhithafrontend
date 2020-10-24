import React from "react";
import { Box, Button, IconButton, Icon } from "@chakra-ui/core";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    console.log("we are running on the client");
    localStorage.setItem("myCat", "Tom");
  } else {
    console.log("we are running on the server");
  }

  return (
    <Box backgroundColor="bg1" h="4rem" pb={["6.5rem", "", "", ""]}>
      <Link href="/">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          cursor="pointer"
          ml={["0rem", "", ""]}
        >
          Home
        </Button>
      </Link>
      <Link href="/shop">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          cursor="pointer"
          mt={["0rem", "0rem", "1rem", "1rem"]}
          ml={["1rem", "3rem", "10rem", "29rem"]}
        >
          Place Order
        </Button>
      </Link>
      <Link href="/vegList">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          mt={["0rem", "0rem", "1rem", "1rem"]}
          cursor="pointer"
          ml={["0rem", "2rem", "3rem", "1rem"]}
          w={["4.5rem", "5rem", "6rem", "7rem"]}
        >
          Item List
        </Button>
      </Link>
      <Link href="/users">
        <Button
          as="a"
          backgroundColor="bg2"
          m="1rem"
          mt={["-1rem", "0rem", "1rem", "1rem"]}
          cursor="pointer"
          ml={["2rem", "2rem", "3rem", "1rem"]}
          w={["4.5rem", "5rem", "6rem", "7rem"]}
        >
          Users
        </Button>
      </Link>
    </Box>
  );
};

export default Header;
