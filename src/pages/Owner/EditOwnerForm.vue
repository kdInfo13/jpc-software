<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Owner/Investors</h4>
            <form v-if="user && !loading">
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
                  <label>Type</label>
                    <select v-model="user.typer_of_owner" class="form-control">
                      <option value="1">Landlord</option>
                      <option value="2">Investor</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.typer_of_owner.$error" class="invalid-feedback">
                    <span v-if="!$v.user.typer_of_owner.required">Please select owner type.</span>
                  </div>
                </div>
                <div class="col-md-4" v-if="currentUser.role_id==1">
                  <label>Select Admin</label>
                      <select v-model="user.admin_id" class="form-control" @change="onChange($event)">
                        <option v-for="(admin, index) in admins" :key="index" :value="admin.id">{{ admin.name }}</option>
                      </select>
                      <div v-if="isSubmitted && $v.user.admin_id.$error" class="invalid-feedback">
                          <span v-if="!$v.user.admin_id.required">Admin field is required.</span>
                      </div>
                </div>
              
                <div class="col-md-4">
                  <base-input type="text"
                            label="Door Number"
                            placeholder="Door Number"
                            v-model="user.door_no">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.door_no.$error" class="invalid-feedback">
                    <span v-if="!$v.user.door_no.required">Address field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="Street"
                            placeholder="Street"
                            v-model="user.street">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.street.$error" class="invalid-feedback">
                    <span v-if="!$v.user.street.required">Street field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="Area"
                            placeholder="Area"
                            v-model="user.area">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.area.$error" class="invalid-feedback">
                    <span v-if="!$v.user.area.required">Area field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="Postal Code"
                            placeholder="ZIP Code"
                            v-model="user.postcode">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.postcode.$error" class="invalid-feedback">
                    <span v-if="!$v.user.postcode.required">Postal Code field is required.</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <base-input type="text"
                    label="Bank Name"
                    placeholder="Bank Name"
                    v-model="user.bank_name"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.bank_name.$error" class="invalid-feedback">
                    <span v-if="!$v.user.bank_name.required">Bank name field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                    label="Account Number"
                    placeholder="Account Number"
                    v-model="user.account_no"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.account_no.$error" class="invalid-feedback">
                    <span v-if="!$v.user.account_no.required">Account number field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                    label="Sort Code"
                    placeholder="Sort Code"
                    v-model="user.sort_code"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.sort_code.$error" class="invalid-feedback">
                    <span v-if="!$v.user.sort_code.required">Sort code field is required.</span>
                  </div>
                </div>
              </div>
              <div class="row">
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
                  </div>
                  <div class="col-md-6" v-if="this.user.id_proof">
                    <div class="image">
                      <img :src="imagePath+this.user.id_proof">
                    </div>
                  </div>
              </div>

              <div class="text-center">
                <router-link :to="{name:'OwnerList'}" class="btn btn-secondry float-left">
                  Back
                </router-link>
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
                  Update
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
            <ajax-loader v-if="loading"></ajax-loader>
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
      imagePath:'',
      fileName:'',
      isInitial:false,
      admins: '',
      user: {
        email: '',
        name: '',
        phone_no: '',
        door_no: '',
        area: '',
        street: '',
        postcode: '',
        typer_of_owner: '',
        bank_name:'',
        account_no:'',
        sort_code:'',
        id:'',
        id_proof:'',
        admin_id:''
      },
      isSubmitted: false,
      loading: false,
      currentUser:''

    }
  },
  validations: {
    user: {
        email:{required, email},
        name: {required},
        phone_no: {required},
        door_no:{required},
        area:{required},
        street:{required},
        postcode:{required},
        typer_of_owner : {required},
        bank_name: {required},
        account_no: {required},
        sort_code:{required},
        admin_id:{required},
      }
    },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.imagePath = process.env.VUE_APP_IMAGE
    this._getAdmin();
    if(this.currentUser.role_id===2){
        this.user.admin_id = this.currentUser.id
      }
      if(this.currentUser.role_id===3){
        this.user.admin_id = this.currentUser.created_under_admin
      }
      this.getOwner(this.$route.params.id);

  },
  methods: {
    onChange(event){
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
    getOwner(id) {
      this.loading=true
      axios.get(process.env.VUE_APP_API_URL+'owner/'+id+'/edit',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.owners){
                  this.user.admin_id = response.data.owners.admin_id
                  this.user.id = response.data.owners.id
                  this.user.account_no = response.data.owners.account_no
                  this.user.area = response.data.owners.area
                  this.user.bank_name = response.data.owners.bank_name
                  this.user.door_no = response.data.owners.door_no
                  this.user.email = response.data.owners.email
                  this.user.id_proof = response.data.owners.id_proof
                  this.user.name = response.data.owners.name
                  this.user.phone_no = response.data.owners.phone_no
                  this.user.postcode = response.data.owners.postcode
                  this.user.sort_code = response.data.owners.sort_code
                  this.user.street = response.data.owners.street
                  this.user.typer_of_owner = response.data.owners.typer_of_owner
                }
                this.loading=false;
            }).catch(error => {
              this.$notifications.notify(
              {
                message: `<span>Something went wrong.</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
              this.loading=false;
            }).finally( () =>{

            })
     
    },
    updateProfile () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'owner/update', this.user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            },
            })
            .then(response => {
              this.loading=false;
              this.isSubmitted=false;
              
              if(response.status == 200 && response.data){
                this.$notifications.notify(
                {
                  message: '<span>'+response.data.message+'</span>',
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'success'
                })
                this.$router.push({name: 'OwnerList'});
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
.image{
  width: 200px;
  height: 200px;
  object-fit: contain;
}
.image img {
    width: 100%;
    height: auto;
}
</style>
