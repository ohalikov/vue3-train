import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
    title: '',
    body: '',
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    searchBySortedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title?.toLowerCase().includes(state.searchQuery?.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true);
        setTimeout(
          async () => {
            const response = await axios.get(
              'https://jsonplaceholder.typicode.com/posts?',
              {
                params: {
                  _page: state.page,
                  _limit: state.limit,
                },
              }
            );
            commit(
              'setTotalPages',
              Math.ceil(response.headers['x-total-count'] / state.limit)
            );
            commit('setPosts', response.data);
            commit('setLoading', false);
          },

          2000
        );
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.log(error);
        alert('error', error);
      }
    },
  },
  namespaced: true,
};
