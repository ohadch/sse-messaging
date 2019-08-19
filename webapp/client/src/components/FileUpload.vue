<template>
  <div>
    <form enctype="multipart/form-data" @submit.prevent="onSubmit">
      <label for="file">Upload file</label><br />
      <input type="file" ref="file" @change="onSelect" /><br />
      <input type="submit" />
    </form>
    <h3 v-if="message">{{ message }}</h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FileUpload",
  data() {
      return {
          file: null,
          message: null,
      }
  },
  methods: {
      onSelect() {
          this.file = this.$refs.file.files[0];
      },
      async onSubmit() {
          const formData = new FormData();
          formData.append("file", this.file);

          try {
              await axios.post("/upload", formData);
              this.message = "Upload succeeded. :)"
          } catch (e) {
              this.message = "Upload failed. :("
          }
      }
  }
};
</script>

<style lang="scss" scoped>
</style>