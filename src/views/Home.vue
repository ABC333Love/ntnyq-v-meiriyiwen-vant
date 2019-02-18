<template>
  <div class="home flex-center">
    <van-button @click="$router.push({ name: 'Detail', query: { date: currentDate } })"
      type="primary">{{currentDate}}</van-button>
  </div>
</template>

<script>
import { formatTime } from '@/utils'
export default {
  name: 'Home',

  data () {
    const currentDate = formatTime(Date.now(), 'yyyyMMdd')
    return {
      currentDate
    }
  }
}
</script>
