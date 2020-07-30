<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <li v-bind:id="index" v-on:click="consoleMessage = index">
        <v-card class="articleCard">
          <v-img
            v-if="article.urlToImage && article.urlToImage !== null"
            :src="article.urlToImage"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ article.name }}</h3>
              <div>
                <span class="grey--text"
                  >{{ article.source.name }} |
                  {{ article.author || 'author not listed' }} |
                  {{ new Date(article.publishedAt).toDateString() }}
                </span>
              </div>
              <div>{{ article.description }}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn flat :href="article.url" target="_blank">Read</v-btn>
          </v-card-actions>
        </v-card>
      </li>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    article: Object,
    index: Number || String
  },
  data: () => ({
    consoleMessage: ''
  }),
  watch: {
    consoleMessage: function logger() {
      console.log(this.consoleMessage)
    }
  }
}
</script>

<style scoped>
.articleCard {
  margin-top: 2.5vh;
}

li {
  list-style: none;
}
</style>
