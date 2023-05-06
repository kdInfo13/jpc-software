<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card">
        <div class="col-md-12">
          <h5 class="d-flex justify-content-center p-2">Your E-mail address and Phone number are not verified. To access the JPC dashboard please verify your details.</h5>
          <form v-if="!currentUser.email_verified_at &&  !currentUser.phone_no_verified_at && !otpScreen">
            <div class="row">
              <div class="col-md-4">
                <base-input type="email"
                label="E-mail address"
                placeholder="E-mail address"
                v-model="email"
                readonly
                ></base-input>
                <div v-if="isSubmitted && $v.email.$error" class="invalid-feedback">
                  <span v-if="!$v.email.required">Email field is required.</span>
                  <span v-if="!$v.email.email">Please provide valid email</span>
                </div>
              </div>
              <div class="col-md-4">
                <base-input type="tel"
                label="Phone number"
                placeholder="Phone number"
                v-model="phone"
                readonly
                ></base-input>
                <div v-if="isSubmitted && $v.phone.$error" class="invalid-feedback">
                  <span v-if="!$v.phone.required">Phone field is required.</span>
                </div>
              </div>
              <div class="col-md-12">
                <button type="submit" class="btn btn-success mb-4" @click.prevent="emailVerified">Verify E-mail</button>
              </div>
            </div>
          </form>

          <form v-else-if="!currentUser.email_verified_at && !otpScreen">
            <div class="row">
              <div class="col-md-4">
                <base-input type="email"
                label="E-mail address"
                placeholder="E-mail address"
                v-model="email"
                readonly
                ></base-input>
                <div v-if="isSubmitted && $v.email.$error" class="invalid-feedback">
                  <span v-if="!$v.email.required">Email field is required.</span>
                  <span v-if="!$v.email.email">Please provide valid email</span>
                </div>
              </div>
            </div>
          </form>
          
          <form v-else-if="!currentUser.phone_no_verified_at && !otpScreen">
            <div class="row">
              <div class="col-md-4">
                <base-input type="tel"
                label="Phone number"
                placeholder="Phone number"
                v-model="phone"
                readonly
                ></base-input>
                <div v-if="isSubmitted && $v.phone.$error" class="invalid-feedback">
                  <span v-if="!$v.phone.required">Phone field is required.</span>
                </div>
              </div>
              <div class="col-md-12">
                <button type="submit" class="btn btn-success mb-4" @click.prevent="emailVerified">Verify Phone</button>
              </div>
            </div>
          </form>


          <form v-if="otpScreen">
            <div class="row">
              <div class="col-md-4" v-if="!currentUser.email_verified_at">
                <base-input type="text"
                label="E-mail OTP"
                placeholder="E-mail OTP"
                v-model="email_otp"
                ></base-input>
                <div v-if="isSubmitted && email_otperror" class="invalid-feedback">
                  <span>OTP field is required.</span>
                </div>
              </div>
              <div class="col-md-4" v-if="!currentUser.phone_no_verified_at">
                <base-input type="text"
                label="Phone OTP"
                placeholder="Phone OTP"
                v-model="phone_otp"
                ></base-input>
                <div v-if="isSubmitted && phone_otperror" class="invalid-feedback">
                  <span>OTP field is required.</span>
                </div>
              </div>
              <div class="col-md-12">
                <button type="submit" class="btn btn-success mb-4" @click.prevent="otpVerified">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import axios from "axios";
  import BaseInput from '../components/Inputs/BaseInput.vue';
  import {
        required,
        email,
    } from "vuelidate/lib/validators";
  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
        BaseInput
    },
    data () {
      return {
        otpScreen: false,
        phoneerror: false,
        email_otperror:false,
        phone_otperror:false,
        isSubmitted:false,
        currentUser:'',
          phone: '',
          email: '',
          email_otp:'',
          phone_otp:''
      }
    },
    validations: {
      email:{required,email},
      phone:{required}
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      this.phone =this.currentUser.phone_no
      this.email =this.currentUser.email
    },
    methods:{
      emailVerified(){
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
       
        axios.get(process.env.VUE_APP_API_URL+'generate-otp', {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
            this.otpScreen=true
          }
        }).catch(error => {
          this.$notifications.notify(
          {
            message: '<span>'+error.response.data.message+'</span>',
            icon: 'nc-icon nc-bell-55',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }).finally( () =>{

        })
      },
      otpVerified(){
        this.isSubmitted = true;
        this.phone_otperror=false
        this.email_otperror=false
        if (this.email_otp == '' && !this.currentUser.email_verified_at) {
          this.email_otperror=true
          return;
        }
        if (this.phone_otp == '' && !this.currentUser.phone_no_verified_at) {
          this.phone_otperror=true
          return;
        }
        const data = {
          phoneOtp: this.phone_otp,
          emailOtp: this.email_otp
        }
        axios.post(process.env.VUE_APP_API_URL+'validate-otps', data, {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          console.log(response)

          if(response.data){
            this.$router.reload()
          }
        }).catch(error => {
          this.otpScreen=true
          this.$notifications.notify(
          {
            message: '<span>'+error.response.data.message+'</span>',
            icon: 'nc-icon nc-bell-55',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }).finally( () =>{

        })
        this.otpScreen=false
      }
    }
  }
</script>
<style>
.card.card-stats {
    cursor: pointer;
}
.card.card-stats:hover {
    background: #00000008;
}
</style>
