import React from "react";
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
} from "@chakra-ui/core";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
        <h2>SignUp</h2>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            marginX="5rem"
            type="email"
            id="email"
            aria-describedby="email-helper-text"
            w="16rem"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
          <FormLabel htmlFor="password">password</FormLabel>

          <InputGroup size="md" marginX="5rem" w="18rem">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              aria-describedby="password-helper-text"
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
          onClick={() => console.log("pressed chakraUI")}
          title="SignUp"
          borderRadius=".4rem"
          color="red"
          bg="bg1"
          type="submit"
        >
          SignUp
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
