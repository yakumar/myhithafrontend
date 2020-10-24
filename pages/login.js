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

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedUser = () => {
      if (localStorage.getItem("token") != null) {
        Router.push("/adminDashboard");
      }
    };
    loggedUser();
  }, []);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const submitLogin = async () => {
    const data = {
      phone: phone,
      password: password,
    };
    const result = await axios({
      method: "post",
      url: "https://arcane-springs-88980.herokuapp.com/signInAdmin",
      headers: {},
      data: data,
    });
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("isAdmin", result.data.user.isadmin);

    router.replace("/adminDashboard");
    setPassword("");
    setPhone("");

    console.log("result", result.data);
  };

  return (
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
        <Heading as="h2">Admin Login</Heading>
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
          onClick={() => submitLogin()}
          title="Login"
          borderRadius=".4rem"
          color="red"
          bg="bg1"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
