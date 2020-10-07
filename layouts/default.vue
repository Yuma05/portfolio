<template>
  <v-app>
    <v-content>
      <v-navigation-drawer v-model="drawer" temporary fixed>
        <v-list nav dense>
          <v-list-item to="/#about">
            <v-list-item-title
              class="blue--text text--darken-4"
              @click="drawer = !drawer"
              >ABOUT ME
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/#works">
            <v-list-item-title
              class="blue--text text--darken-4"
              @click="drawer = !drawer"
              >WORKS
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/#contact">
            <v-list-item-title
              class="blue--text text--darken-4"
              @click="drawer = !drawer"
              >CONTACT
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar fixed color="white">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span class="font-weight-bold">YUMA</span>
          <span class="font-weight-right"> ISHII</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-btn text color="blue darken-4" to="/#about">ABOUT ME</v-btn>
          <v-btn text color="blue darken-4" to="/#works">WORKS</v-btn>
          <v-btn text color="blue darken-4" to="/#contact">CONTACT</v-btn>
        </div>
      </v-app-bar>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
}
</script>
