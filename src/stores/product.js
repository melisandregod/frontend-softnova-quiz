import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [],
    selectedProduct: {},
    statuses: ["Pending", "Doing", "Done"],
    cart: []
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.list.find((product) => product._id === id);
    }
  }
  ,
  actions: {
    async loadProduct() {
      try {
        const response = axios.get("http://localhost:3000/products?limit=100");
        this.list = (await response).data.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    filterProducts(searchName) {
      return this.list.filter((product) => product.name.includes(searchName));
    },
  },
});
