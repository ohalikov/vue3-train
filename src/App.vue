<template>
  <!-- Тут мы подписываемся на событие create из дочернего компонента 
    где от туда мы передаем post
  -->

  <div class="app">
    <h1>Страница с постами</h1>
    <my-button style="margin: 15px 0" @click="showDialog"
      >Создать пост</my-button
    >

    <my-dialog v-model:show="dialogVisible" @click.stop>
      <post-form @create="createPost" />
    </my-dialog>

    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import axios from 'axios';
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      title: '',
      body: '',
      dialogVisible: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.title = '';
      this.body = '';
      this.dialogVisible = false;
    },
    removePost(removingPost) {
      this.posts = this.posts.filter(
        (currentPost) => currentPost.id !== removingPost.id
      );
    },
    showDialog() {
      this.dialogVisible = true;
    },

    async fetchPosts() {
      try {
        setTimeout(
          async () => {
            const response = await axios.get(
              'https://jsonplaceholder.typicode.com/posts?_limit=10'
            );
            this.posts = response.data;
          },

          2000
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  padding: 20px;
}
</style>
