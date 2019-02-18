<template>
  <div class="detail flex-vertical">
    <div ref="essay"
      class="essay">
      <h2 class="essay-title">{{essay.title}}</h2>
      <div class="essay-meta">
        <span v-if="essay.author">作者：{{essay.author}}</span>
        <span v-if="essay.wc">字数：{{essay.wc | numberFormat}}</span>
      </div>
      <div class="essay-summary">{{essay.digest}}...</div>
      <div class="essay-main">
        <div class="essay-rich"
          v-html="essay.content" />
      </div>
    </div>
    <div class="detail-footer clearfix">
      <van-button v-if="dates.prev"
        @click="$router.replace({ name: 'Detail', query: { date: dates.prev } })"
        class="fl"
        type="primary"
        plain>上一篇</van-button>
      <van-button v-if="dates.next && hasGoNext"
        @click="$router.replace({ name: 'Detail', query: { date: dates.next } })"
        class="fr"
        type="primary"
        plain>下一篇</van-button>
    </div>
  </div>
</template>

<script>
import {
  getEssayByDate,
  getRandomEssay
} from '@/api'
import {
  formatTime
} from '@/utils'

export default {
  name: 'Detail',

  computed: {
    hasGoNext () {
      const { currentDate, dates = {} } = this
      const { next } = dates
      return ~~next <= ~~currentDate
    }
  },

  data () {
    const currentDate = formatTime(Date.now(), 'yyyyMMdd')
    return {
      dates: {},
      essay: {},
      isLoading: true,
      currentDate,
      date: ''
    }
  },

  methods: {
    back2top () {
      this.$nextTick(() => {
        this.$refs['essay'].scrollTop = 0
      })
    },

    fetchData () {
      const { date } = this

      this.isLoading = true

      if (date === 'random') {
        getRandomEssay()
      } else {
        getEssayByDate({ date })
          .then(({ data = {} }) => {
            const { date, ...essay } = data

            this.isLoading = false
            this.dates = date
            this.essay = essay
            this.back2top()

            this.$bus.$emit('change-title', essay.title)
          })
      }
    }
  },

  watch: {
    $route: {
      handler ({ query }) {
        const { date } = query

        this.date = date
        this.fetchData()
      },

      immediate: true
    }
  },

  beforeDestroy () {
    this.$bus.$emit('change-title', process.env.VUE_APP_NAME)
  }
}
</script>

<style lang="scss">
.detail {
  position: relative;

  .essay {
    flex: 1 0;
    padding: 20px 30px;
    overflow-y: auto;

    &-title {
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 44px;
      /* text-align: center; */
    }

    &-meta {
      margin-bottom: 20px;
      text-align: right;
      font-size: 24px;
      color: #666;

      span + span {
        margin-left: 30px;
      }
    }

    &-summary {
      padding: 20px;
      margin-bottom: 15px;
      background-color: $common-bg-color;
      border-radius: 10px;
      line-height: 1.6;
    }

    &-rich {
      position: relative;

      * {
        max-width: 100%;
      }

      p {
        margin-bottom: 1em;
        line-height: 1.8;
        text-indent: 2em;
      }
    }
  }

  &-footer {
    padding: 10px 60px;
  }
}
</style>
