<template>
  <div>
    <a
      :href="articleIndex"
      v-on:click="consoleMessage = articleTitle.index"
      :class="contentClassName"
      id="topOfPage"
    >
      {{ articleTitle ? articleTitle.title : 'null' }}
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
          this.contentClassName = 'none'
          this.articleTitle = this.contentObject
          this.articleIndex = `#${this.contentObject.index}`
          this.contentClassName = 'scrollStyle'
        }
      }
    },
    contentClassName: function logger() {
      console.log(this.contentClassName)
    }
  },

  data: () => ({
    articleTitle: Object,
    articleIndex: '',
    consoleMessage: '',
    contentClassName: ''
  })
}
</script>

<style scoped>
/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.scrollStyle {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 3.5s steps(40, end);
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
  padding: 7px;
  transition: all 0.4s ease-in-out;
  border-radius: 0.5rem;
}
.scrollStyle:hover {
  background-position: left bottom;
}

#topOfPage {
  text-decoration: none;
}
</style>
