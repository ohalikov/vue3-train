<template>
  <div class="post">
    <div>{{ post.id }}</div>
    <div><strong>Название поста:</strong> {{ post.title }}</div>
    <div><strong>Описание поста:</strong> {{ post.body }}</div>

    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="removeElement">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeElement() {
      this.$emit('remove', this.post);
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>
