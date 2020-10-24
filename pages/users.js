import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Heading,
  IconButton,
  Icon,
} from "@chakra-ui/core";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { newImage } from "../images/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import axios from "axios";
import Order from "../components/order";
import TodayOrderQuan from "../components/todayQuan";
import Layout from "../components/Layout";

import moment from "moment";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const AdminDash = () => {
  const router = useRouter();

  const [didMount, setDidMount] = useState(false);

  const [orderArray, setOrderArray] = useState([]);

  const [todayQuan, setTodayQuan] = useState([]);

  const today = moment().format("DD/MM/YYYY");

  console.log("today", moment().format("DD/MM/YYYY"));
  useEnhancedEffect(() => {
    const fetchData = async () => {
      const data = {
        // name: props.item.name,
        isAdmin: localStorage.getItem("isAdmin"),
      };
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getUsers",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: data,
        }
      );
      //   const todayOrderQuantities = await axios.get(
      //     "https://arcane-springs-88980.herokuapp.com/getTodayOrderQuantity",
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     }
      //   );

      console.log("result", result.data.data);
      //getTodayOrderQuantity

      //   const newArray = result.data.data.filter((val) => {
      //     const dD = val.order_date;
      //     const newD = moment(dD.toString()).format("DD/MM/YYYY");
      //     // console.log("order date in new", newD);

      //     return newD == today;
      //   });

      //   console.log("newArray!!!:", newArray);
      // if (!newArray.length) {
      //   // setOrderArray([]);
      // }
      setOrderArray(result.data.data);

      //   setTodayQuan(todayOrderQuantities.data.data);

      console.log("today Quan", todayQuan);
    };
    fetchData();
    setDidMount(true);
    return () => setDidMount(false);
    // console.log("result useeffect");
  }, []);

  if (!didMount) {
    return null;
  }

  // cloudinary.uploader.upload(imageUpload).then((dat) => console.log(dat));
  const renderHeader = () => {
    let headerElement = ["phone", "user_id"];

    return headerElement.map((key, index) => {
      return (
        <Box as="th" px="1rem" key={index}>
          {key}
        </Box>
      );
    });
  };

  const deleteUser = async (phoneNum) => {
    const data = {
      phone: phoneNum,
      isAdmin: localStorage.getItem("isAdmin"),
    };
    await axios({
      method: "delete",
      url: "https://arcane-springs-88980.herokuapp.com/deleteuser",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: data,
    });
    router.reload();
  };

  const renderBody = () => {
    return (
      orderArray &&
      orderArray.map((ordery) => {
        // const date = ordery.order_date;
        // const newD = moment.utc(date).format("DD/MM/YYYY");
        // const today = moment().format("DD/MM/YYYY");
        // const modDate = new Date(date);

        // const newDM = moment(modDate).format("DD/MM/YYYY");

        return (
          <tr key={`${ordery.phone}`}>
            <td>{ordery.phone}</td>
            <td>{ordery.user_id}</td>
            <Box as="td">
              <Button m=".5rem" onClick={() => deleteUser(ordery.phone)}>
                Delete
              </Button>
            </Box>
          </tr>
        );
      })
    );
  };

  return (
    <Layout>
      <Box
        textAlign="center"
        marginX={[".3rem", ".7rem", "8rem", "10rem"]}
        marginLeft={["0rem", "0rem", "10rem", "23rem"]}
        mr={[".3rem", ".7rem", "8rem", "1rem"]}
        overflowX="scroll"
      >
        <Box>
          <Button
            as="a"
            backgroundColor="bg2"
            m=".5rem"
            mt={["0rem", "0rem", "-5rem", "1rem"]}
            cursor="pointer"
            ml={["-1rem", "0rem", "1rem", "0rem"]}
            aria-label="Logout"
            icon="arrow-down"
            onClick={() => {
              router.push("/createUser");
            }}
          >
            Create User
          </Button>
          <Link href="/">
            <IconButton
              as="a"
              backgroundColor="bg2"
              m=".5rem"
              mt={["0rem", "0rem", "-5rem", "1rem"]}
              cursor="pointer"
              ml={["0rem", "2rem", "3rem", "1rem"]}
              w={["3.5rem", "4rem", "5rem", "6rem"]}
              aria-label="Logout"
              icon="arrow-down"
              onClick={() => {
                router.push("/");
                localStorage.removeItem("token");
                // router.replace("/", "/", { shallow: true });
              }}
            />
          </Link>
        </Box>
        <Box>
          <Heading as="h3" size="lg" textAlign="center">
            Users
          </Heading>

          <Box
            as="table"
            id="employee"
            ml={["6rem", "16rem", "16rem", "25rem"]}
          >
            <Box as="thead" backgroundColor="bg4">
              <tr>{renderHeader()}</tr>
            </Box>
            <Box as="tbody">{renderBody()}</Box>
          </Box>

          {orderArray.length > 0 ? (
            ""
          ) : (
            <CircularProgress isIndeterminate color="green"></CircularProgress>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default AdminDash;

// <Box>
// <input type="file" onChange={fileUpload} />
// <Button onClick={() => imageUploadFunc()}>Upload image</Button>
// </Box>
