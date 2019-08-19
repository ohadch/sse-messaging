<template>
  <div>
      <form @submit.prevent="createNewTask">
          <input type="text" placeholder="Enter text..." v-model="taskText" />
          <input type="submit" />
      </form>
  </div>
</template>

<script>
import createTask from "@/api/task/create"

export default {
  name: "TaskManager",
  data() {
      return {
          counter: 0,
          taskText: ''
      }
  },
  methods: {
      createNewTask() {
          createTask(this.counter ++, this.taskText)
          this.taskText = '';
      }
  }
};
</script>
