<template>
  <card>
    <h4 slot="header" class="card-title">Update password</h4>
    <form>
      <div class="row">
        <div class="col-md-12">
          <base-input type="password"
                    label="Old password"
                    placeholder="Old password"
                    v-model="user.oldPassword">
          </base-input>
          <div v-if="isSubmitted && $v.user.oldPassword.$error" class="invalid-feedback">
                    <span v-if="!$v.user.oldPassword.required">Old password filed is required.</span>
                  </div>
        </div>

        <div class="col-md-12">
          <base-input type="password"
                    label="New password"
                    placeholder="New password"
                    v-model="user.newPassword">
          </base-input>
          <div v-if="isSubmitted && $v.user.newPassword.$error" class="invalid-feedback">
                    <span v-if="!$v.user.newPassword.required">New password filed is required.</span>
                  </div>
        </div>

      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Password
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import axios from "axios";
  import {
        required
    } from "vuelidate/lib/validators";
  export default {
    components: {
      Card
    },
    data () {
      return {
        isSubmitted:false,
        user: {
          name:'',
          email:'',
          phone_no:'',
          oldPassword: '',
          newPassword: '',
        }
      }
    },validations: {
      user: {
        oldPassword:{required},
        newPassword:{required},
      }
    },
    mounted(){
      const currentUser = JSON.parse(localStorage.getItem('user'));
      this.user.name = currentUser.name
      this.user.email = currentUser.email
      this.user.phone_no = currentUser.phone_no
    },
    methods: {
      updateProfile () {
        this.isSubmitted = true;
        this.adminerror=false;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
      this.loading=true;
      axios.post(process.env.VUE_APP_API_URL+'profile-update', this.user, {
          headers: {
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
          })
          .then(response => {
            this.loading=false;
            this.isSubmitted=false;
            if(response.data){         
              this.$notifications.notify(
              {
                message: '<span>User updated successfully</span>',
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
              })
            }else{
              this.$notifications.notify(
              {
                message: '<span>'+response.data.error_message+'</span>',
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            }
         
          })
          .catch(error => {
            console.log(error)
            if(error.response.status == 422){
              this.$notifications.notify(
              {
                message: `<span>`+error.response.data.message+`</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            }else{
              this.$notifications.notify(
              {
                message: `<span>Something went wrong.</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            }
              this.isSubmitted=false;
              this.loading=false;
          }).finally( () => {
              this.isSubmitted = false
              this.loading=false;
          })
      }
    }
  }

</script>
<style>

</style>
