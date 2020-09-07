import React from "react";
import { CartStore } from "../stores/cartStore";

export const storesContext = React.createContext({
  cartStore: new CartStore(),
});
