<template>
  <v-container fluid>
    <!--    <v-row no-gutters justify="center">-->
    <!--      <v-col>-->
    <!--        <v-img-->
    <!--          :src="require('@/assets/001.jpg')"-->
    <!--          min-height="250"-->
    <!--          max-height="800"-->
    <!--        >-->
    <!--          <v-container fluid fill-height class="pa-0">-->
    <!--            <v-row align-content="center" justify="center">-->
    <!--              <v-col class="text-center white&#45;&#45;text" cols="12">-->
    <!--                <div class="text-h4 text-md-h2">About this site</div>-->
    <!--                <div class="subheading">Build your application today!</div>-->
    <!--              </v-col>-->
    <!--            </v-row>-->
    <!--          </v-container>-->
    <!--        </v-img>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
    <v-container>
      <custom-title id="about" title="about me"></custom-title>
      <v-card elevation="5" max-width="700px" class="mx-auto ma-5">
        <v-card-text>
          {{ about.comment }}
        </v-card-text>
      </v-card>
      <skill-visual></skill-visual>
      <custom-title id="production" title="works"></custom-title>
      <!--      <v-row justify="center">-->
      <!--        <v-col v-for="(post, i) in production" :key="i" md="4">-->
      <!--          <production-card-->
      <!--            :description="post.fields.description"-->
      <!--            :title="post.fields.title"-->
      <!--            :src="post.fields.img.fields.file.url"-->
      <!--            :tag="post.fields.tag"-->
      <!--          ></production-card>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
      <v-row justify="center">
        <work-card
          v-for="content in works"
          :key="content"
          :thumbnail="content.thumbnail.url"
          :title="content.title"
          :subtitle="content.subtitle"
          :discription="content.discription"
          :imgs="content.imgs.map((obj) => obj.img.url)"
          :tags="content.tag.split(' ')"
        ></work-card>
      </v-row>
      <custom-title id="contact" title="contact"></custom-title>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          最後までご覧いただきありがとうございます。
          <span style="display: inline-block;">
            ご興味がございましたら下記フォームからお問い合わせください。
          </span>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" label="お名前" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.email" label="メールアドレス" required />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.message"
            label="お問い合わせ内容"
            required
          />
        </v-col>
        <v-text-field
          v-model="form.botfield"
          label="人間は入力しないでください"
          v-show="false"
        />
        <v-btn color="primary" outlined class="py-5" @click="submit">
          送信
          <v-icon small class="ml-2">mdi-send</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
import customTitle from '@/components/customTitle'
import skillVisual from '@/components/skillVisual'
import workCard from '~/components/workCard'

const myRequest = axios.create({
  headers: { 'X-API-KEY': process.env.API_KEY },
})

function getData() {
  return Promise.all([
    myRequest.get(process.env.API_URL + '/about'),
    myRequest.get(process.env.API_URL + '/works'),
  ]).then(([about, works]) => {
    const data = {}
    data.about = about.data
    data.works = works.data.contents
    return Promise.resolve(data)
  })
}

export default {
  components: { customTitle, skillVisual, workCard },
  async asyncData() {
    const data = await getData()
    return {
      about: data.about,
      works: data.works,
    }
  },
  data() {
    return {
      sizeRange: [50, 80],
      dialog: false,
      form: {
        name: '',
        email: '',
        message: '',
        botfield: '',
      },
    }
  },
  methods: {
    async submit() {
      const params = new FormData()
      params.append('form-name', 'contact')
      params.append('name', this.form.name)
      params.append('email', this.form.email)
      params.append('message', this.form.message)
      params.append('bot-field', this.form.botfield)
      const response = await this.$axios.$post(window.location.origin, params)
      console.log(response)
    },
  },
}
</script>
