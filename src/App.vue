<template>
  <div class="app flex-vertical"
    id="app">
    <app-layout></app-layout>
  </div>
</template>

<script>
import Layout from './views/Layout'

export default {
  name: 'App',

  components: {
    'app-layout': Layout
  }
}
</script>

<style lang="scss">
.app {
  height: 100%;
  background-color: $white-color;
}
</style>
