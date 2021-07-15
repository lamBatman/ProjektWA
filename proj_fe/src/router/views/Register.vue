<template>
  <form @submit.prevent="doRegister">
  <div class="container register-form">
    <div class="form">
      <div class="note">
        <p>Register</p>
      </div>

      <div class="form-content">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="login" placeholder="Login" value=""/>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="email" placeholder="Email" value=""/>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="surname" placeholder="Surname" value=""/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input type="password" class="form-control" v-model="password" placeholder="Password" value=""/>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" placeholder="Name" value=""/>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="gender" placeholder="Gender" value=""/>
            </div>
          </div>
        </div>
        <button type="submit" class="btnSubmit">Submit</button>
      </div>
    </div>
  </div>
    </form>
</template>

<script>
export default {
name: "Register",
  data:() =>{
    return {
      login: "",
      password: "",
      email: "",
      name: "",
      surname: "",
      gender: ""
    };
  },
  methods: {
    async doRegister(){
      try {
        const response = await this.$http.post("/register", {login: this.login, password: this.password,email: this.email,name: this.name, surname: this.surname,gender: this.gender});
        console.log(response);
        await this.$router.push({name: "login"})
      }catch (e){
        console.log(e);
      }
    }
  }
}
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
  padding: 1%;
  width: 20%;
  cursor: pointer;
  background: #0062cc;
  color: #fff;
  margin-top: 2%;
}
</style>