<template>
  <div class="row p-3">
    <div class="col-12 border-bottom pb-2"><h2 class="float-left">Messages</h2></div>
    <div class="col-4 border-right">
      <ul class="list-group list-group-flush mt-4 col">
        <li class="list-group-item bg-light">
          <div class="row mt-1">
            <div class="col-12">
              <input type="text" placeholder="Search..." name="lookup_type"
                     class="form-control my-2" v-model="search_text" v-on:keyup="searchUser">
              <ul class="list-group list-group-flush" v-if="isSearched">
                <li class="list-group-item pl-0 pb-1" v-for="user in searches.data" v-bind:key="'user1 '+user.id"
                    @click="selectUser(user)">
                  <div class="col-2">
                    <img class="rounded-circle float-left" width="30px" alt="Vue logo"
                         src="./../../assets/sample.jpeg">
                  </div>
                  <div class="col ml-1">
                    <p class="mt-0 pb-0 pt-1 float-left pl-2">{{ user.name }} (<small>{{ user.email }}</small>)
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li :class="'list-group-item '+ (activated_user.id === friend.id ? 'bg-light' : 'bg-white text-muted')"
            v-for="friend in friends" v-bind:key="'friend '+friend.id"
            @click="activeUser(friend)">
          <div class="row mt-1">
            <div class="col-2">
              <img class="rounded-circle float-left" width="60px" alt="Vue logo"
                   src="./../../assets/sample.jpeg">
            </div>
            <div class="col-4">
              <h5 class="mt-0 float-left"><strong>{{ friend.name }}</strong>
              </h5>
              <div class="float-left">
                {{ friend.email }}
              </div>
            </div>
          </div>
        </li>
        <li :class="'list-group-item '+ (activated_group.id === group.id ? 'bg-light' : 'bg-white text-muted')"
            v-for="group in groups" v-bind:key="'group '+group.id"
            @click="activeGroup(group)">
          <div class="row mt-1">
            <div class="col-2">
              <img class="rounded-circle float-left" width="60px" alt="Vue logo"
                   src="./../../assets/sample.jpeg">
            </div>
            <div class="col-4">
              <h5 class="mt-0 float-left"><strong>{{ group.name }}</strong>
              </h5>
              <div class="float-left">
                {{ group.members.length }} Members
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-8" v-if="is_activated">
      <ul class="list-group list-group-flush mt-3 col">
        <li class="list-group-item" v-if="activated_user">
          <div class="row">
            <div class="col-1">
              <img class="rounded-circle float-left" width="60px" alt="Vue logo"
                   src="./../../assets/sample.jpeg">
            </div>
            <div class="col-1">
              <h5 class="mt-0 float-left"><strong>{{ activated_user.name }}</strong>
              </h5>
              <div class="float-left">
                {{ activated_user.email }}
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item" v-if="activated_group">
          <div class="row">
            <div class="col-1">
              <img class="rounded-circle float-left" width="60px" alt="Vue logo"
                   src="./../../assets/sample.jpeg">
            </div>
            <div class="col-8">
              <h5 class="mt-0 float-left"><strong>{{ activated_group.name }}</strong>
              </h5>
              <div class="d-inline-flex" v-for="member in activated_group.members" v-bind:key="'member '+member.id">
                ({{ member.name }})
              </div>
            </div>
          </div>
        </li>
        <span class="mt-2"></span>
      </ul>
      <ul class="list-group list-group-flush mt-3 col overflow-auto" style="height: 670px">
        <li class="list-group-item">
          <div class="row">
            <div class="col-12" v-for="chat in chatMessages" v-bind:key="'id '+chat.id">
              <p v-if="chat.message"
                 :class="(current_user.id === chat.from ? 'float-right bg-secondary text-white p-2' : 'float-left bg-light p-2')">
                {{ chat.message }}</p>
              <br>
              <br>
              <br>
              <img v-if="chat.file" :src="chat.file" width="120px"
                   :class="(current_user.id === chat.from ? 'float-right bg-secondary text-white' : 'float-left bg-light')">
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-group col">
        <input type="text" placeholder="Type message..." name="message"
               class="form-control" v-model="message">
        <input type="file" id="file" name="file" style="display: none" ref="image">
        <label for="file">
          <b-icon-paperclip class="ml-n3 mt-2"></b-icon-paperclip>
        </label>
        <button v-if="activated_group !== ''" class="btn btn-dark my-2 ml-2 my-sm-0" type="submit"
                @click="sendMessage(activated_group.id,'group')">Send
        </button>
        <button v-else class="btn btn-dark my-2 ml-2 my-sm-0" type="submit"
                @click="sendMessage(activated_user.id,'user')">Send
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {BIconPaperclip} from 'bootstrap-vue';

export default {

  name: 'Register',
  components: {
    BIconPaperclip
  },
  data() {
    return {
      is_activated: false,
      activated_user: '',
      activated_group: '',
      current_user: '',
      message: '',
      file: '',
      search_text: '',
      isSearched: false,
    }
  },
  computed: {
    friends() {
      return this.$store.state.users.friends;
    },
    groups() {
      return this.$store.state.users.groups;
    },
    chatMessages() {
      return this.$store.state.users.userChat;
    },
    searches() {
      return this.$store.state.users.searchedUsers;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const {dispatch} = this.$store;
      await dispatch('retrieveCurrentUser');
      await dispatch('users/retrieveGroups');
      await dispatch('users/retrieveFriends');
    },
    activeUser(user) {
      this.current_user = this.$store.state.currentUser;
      this.activated_group = '';
      this.$store.state.activatedUser = user;
      this.activated_user = user;
      this.is_activated = true;
      this.fetchChat(user.id, 'user');
      window.Echo.channel('user_' + this.current_user.id)
          .listen('MessageCreated', (data) => {
            if (this.activated_user.id === data.data.user.id) {
              this.$store.state.users.userChat.push(data.data);
            }
          });
    },
    activeGroup(group) {
      this.current_user = this.$store.state.currentUser;
      this.$store.state.activatedUser = '';
      this.activated_user = '';
      this.activated_group = group;
      this.is_activated = true;
      this.fetchChat(group.id, 'group');
      window.Echo.channel('group_' + group.id)
          .listen('MessageCreated', (data) => {
            if (this.activated_group.id === data.data.messagable_id && this.current_user.id !== data.data.group.id) {
              this.$store.state.users.userChat.push(data.data);
            }
          });
    },
    async fetchChat(id, type) {
      if (type === 'group') {
        await this.$store.dispatch('users/groupChat', {'group_id': id});
      } else {
        await this.$store.dispatch('users/userChat', {'user_id': id});
      }
    },
    async sendMessage(id, type) {
      if (this.message !== '' || this.$refs.image) {
        var formData = new FormData;
        var url = '';

        if (type === 'group') {
          url = 'http://chat-app.test/api/message/group';
          formData.append('group_id', id);
        } else {
          url = 'http://chat-app.test/api/message';
          formData.append('to', id);
        }
        formData.append('message', this.message);
        formData.append('file', this.$refs.image.files[0]);
        let res = await this.$store.dispatch('users/sendMessage', [formData, url]);
        if (res) {
          this.message = '';
          this.file = '';
        }
      }
    },
    async searchUser() {
      let res = await this.$store.dispatch('users/searchUser', {'text': this.search_text});
      if (res) {
        this.isSearched = true;
      }
    },
    selectUser(user) {
      this.$store.state.users.friends.push(user);
      this.$store.state.activatedUser = user;
      this.$store.state.users.userChat = [];
      this.activated_user = user;
      this.is_activated = true;
      this.isSearched = false;
      this.search_text = '';
    }
  }
}
</script>