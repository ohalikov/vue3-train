<template>
  <div>
    <form class="form">
      <h4>Создание поста</h4>
      <input
        v-bind:value="title"
        @input="inputTitle"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
        v-bind:value="body"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="btn" @click="createPost">Создать</button>
    </form>
    <div class="post" v-for="post in posts">
      <div><strong>Название поста:</strong> {{ post.title }}</div>
      <div><strong>Описание поста:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: 'Javascript1', body: 'Описание ящыка' },
        { id: 2, title: 'Javascript2', body: 'Описание ящыка' },
        { id: 3, title: 'Javascript3', body: 'Описание ящыка' },
        { id: 4, title: 'Javascript4', body: 'Описание ящыка' },
        { id: 5, title: 'Javascript5', body: 'Описание ящыка' },
      ],
      title: '',
      body: '',
    };
  },
  methods: {
    createPost() {},
    inputTitle(event) {
      console.log(this);
      this.title = event.target.value;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.form {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
