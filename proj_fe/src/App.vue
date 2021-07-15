<template>
  <div id="app">

    <navbar v-bind:user="user" @logout="onLogout" :logoutFunction="onLogout" :age="5"></navbar>

    <div class="container mt-5">
      <router-view :user="user" @userLogged="onUserLog"></router-view>
    </div>


  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => {
    return {
      user: {
        login: null
      }
    };
  },
  methods: {
    onUserLog(userData){
      this.user = userData;
    },
    onLogout(){
      console.log("Uzivatel se odhlasil");
      this.user = null;
      this.$tokenManager.logout();
      this.$router.push({name: "home"});
    },
  },
  mounted(){
    this.user = this.$tokenManager.getPayload();
  }
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
