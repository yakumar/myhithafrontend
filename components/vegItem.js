import React from "react";

import {
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/core";

const VegItem = (props) => {
  console.log(props.item);

  return (
    <Box>
      <table>
        <Box as="thead" backgroundColor="bg2">
          <tr>
            <th>Name</th>
            <th>quantity</th>
            <th>quantity type</th>
            <th>each_price</th>
            <th>category</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <Box as="td" pr=".4rem">
              <h4>{props.item.name}</h4>
            </Box>
            <Box as="td" pr=".4rem">
              {props.item.quantity}
            </Box>
            <Box as="td" pr=".4rem">
              {props.item.quantity_type}
            </Box>
            <Box as="td" pr=".4rem">
              {props.item.each_price}
            </Box>
            <Box as="td" pr=".4rem">
              {props.item.category}
            </Box>
            <Box as="td">
              {" "}
              <Button onClick={null} p=".2rem">
                Edit item
              </Button>
            </Box>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default VegItem;

// <table>
// <Box as="thead" backgroundColor="bg3">
//   <tr>
//     <th>Ordered on</th>
//     <th>Item name</th>
//     <th>Today ordered quantity</th>
//     <th>type</th>
//   </tr>
// </Box>
// <tbody>
//   <tr>
//     <td> {props.item.name}</td>
//     <td>{props.item.name}</td>
//     <td> {props.item.quantity}</td>
//     <td>{props.item.quantity_type}</td>
//   </tr>
// </tbody>
// </table>
