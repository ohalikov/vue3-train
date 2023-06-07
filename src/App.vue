<template>
  <button @click="addDislikes">dislike</button>
  <button @click="addLikes">like</button>
  <div>
    Количество лайков: <strong>{{ likes }}</strong>
  </div>
  <div>
    Количество дизлайков: <strong>{{ dislikes }}</strong>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
    };
  },
  methods: {
    addLikes() {
      this.likes += 1;
    },
    addDislikes() {
      this.dislikes += 1;
    },
  },
};
</script>

<style scoped></style>
