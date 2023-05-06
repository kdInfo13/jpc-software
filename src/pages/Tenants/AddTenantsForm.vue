<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New Tenant</h4>
              <form>
                <div class="row">
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
                    <base-input type="tel"
                              label="Phone"
                              placeholder="Phone"
                              v-model="user.phone_no">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.phone_no.$error" class="invalid-feedback">
                    <span v-if="!$v.user.phone_no.required">Phone field is required.</span>
                  </div>
                  </div>
                </div>

                <div class="row">
                  <div :class="class_a">
                    <label>Select Property</label>
                    <select v-model="user.property_id" class="form-control" @change="onChange($event)">
                      <option v-for="(item, index) in tableData" :value="item.id" :key="index">{{  item.name }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.property_id.$error" class="invalid-feedback">
                      <span v-if="!$v.user.property_id.required">Select property first.</span>
                    </div>
                  </div>
                  <div :class="class_a">
                    <label>Select Property Room</label>
                    <div v-if="roomData.length > 0">
                      <select v-model="user.room_id" class="form-control">
                        <option v-for="(item, index) in roomData" :value="item.id" :key="index">{{  item.name }}</option>
                      </select>
                    </div>
                    <div v-if="roomData.length <= 0">
                      <select v-model="user.room_id" class="form-control">
                      </select>
                    </div>
                 
                    <div v-if="isSubmitted && $v.user.room_id.$error" class="invalid-feedback">
                      <span v-if="!$v.user.room_id.required">Select property room.</span>
                    </div>
                  </div>
                  <div :class="class_a">
                    <label>Tanency Period</label>
                    <select v-model="user.tanency_period" class="form-control" @change="onTypeChange">
                      <option value="1">6 Months</option>
                      <option value="2">1 Year</option>
                      <option value="3">Other</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.tanency_period.$error" class="invalid-feedback">
                      <span v-if="!$v.user.tanency_period.required">Select tanency period.</span>
                    </div>
                  </div>
                  <div :class="class_a" v-if="user.tanency_period==3">
                    <base-input type="text"
                    label="Other Tanency period"
                    placeholder="Other Tanency period"
                    v-model="user.tanency_other"
                    ></base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <base-input type="number"
                    label="deposite amount"
                    placeholder="deposite amount"
                    v-model="user.deposite_amount"
                    ></base-input>
                    <div v-if="isSubmitted && $v.user.deposite_amount.$error" class="invalid-feedback">
                      <span v-if="!$v.user.deposite_amount.required">Enter deposite amount.</span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <base-input type="date"
                    label="deposite date"
                    placeholder="deposite date"
                    v-model="user.deposite_date"
                    ></base-input>
                    <div v-if="isSubmitted && $v.user.deposite_date.$error" class="invalid-feedback">
                      <span v-if="!$v.user.deposite_date.required">Pick deposite date.</span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label>Frequency</label>
                    <select v-model="user.frequency" class="form-control">
                      <option value="1">Monthly</option>
                      <option value="2">Weekly</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.frequency.$error" class="invalid-feedback">
                      <span v-if="!$v.user.frequency.required">Select frequency period.</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label>rent date</label>
                    <select v-model="user.rent_date" class="form-control">
                      <option v-for="index in 31" :key="index" :value="k=index">{{ index }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.rent_date.$error" class="invalid-feedback">
                      <span v-if="!$v.user.rent_date.required">Select rent date.</span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <base-input type="number"
                    label="rent amount"
                    placeholder="rent amount"
                    v-model="user.rent_amount"
                    ></base-input>
                    <div v-if="isSubmitted && $v.user.rent_amount.$error" class="invalid-feedback">
                      <span v-if="!$v.user.rent_amount.required">Enter rent amount.</span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <base-input type="date"
                    label="tanency start date"
                    placeholder="tanency start date"
                    v-model="user.tanency_start_date"
                    ></base-input>
                    <div v-if="isSubmitted && $v.user.tanency_start_date.$error" class="invalid-feedback">
                      <span v-if="!$v.user.tanency_start_date.required">Pick tanency start date.</span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <base-input type="date"
                    label="tanency end date"
                    placeholder="tanency end date"
                    v-model="user.tanency_end_date"
                    ></base-input>
                    <div v-if="isSubmitted && $v.user.tanency_end_date.$error" class="invalid-feedback">
                      <span v-if="!$v.user.tanency_end_date.required">Pick tanency end date.</span>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <base-input type="text"
                    label="full final settlement"
                    placeholder="full final settlement"
                    v-model="user.full_final_settlement"
                    ></base-input>
                  
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                    label="reference"
                    placeholder="reference"
                    v-model="user.reference"
                    ></base-input>
                  
                    <div v-if="isSubmitted && $v.user.reference.$error" class="invalid-feedback">
                      <span v-if="!$v.user.reference.required">reference field is required.</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label>Select tenant Admin</label>
                    <select v-model="user.admin_id" class="form-control" @change="onChangeAdmin($event)">
                      <option v-for="index in admins" :key="index.id" :value="index.id">{{ index.name }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.admin_id.$error" class="invalid-feedback">
                      <span v-if="!$v.user.admin_id.required">Select admin from list.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label>Select tenant Manager</label>
                    <select v-model="user.manager_id" class="form-control">
                      <option v-for="index in managers" :key="index.id" :value="index.id">{{ index.name }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.manager_id.$error" class="invalid-feedback">
                      <span v-if="!$v.user.manager_id.required">Select manager from list.</span>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-md-12">
                    <label>Remarks</label>
                    <textarea v-model="user.remarks" class="form-control"></textarea>
                    <div v-if="isSubmitted && $v.user.remarks.$error" class="invalid-feedback">
                      <span v-if="!$v.user.remarks.required">Enter remarks.</span>
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label>Identity Proof Documents</label>
                    <div class="dropbox">
                      <input type="file"  :disabled="isInitial" @change="onFileChange" class="input-file">
                        <p v-if="!isInitial">
                          Drag your file(s) here to begin<br> or click to browse
                        </p>
                        <p v-if="isInitial">
                          Uploading {{ fileName }}...
                        </p>
                    </div>
                    <div v-if="isSubmitted && $v.user.id_proof.$error" class="invalid-feedback">
                      <span v-if="!$v.user.id_proof.required">Uplaod image.</span>
                    </div>
                  </div>
                  <div class="col-md-6 image" v-if="user.id_proof">
                    <img :src="this.path+user.id_proof">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                  <div class="text-center mt-4">
                    <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProfile">
                      Save
                    </button>
                    <ajax-loader v-if="loading"></ajax-loader>
                  </div>
                </div>
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
import BaseInput from '../../components/Inputs/BaseInput.vue';
import axios from "axios";
import AjaxLoader from '../../AjaxLoader.vue';

  export default {
    components: {
      Card, BaseInput, AjaxLoader
    },
    data () {
      return {
        class_a:'col-md-4',
        tableData: [],
        roomData: [],
        managers:'',
        admins:'',
        loading: false,
        isInitial: false,
        currentuser:'',
        fileName:'',
        user: {
          reference:'',
          name: '',
          email: '',
          phone_no: '',
          property_id: '',
          room_id: '',
          tanency_period: '',
          deposite_amount:'',
          deposite_date:'',
          rent_amount:'',
          frequency: '',
          rent_date: '',
          tanency_start_date: '',
          tanency_end_date: '',
          full_final_settlement: '',
          remarks: '',
          id_proof:'',
          role_id : "4",
          remarks: '',
          manager_id:'',
          admin_id:'',
          tanency_other:'',
        },
        isSubmitted: false,
        path:''
      }
    },
    validations: {
      user: {
        reference: {required},
        name:{required},
        email:{required, email},
        phone_no: {required},
        property_id: {required},
        room_id:{required},
        tanency_period:{required},
        deposite_amount:{required},
        deposite_date:{required},
        rent_amount : {required},
        frequency:{required},
        rent_date:{required},
        tanency_start_date:{required},
        tanency_end_date:{required},
        id_proof:{required},
        remarks:{required},
        manager_id:{required},
        admin_id:{required}
      }
    },
    mounted(){
      this.path = process.env.VUE_APP_IMAGE;
      this._getProperties();
      this.currentuser = JSON.parse(localStorage.getItem('user'));
      this._getManager(this.currentuser.id);
      if(this.currentUser.role_id===1){
        this._getAdmin();
      }
      if(this.currentUser.role_id===2){
        this.user.admin_id = this.currentUser.id
      }
      if(this.currentUser.role_id===3){
        this.user.admin_id = this.currentUser.created_under_admin
      }    
    },
    methods: {
      onTypeChange(event){
        if(event.target.value==3){
          this.class_a="col-md-3";
        }else{
          this.class_a="col-md-4";
          this.user.tanency_other=''
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
      _getManager(id){
        this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'managers/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.managers){
                this.managers = response.data.managers
              }
              this.loading=false;
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
              this.loading=false;
          }).finally( () => {
              this.loading = false
          })
      },
      onChangeAdmin(event){
        axios.get(process.env.VUE_APP_API_URL+'managers/'+event.target.value, {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
            this.managers = response.data.managers
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
      _getProperties(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'properties',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.properties){
                this.tableData = response.data.properties
              }
              this.loading=false;
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
              this.loading=false;
          }).finally( () => {
              this.loading = false
          })
      },
      onChange(event){
        this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'roomlist/'+event.target.value,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response)
              if(response.status==200 && response.data.data){
                this.roomData = response.data.data
              }
              this.loading=false;
          })
          .catch(error => {
            console.log(error)
            this.$notifications.notify(
            {
              message: `<span>Something went wrong.</span>`,
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
              this.loading=false;
          }).finally( () => {
              this.loading = false
          })
      },
      onFileChange(event) {
          event.preventDefault();
          let currentObj = this;
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          formData.append('image', event.target.files[0]);
          formData.append('path', 'owner');
          formData.append('key', 'id_proof');
          this.loading=true;
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.user.id_proof = response.data.url;
              }
          })
          .catch(error => {
            this.$notifications.notify(
                    {
                      message: `<span>`+error+`</span>`,
                      icon: 'nc-icon nc-bell-55',
                      horizontalAlign: 'right',
                      verticalAlign: 'top',
                      type: 'danger'
                    })
            }).finally( () => {
              this.loading=false;
          })
      },
      saveProfile () {
          this.isSubmitted = true;
          this.$v.$touch();
          if (this.$v.$invalid) {
              return;
          }
          this.loading=true;
          axios.post(process.env.VUE_APP_API_URL+'add-tanent', this.user, {
              headers: {
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              },
              })
              .then(response => {
                this.loading=false;
                this.isSubmitted=false;
                console.log(response.status)
                if(response.status == 200 && response.data){
                  this.$notifications.notify(
                  {
                    message: '<span>'+response.data.message+'</span>',
                    icon: 'nc-icon nc-bell-55',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'success'
                  })
                  this.$router.push({name: 'TenantsList'});
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
                if(error.response.status == 401){
                  this.$notifications.notify(
                  {
                    message: `<span>`+error.response.data.errors+`</span>`,
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
.image{
  width: 100%;
  height: 200px;
}
.image img {
    width: 100%;
    height: 200px;
    object-fit: contain;

}
</style>
