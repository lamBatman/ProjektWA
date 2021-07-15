<template>
<form @submit.prevent="doLogin">

  <div class="container login-form">
    <div class="form">
      <div class="note">
        <p>Login</p>
      </div>

      <div class="form-content">
        <div class="row">
            <div class="form-group">
              <input type="text" class="form-control" v-model="login" placeholder="Login" value=""/>
          </div>
        </div>

            <div class="form-group">
              <input type="password" class="form-control" v-model="password" placeholder="Password" value=""/>
          </div>
        <button type="submit" class="btnSubmit">Login</button>
      </div>

  <div v-if="error" class="alert alert-danger">
    {{error}}
  </div>

    </div>
  </div>
</form>
</template>

<script>
export default {
name: "Login",
  data:() =>{
  return {
    login: "",
    password: "",
    error: "",
  };
},
  methods: {
  //async tady v nazvu je k novejsimu promisu, bez toho by to nefungovalo
    async doLogin(){
      this.error= null;
      // http request
      //starsi typ promisu
      /*
      this.$http.post("/login", {login: this.login, password: this.password})
      .then((data) => console.log(data))
      .catch(() => console.log("Neuspesny promise"))
      .finally(() => console.log("Finally"));
      */
      //novejsi
      console.log("zkouska");
      try {
        const response = await this.$http.post("/login", {login: this.login, password: this.password});
        console.log(response);
        const {token} = response.data;
        this.$tokenManager.setToken(token);
        this.$emit("userLogged", this.$tokenManager.getPayload());
        await this.$router.push({name: "rooms"});
      }catch (e){
        this.error = "Wrong credentials"
      }
    }
  },
};
</script>

<style scoped>
.note
{
  text-align: center;
  height: 80px;
  background: -webkit-linear-gradient(left, #0072ff, #8811c5);
  color: #fff;
  font-weight: bold;
  line-height: 80px;
}
.form-content
{
  padding: 5%;
  border: 2px solid #ced4da;
  margin-bottom: 2%;
}

.form-group
{
  margin-bottom: 2%;
}
.form-control{
  border-radius:1.5rem;
}
.btnSubmit
{
  border:none;
  border-radius:1.5rem;
  padding: 2%;
  width: 30%;
  cursor: pointer;
  background: #0062cc;
  color: #fff;
  margin-top: 2%;
}
.login-form
{
  width:500px;
}
</style>