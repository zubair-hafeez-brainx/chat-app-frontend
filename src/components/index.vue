<template>
  <div>
    <!-- As a heading -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="token">
      <a class="navbar-brand" href="#">Chat App</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
        </form>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row min-vh-100 flex-column flex-md-row">
        <aside class="col-12 col-md-2 p-0 bg-light flex-shrink-1" v-if="token">
          <nav class="navbar navbar-expand navbar-light bg-light flex-md-column flex-row align-items-start py-2">
            <div class="collapse navbar-collapse ">
              <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between p-3">
                <li :class="active_el == 'home' ? 'nav-item active' : 'nav-item'" v-on:click="activate('home')">
                  <router-link to="/home" class="nav-link pl-0 text-nowrap"><i class="a fa-bullseye fa-fw"></i> <span
                      class="font-weight-bold">Home</span></router-link>
                </li>
                <li :class="active_el == 'chat' ? 'nav-item active' : 'nav-item'" v-on:click="activate('chat')">
                  <router-link class="nav-link pl-0 text-nowrap" to="/chat"><i class="a fa-bullseye fa-fw"></i> <span
                      class="font-weight-bold">Chat</span></router-link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <main class="col bg-faded py-3 flex-grow-1">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      active_el: 'home'
    }
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
  mounted() {
    var token = localStorage.getItem("jwt");
    if (token) {
      this.$store.state.token = token;
      this.$router.push({path: '/home'});
    } else {
      this.$router.push({path: '/login'});
    }
  },
  methods: {
    activate(el) {
      this.active_el = el;
    }
  }
}
</script>