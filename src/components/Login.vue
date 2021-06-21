<template>
  <div class="container">
    <img alt="Vue logo" src="./../assets/logo.png">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="form-group row py-3">
            <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>
            <div class="col-md-6">
              <input id="email" type="email" class="form-control" name="email" v-model="user.email"
                     required autocomplete="email">
            </div>
          </div>
          <div class="form-group row py-2">
            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
            <div class="col-md-6">
              <input id="password" type="password" class="form-control"
                     name="password" v-model="user.password" required autocomplete="new-password">
            </div>
          </div>
          <div class="form-group row mb-0 py-2">
            <div class="col-md-6 offset-md-4">
              <button type="submit" class="submit-btn btn btn-primary" @click="login">
                Login
              </button>
              <router-link
                  to="/register"
                  class="mr-3 submit-btn register-btn btn btn-primary">
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch('retrieveToken', this.user);
      console.log(res);
      if (res) {
        this.$router.push({path: '/index'});
      }
    },
  }
}
</script>
<style scoped>
.submit-btn {
  float: right;
}

.register-btn {
  margin-right: 10px;
}
</style>