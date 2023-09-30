<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Все посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px"
        >О сайте</my-button
      >
      <my-button @click="$router.push('/store')" style="margin-left: 20px"
        >Store</my-button
      >
      <my-button @click="$router.push('/composition')" style="margin-left: 20px"
        >Composition API</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  display: flex;
  box-shadow: 2px 2px 4px gray;
  padding: 0 15px;
  align-items: center;
}
.navbar__btns {
  margin-left: auto;
  display: flex;
  cursor: pointer;
}
</style>
