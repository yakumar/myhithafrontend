import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  CircularProgress,
  CircularProgressLabel,
  Button,
} from "@chakra-ui/core";

import axios from "axios";
import Order from "../components/order";
import TodayOrderQuan from "../components/todayQuan";

import moment from "moment";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const Staff = () => {
  const [orderArray, setOrderArray] = useState([]);

  const [todayQuan, setTodayQuan] = useState([]);

  const today = moment().format("DD/MM/YYYY");

  console.log("today", moment().format("DD/MM/YYYY"));
  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getorders"
      );
      const todayOrderQuantities = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getTodayOrderQuantity"
      );

      // console.log("result", result.data.data);
      //getTodayOrderQuantity

      const newArray = result.data.data.filter((val) => {
        const dD = val.order_date;
        const newD = moment(dD.toString()).format("DD/MM/YYYY");
        // console.log("order date in new", newD);

        return newD == today;
      });

      console.log("newArray!!!:", newArray);
      // if (!newArray.length) {
      //   // setOrderArray([]);
      // }
      setOrderArray(newArray);

      setTodayQuan(todayOrderQuantities.data.data);
    };
    fetchData();
    // console.log("result useeffect");
  }, []);

  return (
    <Box
      textAlign="center"
      marginX={["10rem", "20rem", "25rem", "30rem"]}
      marginLeft={["1rem", "10rem", "20rem", "25rem"]}
      // overflow="hidden"
    >
      <h3>Staff Dashboard</h3>
      <Text>Customer Orders</Text>
      {orderArray.length > 0 ? (
        ""
      ) : (
        <CircularProgress isIndeterminate color="green"></CircularProgress>
      )}
      <List>
        {orderArray.map((order) => {
          return (
            <Box as="div" key={order.order_id}>
              <ListItem>
                <Order order={order} />
              </ListItem>
            </Box>
          );
        })}
      </List>
      <Box marginY="3rem">
        <h4>Today Purchase Orders</h4>
        <List>
          {todayQuan.map((order) => {
            return (
              <Box as="div" key={order.order_id}>
                <ListItem>
                  <TodayOrderQuan order={order} />
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Staff;
