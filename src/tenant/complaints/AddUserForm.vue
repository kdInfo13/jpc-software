<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New Complaints</h4>
              <form>
                <div class="col-md-4">
                  <label>Select Complaint Proritie</label>
                  <select class="form-control" v-model="user.prority">
                  <option v-for="(item, i) in prorities" :key="i" :value="i">{{ item }}</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.prority.$error" class="invalid-feedback">
                    <span v-if="!$v.user.prority.required">prority field is required.</span>
                  </div>
                </div>
                <div class="col-md-12">
                  <label>Image/Video</label>
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
                <div class="col-md-6" v-if="this.user.image">
                  <div class="image">
                    <img :src="imagePath+this.user.image">
                  </div>
                </div>
                <div class="col-md-12">
                  <label>Enter description</label>
                  <textarea class="form-control" v-model="user.description"></textarea>
                  <div v-if="isSubmitted && $v.user.description.$error" class="invalid-feedback">
                    <span v-if="!$v.user.description.required">description field is required.</span>
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-info btn-fill float-right mt-3" @click.prevent="saveProfile">
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
        isInitial: false,
        imagePath:'',
        prorities:'',
        permissions:'',
        currentUser:'',
        user: {
          prority: '',
          description: '',
          image:''
        },
        isSubmitted: false,
        loading: false
      }
    },
    validations: {
      user: {
        prority:{required},
        description:{required},
      }
    },
    mounted(){
     this.imagePath = process.env.VUE_APP_IMAGE
     this._getProrities();
    },
    methods: {
      onFileChange(event) {
        event.preventDefault();
        let currentObj = this;
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        let formData = new FormData();
        this.fileName = event.target.files[0].name;
        formData.append('image', event.target.files[0]);
        formData.append('path', 'complaints');
        formData.append('key', 'complaints');
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'upload_video', formData, config)
        .then(function (response) {
            if(response.data.status){
              currentObj.isInitial = true;
              currentObj.user.image = response.data.url;
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
      _getProrities(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'complaint-prorities',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.prorities){
                this.prorities = response.data.prorities
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
      saveProfile () {
        
        this.isSubmitted = true;
        this.adminerror=false;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
  
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'raise-complaint', this.user, {
            headers: {
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            },
            })
            .then(response => {
              this.loading=false;
              this.isSubmitted=false;
              if(response.status == 200 && response.data){
                this.$notifications.notify(
                {
                  message: '<span>complaint raised successfully</span>',
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'success'
                })
                this.$router.push({name: 'TenantComplaints'});
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
