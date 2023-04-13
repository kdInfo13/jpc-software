<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col-10 col-md-8 col-lg-6 border mt-4 p-4">
        <h4>JPC Login</h4>
        <form>
            <div class="form-group">
              <base-input type="email"
                label="Email"
                placeholder="Enter Email Address"
                v-model="form.email"
                :class="{ 'is-invalid': isSubmitted }" 
                >
                </base-input>
                <div v-if="isSubmitted && $v.form.email.$error" class="invalid-feedback">
                  <span v-if="!$v.form.email.required">Email field is required.</span>
                  <span v-if="!$v.form.email.email">Please provide valid email</span>
              </div>
            </div>
              <div class="form-group">
                <base-input type="password"
                label="Password"
                v-model="form.password"
                :class="{ 'is-invalid': isSubmitted && $v.form.password.$error }" 
                placeholder="Enter Your Password">
              </base-input>
              <div v-if="isSubmitted && $v.form.password.$error" class="invalid-feedback">
                  <span v-if="!$v.form.password.required">Password field is required.</span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-success btn-fill" @click.prevent="loginAction">Login</button>
            </div>
        </form>
        <ajax-loader v-if="loading"></ajax-loader>
      </div>
    </div>
  </div>

</template>
<script>
import Tes from './Tes.vue'
import axios from "axios";
import AjaxLoader from '../AjaxLoader.vue';
  import {
        required,
        email,
    } from "vuelidate/lib/validators";
import BaseInput from './Inputs/BaseInput.vue'
  export default {
    components: { BaseInput, AjaxLoader,Tes },
    name: 'login',
    data () {
      return{
        menu_config: [
        {
          title: "Home",
        },
        {
          title: "Services",
          subItems: ["Cooking", "Cleaning"]
        },
        {
          title: "Contact",
          subItems: ["Email", "Address"]
        }
        ],
        form: {
          password: '',
          email: ''
        },
        isSubmitted: false,
        loading: false

      }
    },
    validations: {
      form: {
        email:{required, email},
        password: {required}
      }
    },
    methods: {
      loginAction() {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'login', this.form, {
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then(response => {
              this.loading=false;
              this.isSubmitted=false;
              if(response.status == 200 && response.data.token){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                axios.defaults.headers.common['Authorization'] = response.data.token
                this.$router.push({name: 'dashboard'});
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
              this.$notifications.notify(
              {
                message: `<span>Something went wrong.</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
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
