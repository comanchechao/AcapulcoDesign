<i18n lang="yaml">
en:
  shoppingCart: 'ُShopping Cart'
  subTotal: 'Subtotal'
  shipping: 'Shipping'
  total: 'Total'
  delete: 'Delete'
  checkout: 'Checkout'

fa:
  shoppingCart: 'سبد خرید'
  subTotal: 'جمع سبد خرید'
  shipping: 'هزینه ی ارسال'
  total: 'کل مبلغ پرداختی'
  delete: 'پاک کردن'
  checkout: 'ادامه ی خرید'
</i18n>

<template>
  <div class="">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          fab
          dark
          depressed
          x-large
          color="transparent"
          v-on="on"
          @click="drawer = !drawer"
        >
          <v-badge
            :content="cartTotalAmount"
            :value="cartTotalAmount"
            color="deep purple"
            overlap
            bordered
            location="top-left"
            light
          >
            <v-icon>mdi-shopping-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span> {{ $t('shoppingCart') }} </span>
    </v-tooltip>

    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      scrollable
      app
      class="drawer orange lighten-2"
      width="30%"
      bottom
    >
      <div
        class="p-4 w-full h-2/3 flex flex-row lg:flex-col justify-around align-center"
      >
        <div
          class="max-h-52 lg:max-h-full w-5/6 h-4/5 space-y-3 flex flex-col overflow-x-scroll"
        >
          <div
            v-for="item in cart"
            :key="item.id"
            class="w-full h-24 flex bg-white rounded-lg"
          >
            <div
              class="w-2/3 h-full flex justify-center align-center space-x-3"
            >
              <img
                class="float-left rounded-full w-24 h-24"
                :src="item.image"
              />
              <div class="space-y-2 flex justify-end flex-col align-start">
                <h1 class="font-mainFont font-extrabold text-2xl">
                  {{ item.item.title }}
                </h1>
                <button
                  class="py-1 bg-Rose-300 border-2 border-pink-800 rounded-full"
                  @click.prevent="removeCartProduct(item)"
                >
                  <span class="px-5 font-mainFont text-xl text-pink-800">
                    {{ $t('delete') }}
                  </span>
                </button>
              </div>
            </div>
            <div
              class="w-1/3 h-full flex justify-between align-center flex-col"
            >
              <h1 class="font-mainFont font-black text-2xl">
                {{ item.item.price }}
              </h1>
              <div class="flex justify-center align-center">
                <v-btn
                  small
                  large
                  fab
                  plain
                  class="minus"
                  color="#00ffaa"
                  @click="decrementQuantity(item)"
                >
                  <v-icon>mdi-minus</v-icon></v-btn
                >
                <p class="font-black font-mainFont text-mainBlue">
                  {{ item.quantity }}
                </p>
                <v-btn
                  light
                  large
                  fab
                  plain
                  class="plus"
                  color="#00ffaa"
                  @click="incrementQuantity(item)"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout w-full lg:h-1/3 flex justify-center align-end p-5">
        <div class="w-4/5 h-full flex flex-col justify-center align-end">
          <div class="w-full h-2/3 flex justify-evenly flex-col">
            <div class="flex justify-around text-center">
              <h1 class="font-extralight font-mainFont text-2xl text-mainBlue">
                {{ $t('subTotal') }}
              </h1>
              <h1 class="font-extralight font-mainFont text-2xl text-mainBlue">
                {{ $t('shipping') }}
              </h1>

              <h1 class="font-bold font-mainFont text-3xl text-mainBlue">
                {{ $t('total') }}
              </h1>
            </div>
            <div class="flex justify-around h-full align-center">
              <h1 class="font-extralight font-mainFont text-2xl text-mainBlue">
                {{ cartTotalPrice }} IRL
              </h1>
              <h1 class="font-extralight font-mainFont text-2xl text-mainBlue">
                15 IRL
              </h1>

              <h1 class="font-bold font-mainFont text-3xl text-mainBlue">
                {{ total }} IRL
              </h1>
            </div>
          </div>
          <div class="h-1/3 w-full flex justify-center align-center">
            <NuxtLink
              v-if="$route.path.toString().includes('fa')"
              to="/fa/checkoutpage"
            >
              <button
                class="checkoutBtn p-4 lg:py-3 flex justify-center align-center"
              >
                <span
                  class="pl-4 checkoutText font-mainFont text-2xl lg:text-4xl"
                >
                  {{ $t('checkout') }}
                </span>
                <v-icon x-large class="pink--text text--darken-2"
                  >mdi-arrow-right-circle</v-icon
                >
              </button>
            </NuxtLink>
            <NuxtLink v-else to="/checkoutpage">
              <button
                class="checkoutBtn p-4 lg:py-3 flex justify-center align-center"
              >
                <span
                  class="pl-4 checkoutText font-mainFont text-2xl lg:text-4xl"
                >
                  {{ $t('checkout') }}
                </span>
                <v-icon x-large class="pink--text text--darken-2"
                  >mdi-arrow-right-circle</v-icon
                >
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import CheckoutDialog from './CheckoutDialog'
export default {
  components: {
    // CheckoutDialog,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },

    cartTotalAmount() {
      return this.$store.getters.cartItemCount
    },
    cartTotalPrice() {
      return this.$store.getters.cartTotalPrice
    },
    total() {
      return this.cartTotalPrice + 15
    },
  },
  methods: {
    removeCartProduct(Product) {
      this.$store.dispatch('removeCartProduct', Product)
    },
    incrementQuantity(Product) {
      this.$store.commit('incerementQuantity', Product)
    },
    decrementQuantity(Product) {
      this.$store.commit('decrementQuantity', Product)
    },
  },
}
</script>

<style scoped>
* {
  font-family: 'Yanone Kaffeesatz', 'Rezvan';
}
.drawer {
  z-index: 199 !important;
}
/* .itemName {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
  line-height: 30px;
}
.price {
  font-family: 'Monserrat', sans-serif;
  font-size: 25px;
  font-weight: 700;
}
.delete {
  grid-area: 2 / 3 / 3 / 4;
  font-family: 'Montserrat', sans-serif;
  color: #d32f2f;
  text-transform: capitalize;
}

.productImage {
  border-radius: 50%;
  float: left;
  width: 70px;
  height: 70px;
} */
.checkoutBtn {
  background-color: #44df8a;
  color: #120129;
  border-radius: 35px;
  transition: ease-in-out 0.2s;
}
.checkoutBtn:hover {
  background-color: #120129;
  color: #ff4a68;
}
.checkoutBtn:active {
  transform: scale(1.05);
  filter: brightness(0.5);
}
.checkoutText,
.editText {
  text-transform: capitalize;
}
/* 
.editBtn {
  background-color: #ff4a68;
  color: #120129;
  border-radius: 35px;
  transition: ease-in-out 0.2s;
}

.editBtn:hover {
  background-color: #120129;
  color: #ff4a68;
}
.editBtn:active {
  transform: scale(1.05);
  filter: brightness(0.5);
} */
</style>
