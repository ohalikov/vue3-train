<template>
  <!-- Тут мы подписываемся на событие create из дочернего компонента 
    где от туда мы передаем post
  -->
  <post-form @create="createPost" />
  <post-list :posts="posts" />
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Javascript1", body: "Описание ящыка" },
        { id: 2, title: "Javascript2", body: "Описание ящыка" },
        { id: 3, title: "Javascript3", body: "Описание ящыка" },
        { id: 4, title: "Javascript4", body: "Описание ящыка" },
        { id: 5, title: "Javascript5", body: "Описание ящыка" },
      ],
      title: "",
      body: "",
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.title = "";
      this.body = "";
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
</style>
