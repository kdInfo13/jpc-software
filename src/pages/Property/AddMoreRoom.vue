<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
              <h4 slot="header" class="card-title">Add More Amenities</h4>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <label>Select Amenities type</label>
                    <select v-model="form.type" class="form-control">
                      <option value="1">Room</option>
                      <option value="2">Living area</option>
                      <option value="3">Kitchen area</option>
                      <option value="4">Bathroom</option>
                    </select>
                    <div v-if="isSubmitted && $v.form.type.$error" class="invalid-feedback">
                      <span v-if="!$v.form.type.required">Amenities type field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <base-input type="number"
                    label="Enter Number of entity"
                    placeholder="Enter Number of entity"
                    v-model="form.count"
                    maxlength = "10"
                    @input="getLength"
                    ></base-input>
                    <div v-if="isSubmitted && $v.form.count.$error" class="invalid-feedback">
                      <span v-if="!$v.form.count.required">Amenities number field is required.</span>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="no_of_bedrooms!=0 && no_of_bedrooms">
                  <div class="mx-auto col-md-12">
                        <div class="row" v-for="index in no_of_bedrooms" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="identifier name"
                              placeholder="identifier name"
                              v-model="form.name[index]"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-6">
                            <label>identifier Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="index" @change="onFileChange" class="input-file">
                                <p v-if="!form.images[index]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-4 square" v-for="(inx, ki) in  form.images[index]" :key="inx">
                                    <img :src="imagePath+form.images[index][ki]">
                                  </div>
                                </div>
                              
                            </div>
                            <ajax-loader v-if="loadingRoom"></ajax-loader>
                          </div>
                        

                        </div>
                    </div>
                </div>
                <div class="text-center">
                  <button class="btn btn-secondry float-left"  @click.prevent="back">
                    Back
                  </button>
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
import {required} from "vuelidate/lib/validators";
  import axios from "axios";
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import BaseInput from '../../components/Inputs/BaseInput.vue';
  import AjaxLoader from '../../AjaxLoader.vue';
  export default {
    components: {
      LTable,
      Card,
      BaseInput,
      AjaxLoader
    },
    data () {
      return {
        loadingRoom:false,
        no_of_bedrooms:0,
        isSubmitted: false,
        tableData : [],
        url:[],
        imagePath:'',
        loading: false,
        form:{
          property_id:'',
          count:'',
          type:'',
          name:[],
          images:[],
        }
      }
    },
    validations: {
      form: {
        type:{required},
        count: {required}
      }
    },
    mounted (){
      this.imagePath = process.env.VUE_APP_IMAGE
      this.form.property_id = this.$route.params.id
    },
    methods: {
      getLength(){
        this.no_of_bedrooms = parseInt(this.form.count);
      },
      onFileChange(event) {
          event.preventDefault();
          let currentObj = this;
          const index = event.target.getAttribute('data-id');
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          let tpye_text = 'room';
          if(this.form.type==1){
            tpye_text ='room';
          }else if(this.form.type==2){
            tpye_text ='living';
          }else if(this.form.type==3){
            tpye_text ='kitchen';
          }else if(this.form.type==4){
            tpye_text ='bathroom';
          }
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
        
          formData.append('path', tpye_text);
          formData.append('key', 'id_proof');
          if(currentObj.form.images[index]){
            currentObj.url = []
            for(let i=0; i < currentObj.form.images[index].length; i++){
              currentObj.url.push(currentObj.form.images[index][i])
            }
          }else{
            currentObj.url = []
          }
          
          this.loadingRoom=true;
          const tmpArr = [];
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.url.push(response.data.url[i])
                }
                currentObj.form.images[index] = currentObj.url
              }
          })
        .catch(error => {
          console.log(error)
          this.$notifications.notify(
          {
            message: `<span>`+error+`</span>`,
            icon: 'nc-icon nc-bell-55',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }).finally( () => {
          this.loadingRoom=false;
        })
      },
      saveProfile(){
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'add-property-room', this.form, {
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
              message: '<span>Amenities updated successfully.</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
            this.$router.back()
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
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>
<style>
</style>
