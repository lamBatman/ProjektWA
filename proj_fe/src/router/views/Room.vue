<template>

  <div class="container" id="cnt">


    <form @submit.prevent="lock">
    <div class="tlc" v-if="room.id_users_owner === user.id">
      <div v-if="room.lock === 'false'">
      <button class="btn btn-outline-secondary" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill"
             viewBox="0 0 16 16">
          <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
        Lock
      </button>
    </div>
      <div v-else>
        <button class="btn btn-outline-secondary" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
          <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
        </svg>
          Unlock
        </button>
      </div>
    </div>
    </form>
      <form @submit.prevent="del">
        <div class="tlc" v-if="room.id_users_owner === user.id">
      <button class="btn btn-outline-secondary" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
        Delete
      </button>
        </div>
    </form>
    <form @submit.prevent="leave(user.id)">
    <div class="tlc">
    <button class="btn btn-outline-secondary" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>
      Leave
    </button>
    </div>
    </form>

    <h3 class=" text-center">Chat window</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <div class="msg_history">
            <div class="incoming_msg">
              <div class="col" v-for="msg in msgs" :key="msg.id_messages">
                <div class="m" v-if="msg.id_users_from !== user.id">
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
                <div v-else>
            <div class="outgoing_msg">
              <div class="sent_msg">
                <p>{{msg.message}}</p>
                <span class="time_date2"> {{new Date(msg.created).toLocaleDateString()}}</span> </div>
            </div>
                </div>
              </div>
        </div>
            <div id="chat-end"></div>
          </div>
          <form id="txt" @submit.prevent="addMessage">
            <div class="type_msg">
              <div class="input_msg_write">
                <input type="text" class="write_msg" v-model="message" placeholder="Type a message" />
                <button class="msg_send_btn" type="submit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </div>
            </div>
          </form>
          </div>
    </div>
  </div>
    <hr>
    <div v-if="user.id === room.id_users_owner">
    <div v-for="allUser in allUsers" :key="allUser.id_users">
      <div v-if="allUser.id_users !== room.id_users_owner">
        <div class="lev">
        {{allUser.id_users}}
        </div>
      {{allUser.login}}
      <form @submit.prevent="kick(allUser.id_users)">
        <div class="tlc">
          <button class="btn btn-outline-secondary" type="submit">
            Kick
          </button>
          <hr>
        </div>
      </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Room",
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  data:() =>{
    return {
      room: [],
      msgs: [],
      allUsers: [],
      message: "",
      first: true,
      time: null,
    };
  },

  methods: {

    async fetchRoomDetail(roomId) {
      try {
        const response = await this.$http.get(`/rooms/${roomId}`);
        this.room = response.data;
        const response2 = await this.$http.get(`/message/${roomId}`);
        this.msgs = response2.data;
        const response3 = await this.$http.get(`/inroomAll/${roomId}`);
        this.allUsers = response3.data;

      } catch (e) {
        //neplatne id mistnosti
        console.log(e);
        await this.$router.push({name: "notFound"});
      }
    },
    Update() {
      if(this.$route.params.id !== null && this.$route.params.id !== undefined) {
        this.fetchRoomDetail(this.$route.params.id);
        this.tryKick();
      }
  },
    async addMessage(){
      console.log({id_rooms: this.room.id_rooms, id_users_from: this.user.id, message: this.message});
      if(this.time) {
        clearTimeout(this.time);
        this.setTm();
      }
      try {
        const response = await this.$http.post("/message", {id_rooms: this.room.id_rooms, id_users_from: this.user.id, id_users_to: null, message: this.message});
        console.log(response);
        const response2 = await this.$http.get(`/inroom/${this.room.id_rooms}`,{ params: {id_users: this.user.id}});
        if(response2.data===null || response2.data===undefined || response2.data === ""){
        const response3 = await this.$http.post(`/inroom/${this.room.id_rooms}`, {id_users: this.user.id ,last_message: Date.now()});
        console.log(response3);
        }else{
          const response4 = await this.$http.put(`/inroom/${this.room.id_rooms}`, {id_users: this.user.id});
          console.log(response4);
        }
        console.log(response2);
        this.message="";
      }catch (e){
        console.log(e);
      }

    },
    setTm(){
      this.time = setTimeout(this.leave,10*60*1000);
    },
    lock(){
      this.$http.post(`/rooms/${this.$route.params.id}`);
    },
    async del(){
      const x = await this.$http.get(`/allInroom/${this.$route.params.id}`);
      if(x.data.c <= 1) {
        await this.$http.delete(`/rooms/${this.$route.params.id}`);
        await this.$router.push({name: "rooms"});
      }else{
        console.log("Moc uzivatelu");
      }
    },
    async leave(idk){
      await this.$http.delete(`/inroom/${this.$route.params.id}`,{params: {id_users: idk}});
      const x = await this.$http.get(`/allInroom/${this.$route.params.id}`);
      if(x.data.c > 0) {
        var d = Math.floor(Math.random() * this.allUsers.length);
        await this.$http.put(`/room/${this.$route.params.id}`,{id_users_owner: this.allUsers[d].id_users});
      }
      clearTimeout(this.time);
      await this.$router.push({name: "rooms"}).catch(() => {});
    },
    async kick(idk){
      const response = await this.$http.post(`/roomkick`, {id_rooms: this.$route.params.id, id_users: idk});
      await this.leave(idk);
      console.log(response);
    },
    async tryKick(){
      const response = await this.$http.get(`/roomkick`, {params: {id_rooms: this.$route.params.id, id_users: this.user.id}});
      if(response.data !== ""){
        if(new Date(response.data.created) < new Date() && (new Date(response.data.created).getHours() - new Date().getHours()) > 0){
          const response2 = await this.$http.delete(`/roomkick`, {params: {id_rooms: this.$route.params.id, id_users: this.user.id}});
          console.log(response2);
        }else{
          if(new Date(response.data.created) < new Date() && ((new Date(response.data.created).getMinutes() - new Date().getMinutes()) < -5)){
            const response3 = await this.$http.delete(`/roomkick`, {params: {id_rooms: this.$route.params.id, id_users: this.user.id}});
            console.log(response3);
          }else{
            await this.$router.push({name: "rooms"}).catch(() => {});
          }
          }
      }
    }
  },
  beforeMount() {
    this.setTm();
    this.fetchRoomDetail(this.$route.params.id);
    this.tryKick();
  },
  mounted(){
      setInterval(this.Update,1000);
    },
  updated() {
    if (this.first) {
      const elmnt = document.getElementById("chat-end");
      elmnt.scrollIntoView(true);
      this.first = false;
    }
  }


}
</script>

<style scoped>
.tg{
  margin-right: 100%;
  color: #747474;
}
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

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
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
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
.received_withd_msg { width: 57%;}
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
  margin-bottom: 1%;
}
.lev{
  text-align: left;
}
</style>