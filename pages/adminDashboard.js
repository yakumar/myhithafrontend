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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
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

// import moment from "moment";
import moment from "moment-timezone";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const AdminDash = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [myProducts, setMyProducts] = useState([]);

  const [didMount, setDidMount] = useState(false);

  const [orderArray, setOrderArray] = useState([]);

  const [todayQuan, setTodayQuan] = useState([]);

  console.log("today", moment().format("DD/MM/YYYY"));
  useEnhancedEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getorders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const todayOrderQuantities = await axios.get(
        "https://arcane-springs-88980.herokuapp.com/getTodayOrderQuantity",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("result", result.data.data);
      //getTodayOrderQuantity

      const newArray = result.data.data.filter((val) => {
        const today = moment().format("DD/MM/YYYY");

        const dD = val.order_date;

        const unixdate = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
        console.log("Unix Date", unixdate);

        const newD = moment(dD.toString()).format("DD/MM/YYYY");
        console.log("order date in new", newD);

        return newD == unixdate;
      });

      // console.log("newArray!!!:", newArray);
      // if (!newArray.length) {
      //   // setOrderArray([]);
      // }
      setOrderArray(newArray);

      setTodayQuan(todayOrderQuantities.data.data);

      // console.log("today Quan", todayQuan);
    };
    fetchData();
    setDidMount(true);
    return () => setDidMount(false);
    // console.log("result useeffect");
  }, []);

  if (!didMount) {
    return null;
  }

  // const _editClose = () => {
  //   _editItem();
  //   onClose();
  // };

  // const _editItem = async (orderDetails, productsMod) => {
  //   console.log("editing initiated");
  //   const data = {
  //     isAdmin: localStorage.getItem("isAdmin"),
  //     order_id: orderDetails.order_id,
  //     products: productsMod,
  //   };
  //   await axios({
  //     method: "put",
  //     url: "https://arcane-springs-88980.herokuapp.com/updateFinalOrder",
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     data: data,
  //   });
  //   router.reload();
  // };
  // cloudinary.uploader.upload(imageUpload).then((dat) => console.log(dat));
  const renderHeader = () => {
    let headerElement = [
      "Order id",
      "Ordered date",
      "Customer name",
      "Total cost",
      "Order status",
    ];

    return headerElement.map((key, index) => {
      return (
        <Box as="th" px="1rem" key={index}>
          {key}
        </Box>
      );
    });
  };

  const renderBody = () => {
    return (
      orderArray &&
      orderArray.map((ordery) => {
        console.log("ordery from ordery:", ordery);
        const date = ordery.order_date;
        // const newD = moment.utc(date).format("DD/MM/YYYY");
        // const today = moment().format("DD/MM/YYYY");
        const modDate = new Date(date);

        const newDM = moment(modDate).format("DD/MM/YYYY");

        return (
          <tr key={ordery.order_id}>
            <td>{ordery.order_id}</td>
            <td>{newDM}</td>
            <td>{ordery.customer_name}</td>
            <td>{ordery.cost_of_order}</td>
            <td>{ordery.status}</td>
            <Box as="td">
              <Button
                m=".5rem"
                onClick={() =>
                  router.push({
                    pathname: "/editFinalOrder",
                    query: { order_id: ordery.order_id },
                  })
                }
              >
                Edit Order
              </Button>
            </Box>

            <Box as="td">
              <Button
                m=".5rem"
                onClick={() =>
                  printOrder(
                    ordery.order_details.veggies,
                    ordery.cost_of_order,
                    ordery.order_id,
                    ordery.customer_phone,
                    ordery.customer_address
                  )
                }
              >
                Print
              </Button>
            </Box>
          </tr>
        );
      })
    );
  };
  const renderTodayHeader = () => {
    let headerElement = [
      "Order id",
      "Ordered date",
      "Item Name",
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

  ////**** PDF PRINT  */
  const printOrder = (orderList, priceOfOrder, order_id, phony, addr) => {
    let bigArray = [];
    let companyImg = new Image();
    companyImg.src = "../images/myHitha.jpeg";

    orderList.forEach((productMap) => {
      console.log("productMap :", productMap);
      var cost = productMap.removed_stock_quantity * productMap.each_price;
      console.log("cost of each", cost);

      let newObj = {};
      newObj["name"] = productMap["name"];
      newObj["weight"] = productMap["weight"];
      newObj["type"] = productMap["quantity_type"];
      newObj["price"] = productMap["price"];
      newObj["quantity"] = productMap["quantity"];
      newObj["calcPrice"] = productMap["calcPrice"];

      let smallArray = Object.values(newObj);
      console.log("smallArray", smallArray);

      smallArray.push(cost);
      console.log("smallArray", smallArray);

      bigArray.push(smallArray);

      console.log("bigArray", bigArray);
    });
    var doc = new jsPDF("p", "pt");

    doc.setFontSize(30);
    // doc.textAlign("TAX INVOICE", { align: "center" }, 20, 10);
    doc.text(320, 50, "MyHitha.", { align: "center" });
    // var imgData =
    //   "data:image/jpeg;base64," + Base64.encode("../images/myHitha.jpeg");

    doc.addImage(newImage, "JPEG", 60, 20, 140, 80);
    // doc.output("datauri");

    // doc.addImage(headerImgData, "JPEG", 15, 20, 50, 50);

    // doc.setFontType("normal");
    // doc.text(20, 60, "This is the second title.");
    doc.setFontSize(20);

    doc.text(320, 90, `Order id: ${order_id}`, { align: "center" });

    doc.setFontSize(13);

    doc.text(320, 120, `Delivery address: ${addr}`, { align: "center" });
    doc.text(320, 150, `Customer Contact: ${phony}`, { align: "center" });

    doc.autoTable({
      startY: 170,
      head: [
        [
          "Name of the product",
          "weight",
          "type",
          "each price",
          "quantity",

          "Calc Price",
        ],
      ],
      body: bigArray,
    });

    doc.autoTable({
      theme: "plain",
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 15, fontStyle: "italic" },

      // head: [[""], [""]],
      body: [["Total :", priceOfOrder]],
    });

    doc.setFontSize(13);

    doc.text(320, 370, `************************`, { align: "center" });
    doc.text(320, 380, `pay thru Phone pe : Number - 999999999`, {
      align: "center",
    });

    doc.save("order.pdf");
  };

  const renderTodayBody = () => {
    return (
      todayQuan &&
      todayQuan.map((ordery) => {
        const date = ordery.order_date;
        // const newD = moment.utc(date).format("DD/MM/YYYY");
        // const today = moment().format("DD/MM/YYYY");
        const modDate = new Date(date);

        const newDM1 = moment(modDate).format("DD/MM/YYYY");

        return (
          <Box as="tr" key={ordery.id}>
            <td>{ordery.id}</td>
            <td>{newDM1}</td>
            <td>{ordery.name}</td>
            <td>{ordery.quantity}</td>
            <td>{ordery.quantity_type}</td>
          </Box>
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
          <Heading as="h3" size="lg" mt="1rem" textAlign="center">
            Customer Orders
          </Heading>

          <table id="employee">
            <Box as="thead" backgroundColor="bg4">
              <tr>{renderHeader()}</tr>
            </Box>
            <Box as="tbody">{renderBody()}</Box>
          </table>

          {orderArray.length > 0 ? (
            ""
          ) : (
            <CircularProgress isIndeterminate color="green"></CircularProgress>
          )}
        </Box>

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

          {todayQuan.length > 0 ? (
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
