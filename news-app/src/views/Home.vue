<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <div id="homeTitle" class="display-1">
        <HeadlineScroll :contentObject="contentObject" />
      </div>
      <v-flex md12>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Filter news by keyword. Advanced: use quotes ('') for exact matches, and the + / - symbols for needed / excluded words."
          class="hidden-sm-and-down"
          v-model="filterQuery"
          @input="loadFilter"
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12
        sm12
        md12
        v-for="article in articles"
        :key="article.publishedAt"
      >
        <Article :article="article" :index="articles.indexOf(article)" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import axios from 'axios'
import Article from '../components/Article'
import HeadlineScroll from '../components/HeadlineScroll'

axios.defaults.baseURL = `${process.env.VUE_APP_SERVICE_URL}${process.env.VUE_APP_NODE_ENV}`
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

let currentIndex = 0
export default {
  components: {
    Article,
    HeadlineScroll
  },
  props: {
    title: String
  },
  data: () => ({
    articles: [],
    arrayOfArticleNames: [],
    filterQuery: '',
    contentType: 'top UK headlines',
    contentObject: {},
    displayingTitles: null
  }),
  created() {
    this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
  },
  watch: {
    articles: {
      immediate: true,
      handler() {
        if (this.displayingTitles) {
          clearInterval(this.displayingTitles)
        }
        if (this.articles) {
          this.arrayOfArticleNames = []
          currentIndex = 0
          this.articles.forEach((article, articleId) => {
            this.arrayOfArticleNames.push({
              title: article.title,
              index: articleId
            })
          })
          this.contentObject = this.arrayOfArticleNames[currentIndex]
          this.displayingTitles = setInterval(() => {
            currentIndex === this.arrayOfArticleNames.length
              ? (currentIndex = 0)
              : (currentIndex += 1)
            this.contentObject = this.arrayOfArticleNames[currentIndex]
          }, 7000)
        }
      }
    },
    title: function consoleThis() {
      if (this.title) {
        this.loadFilter(this.title)
      }
    }
  },
  methods: {
    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `search results for: ${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
    }, 500),
    loadArticles(type, params) {
      axios
        .post(`/articles?type=${type}`, params)
        .then(response => {
          response.data.articles.sort((a, b) =>
            a.publishedAt > b.publishedAt ? 1 : -1
          )
          this.articles = response.data.articles
        })
        .catch(error => console.log({ error }))
    }
  }
}
</script>

<style scoped>
#homeTitle {
  margin: auto;
  margin-bottom: 2.5vh;
}
</style>
