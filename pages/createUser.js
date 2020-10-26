import React, { useState, useEffect } from "react";
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

const CreateUser = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const submitCreateUser = async () => {
    const data = {
      phone: phone,
      password: password,
      isAdmin: localStorage.getItem("isAdmin"),
    };
    const result = await axios({
      method: "post",
      url: "https://arcane-springs-88980.herokuapp.com/register",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
    });

    router.replace("/users");

    console.log("result", result.data);
    setPassword("");
    setPhone("");
  };

  return (
    <Layout>
      <Box>
        <Box
          bg="bg2"
          w={["20rem", "25rem", "30em", "38rem"]}
          h="20rem"
          marginX={["1rem", "6rem", "20rem", "30rem"]}
          marginY={["5rem", "6rem", "8em", "10rem"]}
          marginLeft={["2rem", "5rem", "13rem", "25rem"]}
          padding="1rem"
          textAlign="center"
          borderRadius="1rem"
          borderBottomColor="bg3"
          boxShadow="1rem 2rem bg1"
        >
          <Heading as="h2"> CreateUser</Heading>
          <FormControl>
            <FormLabel htmlFor="Phone">Phone</FormLabel>
            <Input
              value={phone}
              marginX={["0rem", "2rem", "3rem", "5rem"]}
              w={["16rem", "18rem", "22rem", "25rem"]}
              type="phone"
              id="phone"
              aria-describedby="email-helper-text"
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              We'll never share your phone.
            </FormHelperText>
            <FormLabel htmlFor="password">password</FormLabel>

            <InputGroup
              size="md"
              marginX={["0rem", "2rem", "3rem", "5rem"]}
              w={["16rem", "18rem", "22rem", "25rem"]}
            >
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
            onClick={() => submitCreateUser()}
            title="CreateUser"
            borderRadius=".4rem"
            color="red"
            bg="bg1"
            type="submit"
          >
            CreateUser
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateUser;
