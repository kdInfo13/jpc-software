<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Tenant</h4>
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
                <div class="col-md-4">
                  <label>Select Property</label>
                  <select v-model="user.property_id" class="form-control" @change="onChange($event)">
                    <option v-for="(item, index) in tableData" :value="item.id" :key="index">{{  item.name }}</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.property_id.$error" class="invalid-feedback">
                    <span v-if="!$v.user.property_id.required">Select property first.</span>
                  </div>
                </div>
                <div class="col-md-4">
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
                <div class="col-md-4">
                  <label>Tanency Period</label>
                  <select v-model="user.tanency_period" class="form-control">
                    <option value="1">6 Months</option>
                    <option value="2">1 Year</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.tanency_period.$error" class="invalid-feedback">
                    <span v-if="!$v.user.tanency_period.required">Select tanency period.</span>
                  </div>
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
                  <label>full final settlement</label>
                  <select v-model="user.full_final_settlement" class="form-control">
                    <option v-for="index in 31" :key="index" :value="k=index">{{ index }}</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.full_final_settlement.$error" class="invalid-feedback">
                    <span v-if="!$v.user.full_final_settlement.required">Select rent date.</span>
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
                    Update
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
      tableData: [],
      roomData: [],
      managers:'',
      currentuser:'',
      loading: false,
      isInitial: false,
      fileName:'',
      user: {
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
        manager_id
      },
      isSubmitted: false,
      path:''
    }
  },
  validations: {
    user: {
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
      full_final_settlement:{required},
      tanent_id:{required},
      manager_id:{required}
    }
  },
  mounted(){
    this.path = process.env.VUE_APP_IMAGE;
    this._getProperties();
    this._getTenant(this.$route.params.id);
    this.currentuser = JSON.parse(localStorage.getItem('user'));
    this._getManager(this.currentuser.id);
  },
  methods: {
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
    _getTenant(id){
      this.loading = true;
      axios.get(process.env.VUE_APP_API_URL+'tanent/'+id+'/edit', { 
        headers: {
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
        }
      }).then((response) => {
        if(response.status==200 && response.data.tradePersons){
          this._getRoom(response.data.tradePersons.room.id)
          this.user.id = response.data.tradePersons.id
          this.user.tanent_id = response.data.tradePersons.tanent_id
          this.user.name = response.data.tradePersons.tanent.name
          this.user.email = response.data.tradePersons.tanent.email
          this.user.phone_no = response.data.tradePersons.tanent.phone_no
          this.user.property_id = response.data.tradePersons.property.id
          this.user.room_id = response.data.tradePersons.room.id
          this.user.tanency_period = response.data.tradePersons.tanency_period
          this.user.deposite_amount = response.data.tradePersons.deposite_amount
          this.user.deposite_date = response.data.tradePersons.deposite_date
          this.user.rent_amount = response.data.tradePersons.rent_amount
          this.user.frequency = response.data.tradePersons.frequency
          this.user.rent_date = response.data.tradePersons.rent_date
          this.user.tanency_start_date = response.data.tradePersons.tanency_start_date
          this.user.tanency_end_date = response.data.tradePersons.tanency_end_date
          this.user.manager_id = response.data.tradePersons.manager_id
          this.user.id_proof = response.data.tradePersons.id_proof
          this.user.remarks = response.data.tradePersons.remarks
          this.user.full_final_settlement = response.data.tradePersons.full_final_settlement
        }
        this.loading=false;
      }).catch( (error) => {

      })
    },
    _getRoom(id){
      this.loading=true;
        axios.get(process.env.VUE_APP_API_URL+'roomlist/'+id,{
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
        axios.post(process.env.VUE_APP_API_URL+'tanent/update', this.user, {
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
width: 150px;
height: 150px;
object-fit: contain;
}
.image img {
  width: 100%;
  height: auto;
}
</style>
