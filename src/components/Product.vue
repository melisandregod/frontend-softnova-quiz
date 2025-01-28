<script setup>
import { defineProps } from "vue";

defineProps({
  products: Array,
  addToCart: Function,
});

const getProductImage = (productName) => {
  const images = {
    "แฮร์รี่ พอตเตอร์กับศิลาอาถรรพ์": "/images/image1.jpg",
    "แฮร์รี่ พอตเตอร์กับห้องแห่งความลับ": "/images/image2.jpg",
    "แฮร์รี่ พอตเตอร์กับนักโทษแห่งอัซคาบัน": "/images/image3.jpg",
    "แฮร์รี่ พอตเตอร์กับถ้วยอัคนี": "/images/image1.jpg",
    "แฮร์รี่ พอตเตอร์กับภาคีนกฟีนิกซ์": "/images/image5.jpg",
    "แฮร์รี่ พอตเตอร์กับเจ้าชายเลือดผสม": "/images/image6.jpg",
    "แฮร์รี่ พอตเตอร์กับเครื่องรางยมทูต": "/images/image7.jpg",
  };
  return images[productName] || "/images/image1.jpg";
};
</script>

<template>
  <div
    class="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 mx-5"
  >
    <div
      v-for="product in products"
      class="card bg-base-100 w-full shadow-xl transition-transform hover:scale-105"
    >
      <figure>
        <img
          :src="getProductImage(product.name)"
          :alt="product.name"
          class="product-image"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <div class="flex justify-between items-center mt-auto pt-4">
          <span class="text-xl font-bold text-blue-600"
            >{{ product.price }} ฿</span
          >

          <button
            @click="addToCart(product)"
            class="btn btn-primary hover:scale-105 transition-transform"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
