<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
import Index from "./components";

export default {
  name: 'App',
  components: {Index},
  // computed: {
  //   currentUser() {
  //     return this.$store.state.currentUser;
  //   },
  //   activatedUser() {
  //     return this.$store.state.activatedUser;
  //   },
  // },
  // mounted() {
  //   window.Echo.channel('user_'+this.currentUser.id)
  //       .listen('MessageCreated', (data) => {
  //         if (this.activatedUser.id === data.data.from) {
  //           this.$store.state.users.userChat.push(data.data);
  //         }
  //       });
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
