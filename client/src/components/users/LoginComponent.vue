<template>
  <div class="container">
    <h3>Salesforce Login</h3>
    <form @submit.prevent="login">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Salesforce user name :</label>
            <input
              v-model="userData.sfdcName"
              class="form-control"
              type="text"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Salesforce Security Token :</label>
            <input
              v-model="userData.token"
              class="form-control"
              type="password"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Password :</label>
            <input
              v-model="userData.password"
              class="form-control"
              type="password"
            >
          </div>
        </div>
      </div>
      <br>
      <div class="form-group">
        <button
          class="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    login() {
      let uri = '/signIn';
      if (process.env.NODE_ENV != 'production') {
        uri = 'http://localhost:4000/signIn';
      }

      this.axios.post(uri, this.userData, {withCredentials: true})
        .then( (response) =>   {
          this.$store.commit('userName', this.userData.sfdcName);
          this.$store.commit('userId', response.data.substring(8));

          this.$router.push( {name : 'oppDates' });
        })
        .catch( () => {
          this.$store.commit('userName', 'Salesforce Login failed');
        });
    }
  }
};
</script>
