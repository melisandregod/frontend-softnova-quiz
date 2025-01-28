<script setup>
import UserLayout from "../layouts/UserLayout.vue";
import { onMounted ,ref, onUnmounted} from "vue";
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

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
];

const currentIndex = ref(0);
let interval = null;


const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};


onMounted(() => {
  interval = setInterval(nextSlide, 3000); // เปลี่ยนรูปทุก 3 วินาที
});


onUnmounted(() => {
  clearInterval(interval);
});

const scrollToProducts = () => {
  const productSection = document.getElementById("product-section");
  if (productSection) {
    productSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <!-- <div>{{ ProductStore.list.data }}</div>  -->
  <UserLayout>
    <!-- herooooo -->
    <div class="relative h-96">
      <div class="absolute inset-0  overflow-hidden">
        <div class="w-full h-full relative">
          <img
            :src="images[currentIndex]"
            class="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700"
          />
        </div>
           
      </div>

      <div
        class="hero bg-base-200 bg-opacity-30 h-96 flex items-center justify-center relative z-10"
      >
        <div class="hero-content text-center text-black">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">ยินดีต้อนรับ</h1>
            <p class="py-6">เว็บไซต์ของเรามีสินค้าหลากหลายให้คุณเลือกซื้อ</p>
            <button class="btn btn-primary" @click="scrollToProducts">เริ่มต้นเลย</button>
          </div>
        </div>
      </div>
    </div>
    <!-- producttt -->
     <div id="product-section">
      <Product :products="ProductStore.list" :addToCart="addToCart"> </Product>
     </div>
    
  </UserLayout>
</template>
