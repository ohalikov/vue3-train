<template>
  <!-- Тут мы подписываемся на событие create из дочернего компонента 
    где от туда мы передаем post
  -->

  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button style="" @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
      <!-- <div>Selected: {{ selectedSort }}</div> -->
    </div>

    <my-dialog v-model:openDialog="dialogVisible" @click.stop>
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="searchPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идёт загрузка ...</div>
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
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'по названию' },
        { value: 'body', name: 'по описанию' },
      ],
      searchQuery: '',
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
        this.isPostLoading = true;
        setTimeout(
          async () => {
            const response = await axios.get(
              'https://jsonplaceholder.typicode.com/posts?_limit=10'
            );
            this.posts = response.data;
            this.isPostLoading = false;
          },

          2000
        );
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    searchPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.includes(this.searchQuery)
      );
    },
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
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
