import { defineStore } from "pinia";
import axios from "axios";

export const useUserCartStore = defineStore("user-cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    summaryPrice(state) {
      return state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    quantity(state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    loadCart() {
      const cartItem = localStorage.getItem("cart-item");
      if (cartItem) {
        this.items = JSON.parse(cartItem);
      }
    },
    addToCart(productData) {
      const itemIndex = this.items.findIndex(
        (item) => item.name === productData.name
      );
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1);
      } else {
        productData.quantity = 1;
        this.items.push(productData);
      }
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = parseInt(quantity);
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },
    removeItemInCart(index) {
      this.items.splice(index, 1);
      localStorage.setItem("cart-item", JSON.stringify(this.items));
    },

    transformDataForAPI() {
      return {
        products: this.items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };
    },
    
       calculateTotalWithPromotion() {
        const bookPrice = 100; 
        let total = 0;
        let discount = 0;
        let totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        let cart = JSON.parse(JSON.stringify(this.items));
  
        
        while (cart.length > 0) {
          const uniqueBooks = [];
          cart = cart.filter((item) => {
            if (!uniqueBooks.includes(item._id)) {
              uniqueBooks.push(item._id);
              item.quantity -= 1;
              return item.quantity > 0;
            }
            return true;
          });
  
          
          const groupSize = uniqueBooks.length;
          const groupPrice = groupSize * bookPrice;
  
         
          let groupDiscount = 0;
          if (groupSize === 2) groupDiscount = groupPrice * 0.1; 
          if (groupSize === 3) groupDiscount = groupPrice * 0.2; 
          if (groupSize === 4) groupDiscount = groupPrice * 0.3; 
          if (groupSize === 5) groupDiscount = groupPrice * 0.4; 
          if (groupSize === 6) groupDiscount = groupPrice * 0.5; 
          if (groupSize === 7) groupDiscount = groupPrice * 0.6; 
  
          total += groupPrice;
          discount += groupDiscount;
        }
        
        return {
          totalItems,
          totalPrice: total,
          discount,
          netTotal: total - discount,
        };
      },
  

    //post
    async sendCartToAPI() {
      const apiData = this.transformDataForAPI();
      try {
        const response = await axios.post(
          "http://localhost:3000/cart/",
          apiData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response.data);
      } catch (error) {
        console.error(
          "Error sending data to API:",
          error.response?.data || error.message
        );
      }
    },
  },
});
