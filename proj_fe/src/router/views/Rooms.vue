<template>
  <div class="container">
    <h2>Room list:</h2>
    <div class="row">
      <div class="col" v-for="room in rooms" :key="room.id_rooms">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{room.title}}</h5>
        <p class="card-text">{{new Date(room.created).toLocaleDateString()}}</p>
        <template v-if="room.id_users_owner === user.id">
          <p class="card-text">Admin</p>
        </template>
        <template v-else>
          <p class="card-text">User</p>
        </template>
        <div v-if="room.lock === 'true' && room.id_users_owner !== user.id">
        <router-link :to="{name: 'room', params: {id: room.id_rooms}}" class="btn btn-outline-secondary"  tag="button" :disabled="true">Enter</router-link>
        </div>
        <div v-else>
          <router-link :to="{name: 'room', params: {id: room.id_rooms}}" class="btn btn-outline-secondary"  tag="button" :disabled="false">Enter</router-link>
        </div>
      </div>
    </div>
  </div>
  </div>
    <form @submit.prevent="createRoom">
      <input type="text" class="form-control" v-model="title" placeholder="Room name" value=""/>
      <button class="btn btn-outline-secondary" type="submit">
        Create Room
      </button>
    </form>
  </div>
</template>

<script>

export default {
  name: "Rooms",
  id: "",
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  data(){
    return{
      rooms: [],
      title: "",
    }
  },
  methods:{
    async loadAllRooms(){
      try {
        const response = await this.$http.get("/rooms");
        this.rooms = response.data;
        await this.tryRemove();
      }catch (e){
        console.log("Chyba",e);
      }
    },
    async createRoom(){
      try {
        const response = await this.$http.post("/rooms", {title: this.title});
        console.log(response);
        await this.loadAllRooms();
      }catch (e){
        console.log("Chyba",e);
      }
    },
    async tryRemove(){
      if(this.rooms.length > 0){
        for(let i=0;i<this.rooms.length;i++){
          if((new Date().getDate() - new Date(this.rooms[i].created).getDate()) !== 0){
            var x = await this.$http.get(`/message/${this.rooms[i].id_rooms}`);
            if(x.data.length > 0) {
              if ((new Date().getDate() - new Date(x.data[x.data.length - 1].created).getDate()) !== 0) {
                //odstranit mistnost
                console.log("Mistnost " + x.data[x.data.length - 1].id_rooms + " by mela byt odstanena");
              }
            }
          }
        }
      }
    }
  },
  mounted(){
    this.loadAllRooms();
  }
}
</script>

<style scoped>
.tlc{
  text-align: right;
}
.col{
  margin-top: 2%;
}
.container input{
  width: 20%;
  margin-left: 40%;
  margin-bottom: 1%;
  margin-top: 3%;
}
</style>