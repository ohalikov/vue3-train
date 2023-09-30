<template>
  <div>
    <h1>Страница с постами dsfdasf</h1>

    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Идёт загрузка ...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import { ref } from 'vue';
import { usePosts } from '@/hooks/usePosts';
import { useSortedPosts } from '@/hooks/useSortedPosts';
import { useSortedAndSearchedPosts } from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'по названию' },
        { value: 'body', name: 'по описанию' },
      ],
    };
  },
  methods: {},
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    };
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
