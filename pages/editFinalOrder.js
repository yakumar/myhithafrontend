import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
} from "@chakra-ui/core";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import { set } from "mobx";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EditFinalOrder = (props) => {
  console.log("props from edit final", props);
  const router = useRouter();
  console.log(router.asPath);

  const [didMount, setDidMount] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getSingleOrder",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            order_id: parseInt(router.asPath.split("=")[1]),
          },
        }
      );

      console.log("result", result.data.data);
      //getTodayOrderQuantity

      //   // setOrderArray([]);
    };
    fetchData();
    setDidMount(true);
    return () => setDidMount(false);
    // console.log("result useeffect");
  }, []);

  if (!didMount) {
    return null;
  }

  const handleClick = () => {
    setShow(!show);
  };

  const submitEditFinalOrder = async () => {
    console.log("editing initiated");
    const data = {
      isAdmin: localStorage.getItem("isAdmin"),
      order_id: orderDetails.order_id,
      products: productsMod,
    };
    await axios({
      method: "put",
      url: "https://arcane-springs-88980.herokuapp.com/updateFinalOrder",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
    });
    router.reload();

    console.log("result", result.data);
    setPassword("");
    setPhone("");
  };

  return (
    <Layout>
      <Box>
        <Box
          bg="bg2"
          w={["15rem", "20rem", "25em", "30rem"]}
          h="20rem"
          marginX={["10rem", "20rem", "25rem", "30rem"]}
          marginY={["5rem", "6rem", "8em", "10rem"]}
          marginLeft={["6rem", "10rem", "20rem", "25rem"]}
          padding="1rem"
          textAlign="center"
          borderRadius="1rem"
          borderBottomColor="bg3"
          boxShadow="1rem 2rem bg1"
        >
          <Heading as="h2"> EditFinalOrder</Heading>
          <FormControl>
            <FormLabel htmlFor="Phone">Phone</FormLabel>
            <Input
              value={phone}
              marginX="5rem"
              type="phone"
              id="phone"
              aria-describedby="email-helper-text"
              w="16rem"
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              We'll never share your phone.
            </FormHelperText>
            <FormLabel htmlFor="password">password</FormLabel>

            <InputGroup size="md" marginX="5rem" w="18rem">
              <Input
                value={password}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                aria-describedby="password-helper-text"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText id="password-helper-text">
              Never share your password.
            </FormHelperText>
          </FormControl>

          <Button
            padding="1rem"
            onClick={() => submitEditFinalOrder()}
            title="EditFinalOrder"
            borderRadius=".4rem"
            color="red"
            bg="bg1"
            type="submit"
          >
            EditFinalOrder
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditFinalOrder;
