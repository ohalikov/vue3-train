<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <div>
      <my-input v-model="post.title" placeholder="Название" />
      <my-input v-model="post.body" placeholder="Описание" />
    </div>
    <my-button class="create-post-button" @click="createPost"
      >Создать</my-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post, 'fsdafsad', 'asffffffffffff'); // передаем в родительский компонент пост
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.create-post-button {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
