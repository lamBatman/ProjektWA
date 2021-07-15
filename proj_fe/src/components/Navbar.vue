<template>

  <div class="navbar navbar-dark bg-dark">

    <div class="container-fluid" >
    <router-link :to="{name: 'home'}" tag="h3">Chat APP</router-link>
      <router-link :to="{name: 'rooms'}" class="rm" tag="h5">Rooms</router-link>
      <router-link :to="{name: 'chat'}" class="cht" tag="h5">Chat</router-link>
    <div v-if="user != null">
      <router-link :to="{name: 'profile', params: {id: user.id}}" class="prf" tag="h5">Profile</router-link>
    <!--prvni zposob odhlaseni -->

    <button class="btn btn-outline-secondary" @click="doLogout">Logout</button>


    <!--druhej zposob odhlaseni
    <button @click="logoutFunction">Logout2</button>-->
    </div>
    <ul v-else class="navbar-nav">
      <li class="nav-item">
      <router-link :to="{name: 'login'}" class="nav-link" active-class="active">Login</router-link>
      </li>
      <li class="nav-item">
      <router-link :to="{name: 'register'}" class="nav-link"  active-class="active">Register</router-link>
      </li>
    </ul>
  </div>
  </div>

</template>

<script>
export default {
  props: {
    user: Object,
    logoutFunction: Function,
    age: {
      type: Number,
      required: true,
      default: 10,
    }
  },
  computed: {
    login() {
      if (this.user != null) {
        return this.user.login.toUpperCase();
      }
      return "";
    },
  },
    methods: {
      doLogout(){
        this.$emit("logout");
      }
    }

};
</script>

<style scoped>
.navbar{
  padding: 20px 40px;
  color: #fff;
  font-weight: 600;
  background: #318cea;
}
.rm{
  text-align: left;
}
.cht{
  text-align: left;
  margin-right: 80%;
}
.prf{
  text-align: left;
}
</style>