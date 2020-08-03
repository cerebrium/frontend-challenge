<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <div class="topContentDiv">
        <div id="homeTitle" class="display-1">
          <HeadlineScroll :contentObject="contentObject" />
        </div>
        <v-flex md12 id="searchBar">
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Filter news by keyword. Advanced: use quotes ('') for exact matches, and the + / - symbols for needed / excluded words."
            class="hidden-sm-and-down"
            v-model="filterQuery"
            @input="allBackendRequests"
          ></v-text-field>
        </v-flex>
        <div class="searchByDateContainer">
          <h3>Search by Date</h3>
          <div class="datePickerContainer">
            <h3 class="textInDateSearch">From:</h3>
            <DatePicker v-model="fromDate" class="fromDatePicker" />
            <h3 class="textInDateSearch">To:</h3>
            <DatePicker class="toDatePicker" v-model="toDate" />
          </div>
        </div>
      </div>
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
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

axios.defaults.baseURL = `${process.env.VUE_APP_SERVICE_URL}${process.env.VUE_APP_NODE_ENV}`
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

let currentIndex = 0
export default {
  components: {
    Article,
    HeadlineScroll,
    DatePicker
  },
  props: {
    title: String
  },
  data: () => ({
    articles: [],
    fromDate: null,
    toDate: null,
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
    // this is the handler for watching when the articles come in, so that the titles can be displayed
    articles: {
      immediate: true,
      handler() {
      // the messages are displayed using an interval, but it is recreated on every instance of the view lifecycle, so have to clear it or it breaks
        if (this.displayingTitles) {
          clearInterval(this.displayingTitles)
        }
        // making the list of articles, with their id's to pass through to the component displaying them at the top ... title = content ... index = the id for onClick action
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
          // loop through all the article titles, set the title wanted as the top healdine 7 second loop... have to make sure this doesn't index out of range though
          this.displayingTitles = setInterval(() => {
            currentIndex === this.arrayOfArticleNames.length
              ? (currentIndex = 0)
              : (currentIndex += 1)
            this.contentObject = this.arrayOfArticleNames[currentIndex]
          }, 7000)
        }
      }
    },
    // want the articles to come inm with all the data if it is present. so if you put in sports, then some dates it grabs those dates sports titles
    fromDate: function submitRequest() {
      if (this.toDate && this.fromDate) {
        this.searchByDate(
          this.fromDate,
          this.toDate,
          this.filterQuery.length > 0 ? this.filterQuery : 'gb'
        )
      }
    },
    toDate: function submitRequest() {
      if (this.toDate && this.fromDate) {
        this.searchByDate(
          this.fromDate,
          this.toDate,
          this.filterQuery.length > 0 ? this.filterQuery : 'gb'
        )
      }
    },
    title: function searchButtons() {
      this.loadFilter(this.title)
    }
  },
  methods: {
    // awesome function!
    loadFilter: debounce(function loadFilter(input) {
      if (input) {
        this.contentType = `search results for: ${input}`
        this.loadArticles('search', JSON.stringify({ q: input }))
      } else {
        this.contentType = 'top UK headlines'
        this.loadArticles('headlines', JSON.stringify({ country: 'gb' }))
      }
    }, 500),
    // equally as awesome!
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
    },
    // function for searching by dates, with default as gb for input
    searchByDate: debounce(function searchByDate(startDate, endDate, input) {
      if (startDate && endDate) {
        // your function works well, so I stole it, but added dates to it 
        this.loadArticles(
          'search',
          JSON.stringify({ from: startDate, to: endDate, q: input })
        )
        this.startDate = null
        this.endDate = null
      }
    }, 500),
    // was an error happening that caused it to search for the wrong things, so I rerouted the search bar to make sure it didn't take any parameters that werent wanted
    allBackendRequests: function requests() {
      if (!this.startDate || !this.endDate) {
        this.loadFilter(this.filterQuery)
      } else {
        this.searchByDate(this.startDate, this.endDate, this.filterQuery)
      }
    }
  }
}
</script>

<style scoped>
#homeTitle {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9vh;
  padding: 0;
}

.searchByDateContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #cfcfcf;
  border: 2px solid #2a2b2d44;
  padding: 5px;
  width: 47vw;
  margin-bottom: 10px;
  box-shadow: 0 3px 8px #8a8383;
}

.textInDateSearch {
  margin-right: 1rem;
}

.datePickerContainer {
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.topContentDiv {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
}

.fromDatePicker {
  margin-right: 5vw;
}

#searchBar {
  width: 47.5vw;
}
</style>
