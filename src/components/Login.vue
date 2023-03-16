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
      </div>
    </div>
  </div>
</template>
<script>
  import {
        required,
        email,
    } from "vuelidate/lib/validators";
import BaseInput from './Inputs/BaseInput.vue'
  export default {
    components: { BaseInput },
    name: 'login',
    data () {
      return{
        form: {
          password: '',
          email: ''
        },
        isSubmitted: false
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

        localStorage.setItem('LoggedUser', 'web_token')
        // self.$router.push('/admin/overview');
        this.$router.push({name: 'dashboard'});


      }
    }
  }
</script>
<style>
</style>
