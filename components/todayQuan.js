import React from "react";

import { Box, Text, useDisclosure, Button } from "@chakra-ui/core";

// import moment from "moment";
import moment from "moment-timezone";

const TodayQuan = (props) => {
  const fetchedDate = props.order.order_date;

  return (
    <Box>
      <table>
        <Box as="thead" backgroundColor="bg3">
          <tr>
            <th>Ordered on</th>
            <th>Item name</th>
            <th>Today ordered quantity</th>
            <th>type</th>
          </tr>
        </Box>
        <tbody>
          <tr>
            <td>
              {" "}
              {moment
                .tz(fetchedDate.toString(), "Asia/Kolkata")
                .format("DD/MM/YYYY")}
            </td>
            <td>{props.order.name}</td>
            <td> {props.order.quantity}</td>
            <td>{props.order.quantity_type}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default TodayQuan;
