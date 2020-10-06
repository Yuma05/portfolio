<template>
  <v-hover v-slot:default="{ hover }">
    <v-card link hover max-width="400px" class="mx-auto ma-5">
      <v-img :src="src" height="200px">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out white v-card--reveal display-3"
            style="height: 100%;"
          >
            MORE
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text>
        <div>{{ client }}</div>
        <p class="text-h5 text-sm-h5 text--primary ma-0">
          {{ title }}
        </p>
        <div class="blue--text text--darken-4">
          {{ description }}
        </div>
        <v-container fluid class="pa-0 mt-2">
          <v-row no-gutters>
            <v-col cols="auto" class="mr-1" v-for="(tag_, i) in tag" :key="i">
              <v-btn depressed x-small color="blue" class="white--text"
                >{{ tag_.fields.name }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['title', 'description', 'src', 'tag', 'client'],
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
