<template>
  <v-app>
    <v-toolbar id="navBar" app>
      <v-btn to="/" class="topButton" v-on:click="title = 'HOME'" flat>
        <span>HOME</span>
      </v-btn>
      <v-btn to="/" class="topButton" v-on:click="title = 'NEWS'" flat>
        <span>News</span>
      </v-btn>
      <v-btn to="/" class="topButton" v-on:click="title = 'SPORTS'" flat>
        <span>Sports</span>
      </v-btn>
      <v-spacer>
        <span id="titleText">
          {{ title }}
        </span>
      </v-spacer>
      <v-btn href="#" class="topButton" flat>
        <span>Top</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view :title="title"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    title: 'HOME'
  })
}
</script>
<style>
#navBar {
  background-color: rgb(42, 43, 45);
}

html,
body {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgb(42, 43, 45);
  box-shadow: 0 0 1px rgb(42, 43, 45);
  -webkit-box-shadow: 0 0 1px rgb(42, 43, 45);
}

.topButton {
  display: block;
  position: relative;
  width: 7vw;
  height: 4vh;
  border: none;
  margin-right: 1vw;
  background: linear-gradient(to right, #e7e7e7 50%, lightgrey 50%);
  background-size: 200% 100%;
  background-position: right;
  color: black;
  font-weight: 400;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  transition: all 0.25s ease-in-out;
  margin-right: 1rem auto;
  border-radius: 0.5rem;
}

.topButton:hover {
  background-position: left bottom;
}

#titleText {
  margin-left: 22vw;
  color: lightgray;
  font-size: 2em;
}

#sideBar {
  background-color: rgb(42, 43, 45);
}
</style>
