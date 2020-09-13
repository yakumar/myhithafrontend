import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Heading,
  Text,
  Image,
  Button,
  Select,
  Checkbox,
} from "@chakra-ui/core";
import Router, { useRouter } from "next/router";

import Layout from "../components/Layout";

const AddVeg = () => {
  const router = useRouter();

  const [name, setName] = useState("");

  const [quantity, setQuantity] = useState(0);

  const [eachPrice, setEachPrice] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [categoryVal, setcategoryVal] = useState("vegetables");

  const [stocky, setStocky] = useState("yes");
  const [type, setType] = useState("grams");

  const typeChange = (e) => {
    setType(e.target.value);
  };
  const stockChange = (e) => {
    setStocky(e.target.value);
  };

  const categoryChange = (e) => {
    setcategoryVal(e.target.value);
  };

  const fileUpload = (event) => {
    console.log(event.target.files[0]);
    setImageUpload(event.target.files[0]);
  };
  const imageUploadFunc = () => {
    let fd = new FormData();
    fd.append("file", imageUpload);
    fd.append("api_key", "754257536857617");
    fd.append("upload_preset", "gpnk0lxa");

    axios
      .post("https://api.cloudinary.com/v1_1/reactindia/image/upload", fd)
      .then((data) => setImageUrl(data.data.secure_url))
      .catch((e) => console.log(e));
  };

  const formySubmit = async () => {
    const data = {
      name: name,
      each_price: eachPrice,
      quantity: quantity,

      quantity_type: type,
      image_url: imageUrl,
      category: categoryVal,
      inStock: stocky,
    };
    // const submitedOrder = await axios.post("http://localhost:8080/createOrder");

    try {
      await axios({
        method: "post",
        url: "https://arcane-springs-88980.herokuapp.com/insertNewVeg",
        headers: {},
        data: data,
      });
      router.push("https://myhitha.vercel.app/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>
      <Box textAlign="center" m={["1rem", ""]}>
        <Heading mb={["14rem", "2rem", "2rem"]}>
          Add a Vegetable / Fruit / DryFruit
        </Heading>
        <Box
          textAlign="center"
          d="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          size="md"
          rounded="1rem"
          borderColor="bg3"
          ml={["-1rem", "4rem", "8rem", "22rem"]}
          mr={["1rem", "4rem", "2rem", "auto"]}
          pt={["3rem", ""]}
        >
          <Text as="i">Item Name</Text>
          <Input
            p="1.5rem"
            placeholder="item name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            marginBottom="2rem"
            width={["15rem", "30rem"]}
          />
          <Box d="flex" flexDirection={["column", "row"]}>
            <Text as="i" px={[".3rem", "1rem"]}>
              quantity
            </Text>
            <Input
              placeholder="quantity eg.. 250 or 1"
              type="text"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              marginBottom="2rem"
            />
            <Text as="i" px={[".3rem", "1rem"]}>
              each price
            </Text>
            <Input
              placeholder="price of each eg.. 25.0"
              type="text"
              onChange={(e) => setEachPrice(e.target.value)}
              value={eachPrice}
              marginBottom="2rem"
            />
          </Box>
          <Box d="flex" flexDirection={["column", "row"]}>
            <Text as="i" px={[".3rem", "1rem"]}>
              quantity type
            </Text>
            <Select
              placeholder="Select Type"
              mb="2rem"
              value={type}
              onChange={(e) => typeChange(e)}
            >
              <option value="grams">grams</option>
              <option value="unit">unit</option>
            </Select>
            <Text as="i" px={[".3rem", "1rem"]}>
              In stock
            </Text>
            <Select
              placeholder="Select Category"
              mb="2rem"
              value={stocky}
              onChange={(e) => stockChange(e)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Box>
          <Text as="i" px={[".3rem", "1rem"]}>
            Category
          </Text>

          <Select
            placeholder="Select Category"
            mb="2rem"
            value={categoryVal}
            onChange={(e) => categoryChange(e)}
            w={["15rem", ""]}
          >
            <option value="vegetables">Vegetables</option>
            <option value="fruits">fruits</option>
            <option value="dryfruits">dry fruits</option>
          </Select>
          <Box
            d="flex"
            flexDirection={["column", "row"]}
            alignItems="center"
            mb={["14rem", "3rem"]}
          >
            <input type="file" onChange={fileUpload} />

            <Button onClick={() => imageUploadFunc()} my={["1rem", ""]}>
              Upload image
            </Button>
            {imageUrl.length > 0 ? (
              <Checkbox
                textAlign="center"
                defaultIsChecked
                ml={["1rem", "1rem"]}
              ></Checkbox>
            ) : (
              <Checkbox
                isDisabled
                defaultIsChecked
                ml={["1rem", "1rem"]}
                // height="10em"
                // width="10rem"
              ></Checkbox>
            )}
          </Box>
        </Box>
        <Button
          type="submit"
          onClick={() => formySubmit()}
          my={["1rem", ""]}
          color="bg3"
          borderColor="bg3"
          borderWidth=".2rem"
        >
          Add Item
        </Button>
      </Box>
    </Layout>
  );
};

export default AddVeg;
