import React, { useState } from "react";

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
  Input,
  Select,
} from "@chakra-ui/core";
import axios from "axios";

import Link from "next/link";

const VegItem = (props) => {
  console.log(props.item);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editPrice, setEditPrice] = useState(props.item.each_price);
  const [setStock, setSetStock] = useState(props.item.in_stock);

  const _editClose = () => {
    _editItem();
    onClose();
  };

  const _editItem = async () => {
    console.log("editing initiated");
    const data = {
      todayPrice: editPrice,
      inStock: setStock,
      name: props.item.name,
    };
    await axios({
      method: "put",
      url: "https://arcane-springs-88980.herokuapp.com/updateVeg",
      headers: {},
      data: data,
    });
  };

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
              <Button onClick={onOpen}>Edit item</Button>
            </Box>
          </tr>
        </tbody>
      </table>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Item Price/Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h3>MY Esiting body</h3> <form></form>
              <Input
                type="text"
                // defaultValue={props.each_price}
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
              <Select
                placeholder="in stock"
                defaultValue="yes"
                onChange={(e) => setSetStock(e.target.value)}
                // onSubmit={(e) => console.log(e)}
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button variantColor="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="solid" variantColor="green" onClick={_editClose}>
                Edit db
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
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
