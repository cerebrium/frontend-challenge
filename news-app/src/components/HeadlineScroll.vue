<template>
  <div>
    <a
      :href="articleIndex"
      v-on:click="consoleMessage = articleTitle.index"
      class="scrollStyle"
      id="topOfPage"
    >
      {{ articleTitle ? articleTitle.title : 'null'}}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    contentObject: Object
  },

  watch: {
    contentObject: {
      immediate: true,
      handler() {
        if (this.contentObject) {
          this.articleTitle = this.contentObject
          this.articleIndex = `#${this.contentObject.index}`
        }
      }
    },
    consoleMessage: function logger() {
      console.log(this.consoleMessage)
    }
  },

  data: () => ({
    articleTitle: String,
    articleIndex: String,
    consoleMessage: String
  })
}
</script>

<style scoped>
@keyframes slideInTitle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.scrollStyle {
  animation: slideInTitle 2s linear;
  display: block;
  position: relative;
  max-width: 80vw;
  max-height: 10vh;
  border: none;
  background: linear-gradient(to right, #cfcfcf 50%, #fafafa 50%);
  background-size: 200% 100%;
  background-position: right;
  color: black;
  font-weight: 400;
  font-size: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  transition: all 0.4s ease-in-out;
  margin-right: 1rem auto;
  border-radius: 0.5rem;
}
.scrollStyle:hover {
  background-position: left bottom;
}

#topOfPage{
  text-decoration: none;
}
</style>
