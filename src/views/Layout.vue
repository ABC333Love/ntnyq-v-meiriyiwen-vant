<template>
  <div class="layout flex-vertical">
    <van-nav-bar :title="title"
      left-text="返回"
      left-arrow
      @click-left="goBack">
    </van-nav-bar>
    <router-view class="app-main" />
  </div>
</template>

<script>
export default {
  name: 'Layout',

  data () {
    return {
      title: process.env.VUE_APP_NAME || '标题'
    }
  },

  methods: {
    goBack () {
      this.$router.push('/')
    }
  },

  created () {
    this.$bus.$on('change-title', title => {
      this.title = title
    })
  }
}
</script>

<style lang="scss">
.layout {
  flex: 1;

  .app-main {
    flex: 1 0;
    overflow-y: auto;
  }
}
</style>
