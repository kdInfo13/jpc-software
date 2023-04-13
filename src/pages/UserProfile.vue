<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <card>
            <div class="text-left">Current Role : <span v-for="(index,i) in roles" :key="index"><strong v-if="i==currentUser.role_id">{{ index }}</strong></span></div>
            <div class="text-left">Current Permissions : <strong>Full</strong></div>

          </card>
        </div>
        <div class="col-md-8">
          <edit-profile-form>
          </edit-profile-form>
        </div>
        <div class="col-md-4">
          <user-password>
          </user-password>
          <user-card>
          </user-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import UserPassword from './UserProfile/UserPassword.vue'
  import axios from "axios";

  export default {
    components: {
      EditProfileForm,
      UserCard,
      UserPassword
    },
    data () {
      return{
        roles:'',
        currentUser:''
      }
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      this._getRole()
    },
    methods:{
      _getRole(){
        axios.get(process.env.VUE_APP_API_URL+'roles', {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
           this.roles = response.data.roles
          }
        }).catch(error => {
          console.log(error)
          this.$notifications.notify(
          {
            message: '<span>Somethign went wrong.</span>',
            icon: 'nc-icon nc-bell-55',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }).finally( () =>{

        })
      },
    }
  }

</script>
<style>

</style>
