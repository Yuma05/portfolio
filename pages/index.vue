<template>
  <v-container fluid>
    <v-container>
      <div class="mt-10"></div>
      <custom-title
        id="about"
        title="about me"
        class="mt-n16 pt-16"
      ></custom-title>
      <v-card elevation="5" max-width="700px" class="mx-auto ma-5">
        <v-card-text class="text-center grey--text text--darken-4">
          <span v-html="makeReturnPoint(about.comment)" />
        </v-card-text>
      </v-card>
      <skill-visual></skill-visual>
      <custom-title
        id="works"
        title="works"
        class="mt-n16 pt-16"
      ></custom-title>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <work-card
            v-for="content in works"
            :key="content"
            :thumbnail="content.thumbnail.url"
            :title="content.title"
            :subtitle="content.subtitle"
            :discription="content.discription"
            :links="content.links"
            :imgs="content.imgs.map((obj) => obj.img.url)"
            :tags="content.tag.split(' ')"
          ></work-card>
        </v-col>
      </v-row>
      <custom-title id="contact" title="contact"></custom-title>
      <v-form ref="form" v-model="valid">
        <v-row justify="center">
          <v-col
            cols="12"
            class="text-center text-subtitle-2 text-sm-subtitle-1 font-weight-regular"
          >
            最後までご覧いただきありがとうございます。
            <span class="return-point">
              ご興味がございましたら下記フォームから
            </span>
            <span class="return-point">
              お問い合わせください。
            </span>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="お名前"
              :rules="[validation.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="メールアドレス"
              :rules="[validation.required, validation.email]"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.message"
              label="お問い合わせ内容"
              :rules="[validation.required]"
            />
          </v-col>
          <v-text-field
            v-model="form.botfield"
            label="人間は入力しないでください"
            v-show="false"
          />
          <v-btn
            :disabled="!valid"
            color="primary"
            outlined
            class="py-5"
            @click="confirm = true"
          >
            送信
            <v-icon small class="ml-2">mdi-send</v-icon>
          </v-btn>
        </v-row>
        <v-dialog v-model="confirm" max-width="500px">
          <v-container
            class="py-0"
            fluid
            style="background: white; position: relative;"
          >
            <v-row justify="center" class="py-5">
              <v-col
                cols="12"
                class="text-center pb-0 blue-grey--text text--darken-1"
                >お問い合わせ内容をご確認ください</v-col
              >
              <confirm-title title="お名前"></confirm-title>
              {{ form.name }}
              <confirm-title title="メールアドレス"></confirm-title>
              {{ form.email }}
              <confirm-title title="お問い合わせ内容"></confirm-title>
              {{ form.message }}
              <v-col cols="12" class="text-center mt-5">
                <v-btn
                  color="pink darken-1"
                  outlined
                  class="py-2 mr-2"
                  @click="confirm = false"
                >
                  修正
                </v-btn>
                <v-btn
                  color="primary"
                  outlined
                  class="py-2"
                  @click="submitForm"
                >
                  送信
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
        <v-snackbar top color="blue lighten-5" v-model="snackbarSuccess">
          <div class="text-center blue--text text--darken-4">
            お問い合わせありがとうございました
          </div>
        </v-snackbar>
        <v-snackbar top color="pink lighten-5" v-model="snackbarError">
          <div class="text-center pink--text text--darken-4">
            Error 時間をおいて再送信してください
          </div>
        </v-snackbar>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
import customTitle from '@/components/customTitle'
import skillVisual from '@/components/skillVisual'
import workCard from '~/components/workCard'
import ConfirmTitle from '@/components/confirmTitle'

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
  components: { ConfirmTitle, customTitle, skillVisual, workCard },
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
      valid: false,
      confirm: false,
      snackbarSuccess: false,
      snackbarError: false,
      form: {
        name: '',
        email: '',
        message: '',
        botfield: '',
      },
      validation: {
        required: (v) => !!v || '必須項目です',
        email: (v) =>
          /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'メールアドレスの形式で入力してください',
      },
    }
  },
  methods: {
    async submitForm() {
      const params = this.setParams()
      const res = await axios.post('/', params).catch(() => {
        this.snackbarError = true
      })
      if (res.status === 200) {
        this.snackbarSuccess = true
      }
      this.confirm = false
    },
    setParams() {
      const params = new URLSearchParams()
      params.append('form-name', 'contact')
      params.append('name', this.form.name)
      params.append('email', this.form.email)
      params.append('message', this.form.message)
      if (this.form.botfield) {
        params.append('bot-field', this.form.botfield)
      }
      return params
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .return-point {
  display: inline-block;
}
</style>
