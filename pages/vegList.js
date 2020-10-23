import React, { useState } from "react";

import {
  Box,
  Input,
  Heading,
  Text,
  Image,
  Button,
  Select,
  Checkbox,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/core";
import axios from "axios";

import Router, { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";

import VegItem from "../components/vegItem";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const VegList = () => {
  const router = useRouter();

  const [orderArray, setOrderArray] = useState([]);

  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getVeg"
      );

      // console.log("result", result.data.data);
      //getTodayOrderQuantity

      //   const newArray = result.data.data.filter((val) => {
      //     const dD = val.order_date;
      //     const newD = moment(dD.toString()).format("DD/MM/YYYY");
      //     // console.log("order date in new", newD);

      //     return newD == today;
      //   });

      console.log("newArray!!!:", result.data.data);
      // if (!newArray.length) {
      //   // setOrderArray([]);

      // }
      setOrderArray(result.data.data);
    };
    fetchData();
    // console.log("result useeffect");
  }, []);

  return (
    <Layout>
      <Box as="div">
        <Box as="section">
          <Link href="/addVeg">
            <Button
              my={["1rem", ""]}
              color="bg3"
              borderColor="bg3"
              borderWidth=".2rem"
            >
              Add New Item
            </Button>
          </Link>
        </Box>
        <Heading>List of Items</Heading>
        <Box>
          <List>
            {orderArray.map((item, index) => {
              return (
                <Box as="div" key={item.veggram_id}>
                  <ListItem>
                    <VegItem item={item} index={index} />
                  </ListItem>
                </Box>
              );
            })}
          </List>
        </Box>
      </Box>
    </Layout>
  );
};

export default VegList;
