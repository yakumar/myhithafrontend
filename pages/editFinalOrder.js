import React, { useState, useEffect, useLayoutEffect } from "react";
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
  CircularProgress,
} from "@chakra-ui/core";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import { set } from "mobx";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EditFinalOrder = (props) => {
  // console.log("props from edit final", props);
  const router = useRouter();
  // console.log(router.asPath);

  const [didMount, setDidMount] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [myOrderId, setMyOrderId] = useState(0);
  const [myOrderCost, setMyOrderCost] = useState(0);

  // this.sum = this.cart
  // .map((o) => o.cPrice)
  // .reduce((a, c) => {
  //   return a + c;
  // });

  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getSingleOrder",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            order_id: parseInt(router.asPath.split("=")[1]),
          },
        }
      );

      // console.log("result", result.data.data[0].cost_of_order);
      setProducts(result.data.data[0].order_details.veggies);
      setMyOrderId(result.data.data[0].order_id);
      setMyOrderCost(result.data.data[0].cost_of_order);

      //getTodayOrderQuantity

      //   // setOrderArray([]);
    };
    fetchData();
    setDidMount(true);
    return () => setDidMount(false);
    // console.log("result useeffect");
  }, []);

  if (!didMount) {
    return null;
  }

  const handleClick = () => {
    setShow(!show);
  };

  const submitEditFinalOrder = async () => {
    // console.log("editing initiated");
    const data = {
      isAdmin: localStorage.getItem("isAdmin"),
      order_id: myOrderId,
      products: products,
      cost_of_order: myOrderCost,
    };
    await axios({
      method: "put",
      url: "https://arcane-springs-88980.herokuapp.com/updateFinalOrder",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
    });
    router.reload();

    // console.log("result", result.data);
    setPassword("");
    setPhone("");
  };
  const renderTodayHeader = () => {
    let headerElement = [
      // "Veg id",
      "Item Name",
      "weight",
      "quantity type",
      "Quantity ordered",
      "Type",
    ];

    return headerElement.map((key, index) => {
      return (
        <Box as="th" px="1rem" key={index}>
          {key}
        </Box>
      );
    });
  };
  const renderTodayBody = () => {
    return (
      products &&
      products.map((ordery) => {
        return (
          <Box as="tr" key={ordery.name}>
            <td>{ordery.name}</td>
            <td>{ordery.weight}</td>
            <td>{ordery.quantity_type}</td>
            <td>{ordery.quantity}</td>
            <td>{ordery.calcPrice}</td>
            <Box as="td">
              <Button
                m=".5rem"
                onClick={() => {
                  let newProducts = products.filter((pro) => {
                    return pro.name != ordery.name;
                  });
                  setProducts(newProducts);
                  let sum = newProducts
                    .map((o) => o.calcPrice)
                    .reduce((a, c) => {
                      return a + c;
                    });
                  // console.log("sum", sum);

                  setMyOrderCost(sum);
                }}
              >
                Remove Item
              </Button>
            </Box>
          </Box>
        );
      })
    );
  };

  return (
    <Layout>
      <Box>
        <Box
          bg="bg2"
          w={["32rem", "36rem", "42em", "50rem"]}
          h="40rem"
          marginX={["8rem", "10rem", "20rem", "20rem"]}
          marginY={["5rem", "6rem", "8em", "10rem"]}
          marginLeft={["1rem", "3rem", "6rem", "25rem"]}
          padding="1rem"
          textAlign="center"
          borderRadius="5rem"
          borderBottomColor="bg3"
          boxShadow="1rem 2rem bg1"
          overflowX="scroll"
        >
          <Heading as="h2"> EditFinalOrder</Heading>

          <Box marginY="3rem">
            <Heading as="h3" size="lg">
              Today Purchase Orders
            </Heading>
            <table id="employee1">
              <Box as="thead" backgroundColor="bg3">
                <Box as="tr">{renderTodayHeader()}</Box>
              </Box>
              <Box as="tbody">{renderTodayBody()}</Box>
            </table>

            {products.length > 0 ? (
              ""
            ) : (
              <CircularProgress
                isIndeterminate
                color="green"
              ></CircularProgress>
            )}
          </Box>

          <Button
            padding="1rem"
            onClick={() => submitEditFinalOrder()}
            title="EditFinalOrder"
            borderRadius=".4rem"
            color="red"
            bg="bg1"
            type="submit"
          >
            EditFinalOrder
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditFinalOrder;
