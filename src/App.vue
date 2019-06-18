<template>
  <b-row id="app">
    <b-col></b-col>
    <b-col cols="6" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;"><router-view/></b-col>
    <b-col></b-col>
  </b-row>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
