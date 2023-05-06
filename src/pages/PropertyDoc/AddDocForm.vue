<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Property Documents</h4>
              <form>
                <div>
                  <div class="row">
                    <div class="col-md-4">
                      <label>Type</label>
                      <select v-model="form.type" class="form-control"  @change="onTypeChange">
                        <option v-for="(item, index) in propertyType" :key="index" :value="index">{{ item }}</option>
                      </select>
                    </div>
                    <div class="col-md-4" v-if="form.type==10">
                      <label>Other Doc Name</label>
                      <input type="text" v-model="form.other_doc" class="form-control" placeholder="Other Doc Name">
                    </div>
                    <div class="col-md-4">
                      <label>Care Taker Name</label>
                      <input type="text" v-model="form.care_taker_name" class="form-control" placeholder="care taker name">
                      <div v-if="isSubmitted && $v.form.care_taker_name.$error" class="invalid-feedback">
                        <span v-if="!$v.form.care_taker_name.required">Care taker field is required.</span>
                      </div>
                    </div>
                    
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <label>Start date</label>
                      <input type="date" v-model="form.start_date" class="form-control">
                      <div v-if="isSubmitted && $v.form.start_date.$error" class="invalid-feedback">
                        <span v-if="!$v.form.start_date.required">Start date field is required.</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>End date</label>
                      <input type="date" v-model="form.end_date" class="form-control">
                      <div v-if="isSubmitted && $v.form.end_date.$error" class="invalid-feedback">
                        <span v-if="!$v.form.end_date.required">End date field is required.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Documents Image</label><br>
                    <div class="dropbox">
                      <input type="file"  @change="onFileChange" class="input-file">
                        <p v-if="!form.pdf_name">
                          Drag your file(s) here to begin<br> or click to browse
                        </p>
                        <div class="row">
                          <div class="col-md-4 square" v-if="form.pdf_name">
                            <img :src="imagePath+form.pdf_name">
                          </div>
                        </div>
                    </div>
                    <ajax-loader v-if="loadingRoom"></ajax-loader>
                  </div>
                </div>
              
                <div class="row mt-4">
                  <div class="col-md-12">
                    <router-link :to="{ path: '/admin/doc-list/'+ form.property_id}">Back</router-link>
                    <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProperty">
                      Save
                    </button>
                  </div>
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
<style>
.image-container[data-v-10e59822]{
  width: 100%;
}
</style>
<script>
import {
      required,
      email,
  } from "vuelidate/lib/validators";
import Card from 'src/components/Cards/Card.vue'
import AmenitiesImage from 'src/components/AmenitiesImage.vue'
import BaseCheckbox from '../../components/Inputs/BaseCheckbox.vue'
import BaseRadio from '../../components/Inputs/BaseRadio.vue'
import BaseInput from '../../components/Inputs/BaseInput.vue';
import axios from "axios";
import AjaxLoader from '../../AjaxLoader.vue';

  export default {
    components: {
      Card,
      BaseCheckbox,
      AmenitiesImage,
      BaseRadio,
        BaseInput,
        AjaxLoader
    },
    data () {
      return {
        loadingRoom:false,
        isSubmitted:false,
        propertyType:[],
        loading: false,
        imagePath:'',
        form: {
          property_id: '',
          type: '',
          pdf_name: '',
          care_taker_name: '',
          start_date: '',
          end_date:'',
          other_doc:''
        }
      }
    },
    validations: {
      form: {
        property_id:{required},
        type: {required},
        pdf_name:{required},
        care_taker_name:{required},
        start_date:{required},
        end_date:{required},
      }
    },
    mounted(){
      this.imagePath = process.env.VUE_APP_IMAGE
      this.form.property_id =this.$route.params.id
      this._getType()
    },
    methods: {
      _getType(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'document-types',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.documentTypes){
                this.propertyType = response.data.documentTypes
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
      onTypeChange(event){
        if(event.target.value==10){

        }else{
          this.form.other_doc=''
        }
      },
      onFileChange(event) {
        event.preventDefault();
        let currentObj = this;
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('path', 'documents');
        formData.append('key', 'pdf_name');
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
        .then(function (response) {
            if(response.data.status){
              currentObj.form.pdf_name = response.data.url;
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
      saveProperty () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        const url = process.env.VUE_APP_API_URL+'document/add'
        axios.post(url, this.form, {
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
                this.$router.push({name: 'ListDoc', 'params': {'id': this.form.property_id}});
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
