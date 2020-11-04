import React, { useRef } from "react";

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
// import moment from "moment";
import moment from "moment-timezone";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { newImage } from "../images/image";

const Order = (props) => {
  // console.log("From Order for PDF", props.order);
  const products = props.order.order_details.veggies;
  const address = props.order.customer_address;
  const phone = props.order.customer_phone;
  const name = props.order.customer_name;

  const date = props.order.order_date;
  // const newD = moment.utc(date).format("DD/MM/YYYY");
  // const today = moment().format("DD/MM/YYYY");
  const modDate = new Date(date);

  const newDM = moment(modDate).format("DD/MM/YYYY");
  const unixdate = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");

  console.log("order date", newDM);
  const { isOpen, onOpen, onClose } = useDisclosure();

  ////**** PDF PRINT  */
  const printOrder = (orderList, priceOfOrder, order_id, phony, addr) => {
    let bigArray = [];
    let companyImg = new Image();
    companyImg.src = "../images/myHitha.jpeg";

    orderList.forEach((productMap) => {
      // console.log("productMap :", productMap);
      var cost = productMap.removed_stock_quantity * productMap.each_price;
      // console.log("cost of each", cost);

      let newObj = {};
      newObj["name"] = productMap["name"];
      newObj["weight"] = productMap["weight"];
      newObj["type"] = productMap["quantity_type"];
      newObj["price"] = productMap["price"];
      newObj["quantity"] = productMap["quantity"];
      newObj["calcPrice"] = productMap["calcPrice"];

      let smallArray = Object.values(newObj);
      smallArray.push(cost);
      bigArray.push(smallArray);

      // console.log("bigArray", bigArray);
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

  return (
    <Box>
      <table>
        <Box as="thead" backgroundColor="bg2">
          <tr>
            <th>S.No</th>
            <th>Ordered on</th>
            <th>Total Cost</th>
            <th>Order status</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <Box as="td" pr=".4rem">
              <h4>{props.index}</h4>
            </Box>
            <Box as="td" pr=".4rem">
              {unixdate}
            </Box>
            <Box as="td" pr=".4rem">
              {props.order.cost_of_order}
            </Box>
            <Box as="td" pr=".4rem">
              {props.order.status}
            </Box>
            <Box as="td">
              {" "}
              <Button onClick={onOpen} p=".2rem">
                view order
              </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
              <ModalOverlay />
              <ModalContent textAlign="center" backgroundColor="bg1">
                <ModalHeader>Detail order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <OrderLine
                    orderDate={unixdate}
                    name={name}
                    phone={phone}
                    propys={props}
                  />
                  <Button
                    onClick={() =>
                      printOrder(
                        products,
                        props.order.cost_of_order,
                        props.order.order_id,
                        phone,
                        address
                      )
                    }
                  >
                    print
                  </Button>
                </ModalBody>

                <ModalFooter>
                  <Button variantColor="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default Order;

class OrderLine extends React.Component {
  render() {
    return (
      <Box as="table" textAlign="center" px="2rem" py="2rem">
        <Box as="thead" backgroundColor="bg2">
          <tr>
            <th>Customer Name</th>
            <th>Customer phone</th>
            <th>Order status</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <td>{this.props.name}</td>
            <td>{this.props.phone}</td>
            <td>{this.props.propys.order.status}</td>
          </tr>
        </tbody>
      </Box>
    );
  }
}
