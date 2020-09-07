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
import moment from "moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { newImage } from "../images/image";

const Order = (props) => {
  // console.log(props.order.order_details);
  const products = props.order.order_details;

  const date = props.order.order_date;
  // const newD = moment.utc(date).format("DD/MM/YYYY");
  // const today = moment().format("DD/MM/YYYY");
  const modDate = new Date(date);

  const newDM = moment(modDate).format("DD/MM/YYYY");

  // console.log("order date", newDM);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printOrder = (orderList) => {
    let bigArray = [];
    let companyImg = new Image();
    companyImg.src = "../images/myHitha.jpeg";

    orderList.forEach((productMap) => {
      console.log("productMap :", productMap);
      var cost = productMap.removed_stock_quantity * productMap.each_price;
      console.log("cost of each", cost);
      let smallArray = Object.values(productMap);
      smallArray.push(cost);
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

    doc.autoTable({
      startY: 120,
      head: [["Name of the product", "quantity", "price", "total"]],
      body: bigArray,
    });

    doc.autoTable({
      theme: "plain",
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 15, fontStyle: "italic" },

      // head: [[""], [""]],
      body: [["Total :", "200"]],
    });

    doc.save("order.pdf");
  };

  return (
    <Box>
      <table>
        <Box as="thead" backgroundColor="bg2">
          <tr>
            <th>Ordered on</th>
            <th>Total Cost</th>
            <th>Order status</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <td>{newDM}</td>
            <td>{props.order.cost_of_order}</td>
            <td>{props.order.status}</td>
            <td>
              {" "}
              <Button onClick={onOpen} p=".2rem">
                view order
              </Button>
            </td>
            <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
              <ModalOverlay />
              <ModalContent textAlign="center" backgroundColor="bg1">
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <OrderLine orderDate={newDM} propys={props} />
                  <Button onClick={() => printOrder(products)}>print</Button>
                </ModalBody>

                <ModalFooter>
                  <Button variantColor="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
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
            <th>Ordered on</th>
            <th>Total Cost</th>
            <th>Order status</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <td>{this.props.orderDate}</td>
            <td>{this.props.propys.order.cost_of_order}</td>
            <td>{this.props.propys.order.status}</td>
            <table>
              <Box as="thead">
                <tr>
                  <th>Name</th>
                  <th>Item quantity</th>
                  <th>each item price</th>
                </tr>
              </Box>
            </table>
          </tr>
        </tbody>
      </Box>
    );
  }
}
