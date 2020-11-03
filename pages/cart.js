import React, { useState } from "react";

import {
  Box,
  Heading,
  Image,
  Divider,
  Button,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/core";
import Layout from "../components/Layout";
import { useStores } from "../hooks/use-stores";
import { observer, useObserver, inject } from "mobx-react";
import axios from "axios";
import Router, { useRouter } from "next/router";

const Cart = () => {
  const { cartStore } = useStores();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const submitOrder = async () => {
    const data = {
      products: cartStore.cart,
      cost_of_order: cartStore.completeCart["cost"],
      userid: 9,
      payment_type: "Phonepe",
      customerPhone: phone,
      customerName: name,
      customerAddress: address,
      email: email,
    };
    // const submitedOrder = await axios.post("http://localhost:8080/createOrder");
    await axios({
      method: "post",
      url: "https://arcane-springs-88980.herokuapp.com/createOrder",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
    });
    router.push("/adminDashboard");

    cartStore.cart = [];
    cartStore.completeCart = {};

    ///api
  };

  return useObserver(() => (
    <Box textAlign="center">
      <Heading>Shopping cart</Heading>

      <Box as="div" margin="4rem" pl="3rem">
        <Box
          d="flex"
          flexDirection="row"
          justifyContent={["center", "space-around"]}
          alignItems="center"
        >
          <Heading as="h4" fontSize="1.2rem">
            {" "}
            product
          </Heading>
          <Heading as="h4" fontSize="1.2rem" pl={["1rem", "2rem"]}>
            quantity{" "}
          </Heading>
          <Heading
            as="h4"
            fontSize="1.2rem"
            pl={["1rem", ""]}
            pr={["2rem", "2rem"]}
          >
            price{" "}
          </Heading>
          <Heading as="h4" fontSize="1.2rem">
            calculated price
          </Heading>
        </Box>

        {cartStore.cart.map((product) => {
          console.log("from Cart:", product);
          return (
            <Box
              key={product.name}
              d="flex"
              flexDirection="row"
              justifyContent={["center", "space-around"]}
              alignItems="center"
              px={["1rem", ""]}
              ml={["3rem", ""]}
            >
              <Image
                w="10rem"
                h="6rem"
                rounded="1rem"
                src={product.image_url}
              />

              <Box
                d="flex"
                flexDirection="row"
                justifyContent={["center", "space-around"]}
                alignItems="space-between"
              >
                <Heading as="h3" pr={["1rem", "4rem"]}>
                  {product.name}
                </Heading>

                <Heading as="h3" pr={["4rem", "16rem"]}>
                  {product.priceQuantity}
                </Heading>
                <Heading as="h2" mr="1rem" ml="-2rem">
                  *
                </Heading>

                <Heading as="h3" pr="4rem">
                  {product.price} Rs
                </Heading>
                <Heading as="h3" pr="2rem">
                  {product.calcPrice} Rs
                </Heading>
              </Box>
            </Box>
          );
        })}
        <Divider backgroundColor="bg4" />
        <Box
          d="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Heading as="h3">Total purchase</Heading>
          <Heading as="h3">
            {cartStore.completeCart["cost"]
              ? cartStore.completeCart["cost"]
              : 0}
          </Heading>
        </Box>
        <Box
          textAlign="center"
          d="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          size="md"
          rounded="1rem"
          borderColor="bg3"
          ml={["-6rem", "4rem", "8rem", "14rem"]}
          mr={["1rem", "4rem", "2rem", "0rem"]}
        >
          <Heading as="h4" marginBottom="1rem">
            Customer details <Text backgroundColor="blue">*</Text>
          </Heading>
          <Input
            placeholder="Customer Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            marginBottom="2rem"
          />
          <Textarea
            placeholder="Customer Address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            marginBottom="2rem"
          />
          <Input
            placeholder="Contact number"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
            isRequired={true}
          />
          <Input
            placeholder="Company Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            // onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
            isRequired={true}
          />
        </Box>
        <Button onClick={() => submitOrder()}>Submit Order</Button>
      </Box>
    </Box>
  ));
};

export default Cart;

// {product.name == "tomato" ? (
//   <Image
//     w="10rem"
//     h="6rem"
//     rounded="1rem"
//     src="https://www.healthline.com/hlcmsresource/images/AN_images/tomatoes-1200x628-facebook.jpg"
//   />
// ) : (
//   <Image
//     w="10rem"
//     h="6rem"
//     rounded="1rem"
//     //   mr="1rem"
//     src="https://images-na.ssl-images-amazon.com/images/I/41vOZlnUQYL._SX466_.jpg"
//   />
// )}
