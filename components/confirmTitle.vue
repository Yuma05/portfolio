<template>
  <v-col cols="12">
    <v-row no-gutters justify="center">
      <v-col cols="12" class="text-center">
        <div class="text-subtitle-1 text-sm-h6 font-weight-regular mb-1 mt-5">
          {{ title }}
        </div>
      </v-col>
      <v-col cols="12" style="max-width: 20px;" class="primary">
        <v-divider style="border-width: 3px 0 0 0;"></v-divider>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: ['title'],
}
</script>

<style scoped></style>
