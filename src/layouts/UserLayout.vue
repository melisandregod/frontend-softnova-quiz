<script setup>
import CartView from "@/views/CartView.vue";
import { handleError, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useUserCartStore } from "@/stores/cart";

const userCartStore = useUserCartStore();
const router = useRouter();
const searchText = ref("");
const handleSearch = (event) => {
  if (event.key === "Enter") {
    router.push({
      name: "search",
      query: {
        q: searchText.value,
      },
    });
  }
};
</script>

<template>
  <div class="container mx-auto">
    <!-- header -->
    <div class="navbar bg-base-100">
      <RouterLink :to="{ name: 'home' }" class="flex-1">
        <a class="btn btn-ghost text-xl">บ้านนายดิน</a>
      </RouterLink>

      <div class="flex-none">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
            v-model="searchText"
            @keyup="handleSearch"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">{{
                userCartStore.quantity
              }}</span>
            </div>
          </label>
          <div
            tabindex="0"
            class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <span class="font-bold text-lg"
                >{{ userCartStore.quantity }} Items</span
              >
              <span class="text-info"
                >Subtotal: {{ userCartStore.summaryPrice }} ฿</span
              >
              <div class="card-actions">
                <RouterLink :to="{ name: 'cart' }" class="btn btn-primary btn-block">
                  View cart
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- main content-->
    <slot></slot>

    <!-- footer -->
    <footer class="footer bg-neutral text-neutral-content p-10">
      <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  </div>
</template>
