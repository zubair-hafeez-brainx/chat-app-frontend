<template>
  <div class="container">
    <img alt="Vue logo" src="./../assets/logo.png">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">
            <div class="form-group row pt-2">
              <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
              <div class="col-md-6">
                <input id="name" type="text" class="form-control" name="name" v-model="user.name"
                       required autocomplete="name" autofocus>
              </div>
            </div>

            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>
              <div class="col-md-6">
                <input id="email" type="email" class="form-control" name="email" v-model="user.email"
                       required autocomplete="email">
              </div>
            </div>

            <div class="form-group row">
              <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
              <div class="col-md-6">
                <input id="password" type="password" class="form-control" v-model="user.password"
                       name="password" required autocomplete="new-password">
              </div>
            </div>

            <div class="form-group row">
              <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
              <div class="col-md-6">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required
                       v-model="user.confirm_password"
                       autocomplete="new-password">
              </div>
            </div>

            <div class="form-group row mb-0 py-1">
              <div class="col-md-6 offset-md-4">
                <button type="submit" class="submit-btn btn btn-primary" @click="register">
                  Register
                </button>
                <router-link
                    to="/login"
                    class="mr-3 submit-btn register-btn btn btn-primary">
                  Login
                </router-link>

              </div>
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
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    async register() {
      let res = await this.$store.dispatch('regsiterUser', this.user);
      if (res) {
        this.$router.push({path: '/login'});
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