import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/core";
import Link from "next/link";
import axios from "axios";

import Layout from "../components/Layout";
import ShopBox from "../components/shopBox";
import { observer, useObserver, inject } from "mobx-react";
import { useStores } from "../hooks/use-stores";
import Router, { useRouter } from "next/router";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Shop = () => {
  const [quant, setQuant] = useState(1);
  const { cartStore } = useStores();

  const [shopItems, setShopItems] = useState([]);
  const router = useRouter();

  const onBtnClick = (vals) => {
    // console.log("from parent", vals);
    cartStore.addToCart(vals);
    cartStore.increment();
  };
  const setQuanVal = (val) => {
    setQuant(val);
  };
  // function getCompleteCost() {
  //   return useObserver(() => {
  //     cartStore.completeCart["cost"];
  //   });
  // }

  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getVeg"
      );

      console.log("result", result.data.data);
      //getTodayOrderQuantity

      // if (!newArray.length) {
      //   // setOrderArray([]);
      // }
      setShopItems(result.data.data);
    };
    fetchData();
    // console.log("result useeffect");
  }, []);
  return useObserver(() => (
    <Layout>
      <Box>
        <Box p="0rem">
          <Box
            as="section"
            backgroundColor="bg2"
            d="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box as="h2" flexGrow="1">
              Shop
            </Box>

            <Box
              d="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              {cartStore.completeCart["cost"]
                ? cartStore.completeCart["cost"]
                : 0}
              <Link href="/cart">
                <IconButton
                  icon="cart"
                  mr="8rem"
                  backgroundColor="bg2"
                ></IconButton>
              </Link>
            </Box>
          </Box>

          <Box
            d="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            {shopItems.map((item) => {
              return (
                <Box as="div" mt="1rem" key={item.veggram_id}>
                  <ShopBox
                    name={item.name}
                    image={item.image_url}
                    quantity={item.quantity}
                    quantity_type={item.quantity_type}
                    price={item.each_price}
                    onBtnClick={onBtnClick}
                  />
                </Box>
              );
            })}
          </Box>

          <Button onClick={() => router.push("/cart")} mt={["-10rem", "-2rem"]}>
            Checkout from Shopping cart
          </Button>
        </Box>
      </Box>
    </Layout>
  ));
};

export default Shop;

// <ShopBox
//   name="tomato"
//   image="https://www.healthline.com/hlcmsresource/images/AN_images/tomatoes-1200x628-facebook.jpg"
//   quantity="250"
//   quantity_type=" grams"
//   price={20.0}
//   onBtnClick={onBtnClick}
// />
// <ShopBox
//   name="beans"
//   image="https://images-na.ssl-images-amazon.com/images/I/41vOZlnUQYL._SX466_.jpg"
//   quantity="250"
//   quantity_type=" grams"
//   price={10.0}
//   onBtnClick={onBtnClick}
// />
// <ShopBox
//   name="papaya"
//   image="https://www.healthline.com/hlcmsresource/images/AN_images/papaya-benefits-1200x628-facebook.jpg"
//   quantity="1"
//   quantity_type=" Unit"
//   price={30.0}
//   onBtnClick={onBtnClick}
// />
