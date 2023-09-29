<template>
  <!-- Тут мы подписываемся на событие create из дочернего компонента 
        где от туда мы передаем post
      -->

  <div>
    <h1>
      {{
        $store.state.isAuth
          ? 'Пользователь Авторизован'
          : 'Пользователь не авторизован'
      }}
    </h1>
    <h1>{{ $store.state.likes }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Like</my-button>
      <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>
    <h1>Страница с постами!!</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button style="" @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
      <!-- <div>Selected: {{ selectedSort }}</div> -->
    </div>

    <my-dialog v-model:openDialog="dialogVisible" @click.stop>
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="searchBySortedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идёт загрузка ...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
              'https://jsonplaceholder.typicode.com/posts?',
              {
                params: {
                  _page: this.page,
                  _limit: this.limit,
                },
              }
            );
            this.totalPages = Math.ceil(
              response.headers['x-total-count'] / this.limit
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
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert('error', error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    searchBySortedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title?.toLowerCase().includes(this.searchQuery?.toLowerCase())
      );
    },
  },
};
</script>

<style>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>
