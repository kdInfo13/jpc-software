<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New Trader</h4>
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Full Name"
                              placeholder="Full Name"
                              v-model="form.name">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.name.$error" class="invalid-feedback">
                      <span v-if="!$v.form.name.required">Full name field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="email"
                              label="Email"
                              placeholder="Email"
                              v-model="form.email">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.email.$error" class="invalid-feedback">
                      <span v-if="!$v.form.email.required">Email field is required.</span>
                      <span v-if="!$v.form.email.email">Please provide valid email</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="tel"
                              label="Phone"
                              placeholder="Phone"
                              v-model="form.phone_no">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.phone_no.$error" class="invalid-feedback">
                      <span v-if="!$v.form.phone_no.required">Phone field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4" v-if="currentUser.role_id==1">
                  <label>Select Admin</label>
                      <select v-model="form.admin_id" class="form-control">
                        <option v-for="(admin, index) in admins" :key="index" :value="admin.id">{{ admin.name }}</option>
                      </select>
                      <div v-if="isSubmitted && $v.form.admin_id.$error" class="invalid-feedback">
                          <span v-if="!$v.form.admin_id.required">Admin field is required.</span>
                      </div>
                </div>
                </div>
             
                  <div class="text-center">
                    <router-link :to="{name:'TradesList'}" class="btn btn-secondry float-left">
                      Back
                    </router-link>
                    <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProfile">
                      Save
                    </button>
                    <ajax-loader v-if="loading"></ajax-loader>
                  </div>
                 
                <div class="clearfix"></div>
              </form>
            </card>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import {
        required,
        email,
    } from "vuelidate/lib/validators";
  import Card from 'src/components/Cards/Card.vue'
  import axios from "axios";

  export default {
    components: {
      Card
    },
    data () {
      return {
        admins:'',
        form: {
          name: '',
          phone_no: '',
          email: ''
        },
        isSubmitted: false,
        loading: false,
        currentUser:''
      }
    },
    validations: {
      form: {
        email:{required, email},
        name: {required},
        phone_no:{required},
        admin_id:{required}
      }
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      if(this.currentUser.role_id==1){
        this._getAdmin();
      }else{
        this.form.admin_id = this.currentUser.id
      }
    },
    methods: {
      _getAdmin(){
        axios.get(process.env.VUE_APP_API_URL+'admins', {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
            this.admins = response.data.admins
          }
        }).catch(error => {
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
      saveProfile () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'add-trade-person', this.form, {
            headers: {
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            },
            })
        .then(response => {
          this.loading=false;
          this.isSubmitted=false;
          console.log(response)
          if(response.status == 200 && response.data){
            this.$notifications.notify(
            {
              message: '<span>New trade person added successfully.</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
            this.$router.push({name: 'TradesList'});
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
