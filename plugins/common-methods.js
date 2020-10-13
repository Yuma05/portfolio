import Vue from 'vue'

Vue.mixin({
  methods: {
    makeReturnPoint(text) {
      let html = '<span class="return-point">' + text + '</span>'
      html = html.replace(/\n\n/g, '</span></br><span class="return-point">')
      return html.replace(/\n/g, '</span><span class="return-point">')
    },
  },
})
