<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Full Name"
                    placeholder="Full Name"
                    v-model="user.name">
          </base-input>
          <div v-if="isSubmitted && $v.user.name.$error" class="invalid-feedback">
                    <span v-if="!$v.user.name.required">Name field is required.</span>
                  </div>
        </div>
        <div class="col-md-6">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
          <div v-if="isSubmitted && $v.user.email.$error" class="invalid-feedback">
                    <span v-if="!$v.user.email.required">Email field is required.</span>
                    <span v-if="!$v.user.email.email">Please provide valid email</span>

                  </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="tel"
                    label="Phone Number"
                    placeholder="Phone Number"
                    v-model="user.phone_no">
          </base-input>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
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
        required,
        email,
    } from "vuelidate/lib/validators";
  export default {
    components: {
      Card
    },
    data () {
      return {
        isSubmitted:false,
        currentUser:'',
        user: {
          name: '',
          phone_no: '',
          email: '',
        }
      }
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      this.user.name = this.currentUser.name
      this.user.email = this.currentUser.email
      this.user.phone_no = this.currentUser.phone_no
    },
    validations: {
      user: {
        name:{required},
        email:{required, email},
      }
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
              this.currentUser.phone_no = this.user.phone_no
              this.currentUser.name = this.user.name
              this.currentUser.email = this.user.email

              localStorage.setItem('user', JSON.stringify(this.currentUser))
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
