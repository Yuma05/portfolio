<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        link
        hover
        max-width="400px"
        class="mx-auto ma-5"
        @click="dialog = true"
      >
        <v-img :src="thumbnail" height="200px">
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
          <p class="text-h6 text-sm-h5 font-weight-regular text--primary ma-0">
            {{ title }}
          </p>
          <div class="blue--text text--darken-4">
            {{ subtitle }}
          </div>
          <v-container fluid class="pa-0 mt-2">
            <v-row no-gutters>
              <v-col v-for="tag in tags" :key="tag" cols="auto" class="mr-1">
                <v-btn
                  depressed
                  x-small
                  color="blue"
                  class="white--text"
                  style="text-transform: none;"
                >
                  {{ tag }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-hover>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-container
        class="py-0"
        fluid
        style="background: white; position: relative;"
      >
        <v-btn
          absolute
          top
          right
          fab
          dark
          x-small
          color="primary"
          class="mt-8"
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row justify="center">
          <v-col cols="12">
            <v-col
              cols="12"
              class="text-center grey--text text--darken-4 headline pb-0"
              >{{ title }}
            </v-col>
            <v-row justify="center" no-gutters>
              <v-col cols="12" style="max-width: 20px;" class="primary">
                <v-divider style="border-width: 3px 0 0 0;"></v-divider>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            class="grey--text text--darken-3 text-center text-subtitle-2 text-sm-subtitle-1 font-weight-regular"
            ><span v-html="makeReturnPoint(discription)" />
          </v-col>
          <v-col v-if="links.length !== 0" cols="12" class="text-center pt-0">
            <v-btn
              v-for="link in links"
              :key="link"
              color="primary"
              outlined
              class="py-2 mr-2"
              style="text-transform: none;"
              :href="link.url"
              target="_blank"
            >
              {{ link.title }}
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0 text-center">
            <v-btn
              v-for="tag in tags"
              :key="tag"
              depressed
              x-small
              color="blue"
              class="white--text mr-1"
              style="text-transform: none;"
            >
              {{ tag }}
            </v-btn>
          </v-col>
          <v-col cols="12">
            <slide-img :imgs="imgs"></slide-img>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import SlideImg from '@/components/SlideImg'

export default {
  components: { SlideImg },
  props: {
    thumbnail: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    discription: {
      type: String,
      require: true,
    },
    links: {
      type: Array,
      require: true,
    },
    imgs: {
      type: Array,
      require: true,
    },
    tags: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
::v-deep .return-point {
  display: inline-block;
}
</style>
