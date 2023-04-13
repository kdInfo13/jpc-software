<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New User</h4>
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <label>Select User Role</label>
                      <select v-if="currentUser.role_id==1" v-model="user.role_id" class="form-control" @change="onChange($event)">
                        <option v-for="(index, i) in roles" :key="index" :value="i">{{ index }}</option>
                      </select>
                      <select v-if="currentUser.role_id==2" v-model="user.role_id" class="form-control" @change="onChange($event)">
                        <slot v-for="(index, i) in roles">
                          <option v-if="i!=1 && i!=2" :value="i" :key="index">{{ index }}</option>
                        </slot>
                      </select>
                      <select v-if="currentUser.role_id==3" v-model="user.role_id" class="form-control" @change="onChange($event)">
                        <slot v-for="(index, i) in roles">
                          <option v-if="i!=1 && i!=2 && i!=3" :value="i" :key="index">{{ index }}</option>
                        </slot>
                      </select>
                    <div v-if="isSubmitted && $v.user.role_id.$error" class="invalid-feedback">
                    <span v-if="!$v.user.role_id.required">Select role is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Full Name"
                              placeholder="Full Name"
                              v-model="user.name">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.name.$error" class="invalid-feedback">
                      <span v-if="!$v.user.name.required">Full name field is required.</span>
                      
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="tel"
                              label="Phone no"
                              placeholder="Phone no"
                              v-model="user.phone_no">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
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
                  <div class="col-md-4">
                    <base-input type="password"
                              label="Password"
                              placeholder="Password"
                              v-model="user.password">
                    </base-input>
                      <div v-if="isSubmitted && $v.user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.user.password.required">Password field is required.</span>
                      </div>
                  </div>
                  <div class="col-md-4" v-if="showPermission">
                    <label>Select Admin</label>
                    <select v-model="user.admin_id" class="form-control">
                      <option v-for="index in admins" :key="index.id" :value="index.id">{{ index.name }}</option>
                    </select>
                    <div v-if="adminerror" class="invalid-feedback">
                        <span v-if="adminerror">Select admin from list.</span>
                      </div>
                  </div>
                </div>
                <div class="row" v-if="showPermission">
                  <div class="col-md-12">Manager Permission</div>
                    
                  <div class="col-md-4" v-for="index in permissions" :key="index">
                    <input type="checkbox" v-model="user.permissions" :value="index">
                    <label class="pl-2">{{ index }}</label>
                  </div>
                </div>
                <div class="text-center">
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
  import AjaxLoader from '../../AjaxLoader.vue';
  import axios from "axios";

  export default {
    components: {
      Card,
      AjaxLoader
    },
    data () {
      return {
        roles:'',
        permissions:'',
        currentUser:'',
        showPermission: false,
        admins:'',
        adminerror:false,
        user: {
          name: '',
          email: '',
          role_id: '',
          password: '',
          password_confirmation:'',
          permissions:[],
          admin_id:'',
          phone_no:''
        },
        isSubmitted: false,
        loading: false
      }
    },
    validations: {
      user: {
        name:{required},
        email:{required, email},
        password: {required},
        role_id: {required}
      }
    },
    mounted(){
      this.currentUser =  JSON.parse(localStorage.getItem('user'));
      this._getRole();
      this._getPermission();
      this._getAdmin();
    },
    methods: {
      onChange(event){
        if(event.target.value==3){
          this.showPermission=true
        }else{
          this.user.permission=[]
          this.user.admin_id=''
          this.showPermission=false
        }
      },
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
      _getPermission(){
        axios.get(process.env.VUE_APP_API_URL+'permissions', {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
            this.permissions = response.data.permissions
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
        this.adminerror=false;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }

        this.user.password_confirmation = this.user.password
        if(this.user.role_id == 3 && this.user.admin_id == ''){
          this.adminerror=true
          return;
        }
    
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'register', this.user, {
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
                  message: '<span>New user added successfully</span>',
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'success'
                })
                this.$router.push({name: 'User'});
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
