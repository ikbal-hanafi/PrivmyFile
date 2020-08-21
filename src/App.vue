<template>
  <div id="app" class="d-flex">
    <b-container fluid>
      <router-view></router-view>
      <footer class="m-2 mt-5 text-center text-muted footer">
        &copy; 2020, All rights reversed, made with ❤ by Maoundis
      </footer>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
  * {
    font-family: 'Titillium Web', sans-serif;
  }
</style>