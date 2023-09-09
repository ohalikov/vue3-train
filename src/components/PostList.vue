<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>

    <transition-group name="list" tag="p">
      <post-item
        class="list-item"
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <div v-else>
    <h2 style="color: red">Список постов пуст</h2>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  /* align-content: center; */
  align-items: flex-start;
  /* margin-right: 10px; */
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(550px);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>
