<template>
  <div id="app">
    <TaskManager />
    <Feed />
  </div>
</template>

<script>
import Feed from './components/Feed.vue'
import TaskManager from './components/TaskManager.vue'

export default {
  name: 'app',
  components: {
    Feed,
    TaskManager
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
