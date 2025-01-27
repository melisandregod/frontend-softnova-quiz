<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import { onMounted, computed, ref, watch } from "vue";
import { useProductStore } from "@/stores/product";
import { useRoute, useRouter } from "vue-router";
import Product from "@/components/Product.vue";
import { useUserCartStore } from "@/stores/cart";

const userCartStore = useUserCartStore();
const rount = useRoute();
const searchText = ref("");

onMounted(() => {
  if (rount.query.q) {
    searchText.value = rount.query.q;
  }
});
const route = useRoute();
const router = useRouter();
const ProductStore = useProductStore();

const filterProducts = ref([]);

watch(
  () => route.query.q,
  (newSearchText) => {
    searchText.value = newSearchText;
    filterProducts.value = ProductStore.filterProducts(searchText.value);
  },
  { immediate: true }
);
// const filterProducts = computed(() => {
//   return ProductStore.filterProducts(searchText.value);
// });
const addToCart = (productData) => {
  userCartStore.addToCart(productData);
  router.push({ name: "cart" });
};
</script>

<template>
  <UserLayout>
    <div class="m-10">
      <h1 class="text-3xl">
        Search: <span class="font-bold">{{ searchText }}</span>
      </h1>
    </div>
    <div v-if="filterProducts.length > 0">
      <Product :products="filterProducts" :addToCart="addToCart"> </Product>
    </div>
    <div class="m-10" v-else>
      <div class="text-center text-3xl">Product not found</div>
    </div>
  </UserLayout>
</template>
