<template>
  <div class="container">
  <h3 class=" text-center">Messages</h3>
  <div class="messaging">
    <div class="inbox_msg">
      <div class="mesgs">
        <div class="msg_history">
          <div class="incoming_msg">
            <div class="col" v-for="msg in msgs" :key="msg.id_messages">
              <div class="received_msg">
                <div class="received_withd_msg">
                  <div>
                  <router-link :to="{name: 'profile', params: {id: msg.id_users}}" class="tg">{{msg.login}}</router-link>
                  </div>
                  <p>{{msg.message}}</p>
                  <span class="time_date"> {{new Date(msg.created).toLocaleDateString()}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <form @submit.prevent="sendMessage">
      <div class="frm">
      <h3>Send message</h3>
      <h4>To user:</h4>
          <input type="text" class="form-control" v-model="login" placeholder="Login" value=""/>
        <div class="frm2">
        <h4>Message:</h4>
        <input type="text" class="form-control" v-model="message" placeholder="Message" value=""/>
        </div>

      <button type="submit" class="btn btn-outline-secondary">Send</button>
      </div>
    </form>
    </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  data: () => {
    return {
      msgs: [],
      login: "",
      message: "",
    };
  },

  methods: {

    async fetchRoomDetail(roomId) {
      try {
        const response = await this.$http.get(`/myMessages/${roomId}`);
        this.msgs = response.data;

      } catch (e) {
        //neplatne id mistnosti
        console.log(e);
      }
    },
    async sendMessage(){
      try {
        console.log(this.login);
        const response = await this.$http.get(`/users/${this.login}`);
        if(response.data !== null){
        const response2 = await this.$http.post("/message", {id_rooms: "null", id_users_from: this.user.id, id_users_to: response.data.id_users, message: this.message});
          console.log(response2);
          }
        this.message="";
        this.login="";
      }catch (e){
        console.log(e);
      }
    },
    Update() {
      if(this.user.id !== null && this.user.id !== undefined && this.$route.params.id === undefined) {
        this.fetchRoomDetail(this.user.id);
      }
    },
    leaving(){
      console.log("odchazi");
    }

  },
  created() {
    window.addEventListener('beforeunload', this.leaving)
  },
  beforeMount() {
    this.fetchRoomDetail(this.user.id);


  },
  mounted(){
    setInterval(this.Update,2000);
  },
}
</script>

<style scoped>
.tg{
  margin-right: 100%;
  color: #747474;
}
.frm h4{
  float: left;
  margin-right: 1%;
  margin-left: 1%;
  margin-top: 2%;
}
.frm input{
  float: left;
  margin-top: 2%;
  width: 32%;
}
.frm button{
  margin-left: 5%;
  margin-top: 2%;
}
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}

.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
  text-align: center;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  font-size: 12px;
  text-align: left;
  float: left;
  display: block;
}
.time_date2 {
  color: #747474;
  display: block;
  font-size: 12px;
  text-align: right;
  margin-right: 1%;
}
.received_withd_msg { width: 100%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 100%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
.tlc{
  text-align: right;
}
.form-control{
  width: 20%;
}
</style>