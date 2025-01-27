<script setup>
import UserLayout from "../layouts/UserLayout.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import Product from "@/components/Product.vue";

const userCartStore = useUserCartStore();
const ProductStore = useProductStore();

const router = useRouter();

onMounted(async () => {
  await ProductStore.loadProduct();
  console.log(ProductStore.list);
});

const addToCart = (productData) => {
  userCartStore.addToCart(productData);
  router.push({ name: "cart" });
};
</script>

<template>
  <!-- <div>{{ ProductStore.list.data }}</div>  -->
  <UserLayout>
    <!-- herooooo -->
    <div class="hero bg-base-200 h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello To Baan Naay Din Book Store</h1>
          <p class="py-6"></p>
        </div>
      </div>
    </div>
    <!-- producttt -->
    <Product :products="ProductStore.list" :addToCart="addToCart"> </Product>
  </UserLayout>
</template>
