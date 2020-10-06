<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper
      class="swiper gallery-top"
      :options="swiperOptionTop"
      ref="swiperTop"
    >
      <swiper-slide v-for="img in imgs" :key="img">
        <img :src="img" />
      </swiper-slide>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper
      class="swiper gallery-thumbs"
      :options="swiperOptionThumbs"
      ref="swiperThumbs"
    >
      <swiper-slide v-for="img in imgs" :key="img">
        <img :src="img" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'SlideImg',
  props: {
    imgs: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
}
</script>

<style lang="scss">
$mq-breakpoints: (
  'xs': 600px,
  'tab': 750px,
  'sm': 960px,
  'md': 1264px,
  'lg': 1904px,
);

@mixin mq($breakpoint: medium) {
  @media screen and (min-width: #{map-get($mq-breakpoints, $breakpoint)}) {
    @content;
  }
}

.thumb-example {
  height: 250px;
  background-color: white;
  @include mq(tab) {
    height: 350px;
  }
  @include mq(sm) {
    height: 500px;
  }
}

.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  &.gallery-top {
    height: 80%;
    width: 100%;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>
