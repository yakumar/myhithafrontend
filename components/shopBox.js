import React, { useState } from "react";
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
} from "@chakra-ui/core";

import { observer } from "mobx-react";
import { useStores } from "../hooks/use-stores";
import { set } from "mobx";

const ShopBox = observer((props) => {
  const { cartStore } = useStores();
  const [quant, setQuant] = useState(1);
  // console.log("from Shop Box", props);

  const addVal = () => {
    setQuant(quant + 1);
  };
  const removeVal = () => {
    setQuant(quant - 1);
  };

  return (
    <Box w="10rem" h="20rem" rounded="lg" overflow="hidden" m=".8rem">
      <Image
        w="10rem"
        h="6rem"
        src={
          props.image
            ? props.image
            : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg"
        }
      />
      <Text>{props.name} </Text>
      <Badge px="1rem" rounded="sm">
        {props.quantity}
        {props.quantity_type}
      </Badge>
      <Badge px="1rem" rounded="sm" backgroundColor="bg2" p=".6rem">
        {props.price} rs
      </Badge>
      <Stack spacing={4}>
        {/* If you add the size prop to `InputGroup`, it'll pass it to all it's children. */}
        <InputGroup
          size="sm"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <InputLeftAddon children="Qty" />
          ///
          {quant > 0 ? (
            <Button
              margin=".2rem"
              onClick={() => {
                // console.log(`${props.name} ${quant}`);
                removeVal();
              }}
            >
              -
            </Button>
          ) : (
            <Button
              margin=".2rem"
              isDisabled
              onClick={() => {
                // console.log(`${props.name} ${quant}`);
                removeVal();
              }}
            >
              -
            </Button>
          )}
          <h4>{quant}</h4>
          <Button
            margin=".2rem"
            onClick={() => {
              // console.log(`${props.name} ${quant}`);
              addVal();
            }}
          >
            +
          </Button>
          ////
          <Button
            backgroundColor="bg4"
            onClick={() => {
              // console.log(`${props.name} ${quant}`);
              const product = {
                name: props.name,
                weight: props.quantity,
                quantity: props.quantity,
                priceQuantity: quant,
                price: props.price,
                quantity_type: props.quantity_type,
                image_url: props.image,
              };
              props.onBtnClick(product);
            }}
          >
            Add
          </Button>
        </InputGroup>
      </Stack>
    </Box>
  );
});

export default ShopBox;

// <Input
//             rounded=".2rem"
//             placeholder="1"
//             size="sm"
//             val={quant}
//             onChange={(event) => {
//               // console.log("eventval:", event.target.value);
//               setQuant(event.target.value);
//               // props.setQuanVal(event.target.value);
//             }}
//           />
