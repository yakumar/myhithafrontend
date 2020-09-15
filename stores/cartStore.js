import { observable, action, toJS } from "mobx";

export class CartStore {
  @observable cart = [];

  @observable completeCart = {};

  //{ products: [{ name: "", quantity: null, price: null }], totalCost: null },

  @observable count = 0;
  @observable sum = 0;

  @action
  increment() {
    // console.log(this.count);
    this.count = this.count + 1;
  }

  @action
  addToCart(product) {
    // console.log("added product from cartstore:", product);

    // this.cart = toJS(this.cart);
    // this.completeCart = toJS(this.completeCart);
    // console.log("cart arr1:", this.cart);

    if (this.cart.length > 0) {
      let myproduct = this.cart.find((pro) => pro.name == product.name);
      if (myproduct) {
        // console.log("myproduct :", myproduct);

        myproduct.quantity = myproduct.quantity + product.quantity;
        myproduct.cPrice = myproduct.quantity * myproduct.price;
      } else {
        product["cPrice"] = product.quantity * product.price;
        this.cart.push(product);
      }

      this.sum = this.cart
        .map((o) => o.cPrice)
        .reduce((a, c) => {
          return a + c;
        });
      this.completeCart = { products: this.cart, cost: this.sum };
    } else {
      product["cPrice"] = product.quantity * product.price;
      this.cart.push(product);

      this.cart.map((o) => (this.sum = o.cPrice));

      this.completeCart = { products: this.cart, cost: this.sum };
    }

    // console.log("cart arr:", this.cart);
    // console.log("complete cart", this.completeCart);

    return this.cart, this.cart.completeCart;

    // return this.cart;
  }

  @action
  removeFromCart(product) {
    console.log("removed product:", product);
    this.cart = this.cart.filter((pro) => pro == product);
    console.log("cart arr:", this.cart);
  }
}
