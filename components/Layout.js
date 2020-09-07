import React from "react";
import {
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Button,
  MenuDivider,
  Box,
} from "@chakra-ui/core";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Staff from "../pages/staffDashboard";
import Header from "./header";

const Layout = (props) => {
  return (
    <Box
      overflow="hidden"
      paddingX="0rem"
      // pt="1rem"
      textAlign="center"
      flex
      justifyContent="space-around"
      alignItems="center"
    >
      <Header />
      {props.children}
    </Box>
  );
};

export default Layout;

// <Router>
// <Button title="staffDashboard" border={0}>
//   <Link to="/">Home</Link>
// </Button>
// <Button title="signup" border={0}>
//   <Link to="/signup">Sign UP</Link>
// </Button>
// <Switch>
//   <Route path="/signup">
//     <SignUp />
//   </Route>
//   <Route path="/">
//     <Staff />
//   </Route>
// </Switch>
// </Router>
