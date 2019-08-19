<template>
  <div id="app">
    <FileUpload />
    <TaskManager />
    <Feed />
  </div>
</template>

<script>
import Feed from './components/Feed'
import TaskManager from './components/TaskManager'
import FileUpload from './components/FileUpload'

export default {
  name: 'app',
  components: {
    Feed,
    TaskManager,
    FileUpload
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
