<script setup>
import { defineProps } from "vue";

defineProps({
  products: Array,
  addToCart: Function,
});
</script>

<template>
  <div
    class="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5 mx-5"
  >
    <div
      v-for="product in products"
      class="card bg-base-100 w-full shadow-xl"
    >
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>price : {{ product.price }}</p>
        <div class="card-actions justify-end">
          <button @click="addToCart(product)" class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>
