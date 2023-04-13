<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row" v-if="!loading">
          <ajax-loader v-if="loading"></ajax-loader>
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add Property Amenities</h4>
              <form>
                <div>
                  <div class="row">
                    <div class="mx-auto col-md-12">
                      <h5>No. Bed Rooms</h5>
                        <div class="row" v-for="(index,i) in propertyDetails.no_of_bathrooms" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Room identifier"
                              placeholder="Room identifier"
                              v-model="form.room_name[i]"
                              >
                            </base-input>
                          </div>
                         
                          <div class="col-md-6">
                            <label>Bed Room Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="i" @change="onFileChange" class="input-file">
                                <p v-if="!form.room_image[i]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-6" v-for="(inx, ki) in  form.room_image[i]" :key="inx">
                                    <img :src="imagePath+form.room_image[i][ki]">
                                  </div>
                                </div>
                               
                            </div>
                            <ajax-loader v-if="loadingRoom"></ajax-loader>
                          </div>

                        </div>
                    </div>
                    <hr>
                    <div class="mx-auto col-md-12">
                      <h5>No. Living Rooms</h5>
                        <div class="row" v-for="(index,i) in propertyDetails.no_of_living_areas" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Living identifier"
                              placeholder="Living identifier"
                              v-model="form.living_name[i]"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-6">
                            <label>Living Room Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="i" @change="onFileChangeLiving" class="input-file">
                                <p v-if="!form.living_image[i]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-6" v-for="(inx, ki) in  form.living_image[i]" :key="inx">
                                    <img :src="imagePath+form.living_image[i][ki]">
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <hr>
                    <div class="mx-auto col-md-12">
                      <h5>No. Kitchen</h5>
                        <div class="row" v-for="(index,k) in propertyDetails.no_of_kitchens" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Kitchen identifier"
                              placeholder="Kitchen identifier"
                              v-model="form.kitchen_name[k]"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-6">
                            <label>Kitchen  Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="k" @change="onFileChangeKitchen" class="input-file">
                                <p v-if="!form.kitchen_image[k]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-6" v-for="(inx, ki) in  form.kitchen_image[k]" :key="inx">
                                    <img :src="imagePath+form.kitchen_image[k][ki]">
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <hr>
                    <div class="mx-auto col-md-12">
                      <h5>No. Bathroom</h5>
                        <div class="row" v-for="(index,b) in propertyDetails.no_of_bathrooms" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Bathroom identifier"
                              placeholder="Bathroom identifier"
                              v-model="form.bathroom_name[b]"
                              >
                            </base-input>
                          </div>
                        
                          <div class="col-md-6">
                            <label>Bathroom Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="b" @change="onFileChangeBath" class="input-file">
                                <p v-if="!form.bathroom_image[b]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-6" v-for="(inx, ki) in  form.bathroom_image[b]" :key="inx">
                                    <img :src="imagePath+form.bathroom_image[b][ki]">
                                  </div>
                                </div>                            </div>
                          </div>
                        </div>
                    </div>

                    <hr>
                    <div class="col-md-6" v-if="propertyDetails.front_garden">
                      <label>front garden Images</label><br>
                        <div class="dropbox">
                          <input type="file" multiple  @change="onFileChangeFront" class="input-file">
                            <p v-if="!form.front_image">
                              Drag your file(s) here to begin<br> or click to browse
                            </p>
                            <img v-if="form.front_image" :src="imagePath+form.front_image">
                        </div>
                        <ajax-loader v-if="loadingFront"></ajax-loader>
                    </div>
                    <div class="col-md-6" v-if="propertyDetails.rear_garden">
                      <label>rear garden Images</label><br>
                        <div class="dropbox">
                          <input type="file" multiple  @change="onFileChangeRear" class="input-file">
                            <p v-if="!form.rear_image">
                              Drag your file(s) here to begin<br> or click to browse
                            </p>
                            <img v-if="form.rear_image" :src="imagePath+form.rear_image">
                        </div>
                        <ajax-loader v-if="loadingRear"></ajax-loader>
                    </div>
                  </div>
                </div>
              
                <div class="row mt-4">
                  <div class="col-md-12">
                    <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProperty">
                      Save
                    </button>
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
<style>
.image-container[data-v-10e59822]{
  width: 100%;
}
</style>
<script>
import {required,email} from "vuelidate/lib/validators";
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
        loadingFront:false,
        loadingRear:false,
        loadingRoom:false,
        isInitial:false,
        imagePath:'',
        fileName: [],
        showFrontGarden: false,
        showBackGarden: false,
        isSubmitted:false,
        loading:false,
        propertyDetails:[],
        url:[],
        l_url:[],
        k_url:[],
        b_url:[],
        front_url:[],
        rear_url:[],
        form: {
          room_name:[],
          room_image:[],
          living_name:[],
          living_image:[],
          kitchen_name:[],
          kitchen_image:[],
          bathroom_name:[],
          bathroom_image:[],
          front_image:'',
          rear_image:''
        }
      }
    },
    validations: {
   
    },
    mounted(){
      this.imagePath = process.env.VUE_APP_IMAGE
      this.getProperty(this.$route.params.id)
      this.form.property_id = this.$route.params.id
    },
    methods: {
      onFileChange(event) {
          event.preventDefault();
          let currentObj = this;
          const index = event.target.getAttribute('data-id');
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();

          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
        
          formData.append('path', 'room');
          formData.append('key', 'id_proof');
          if(currentObj.form.room_image[index]){
            currentObj.url = []
            currentObj.url.push(currentObj.form.room_image[index])
          }else{
            currentObj.url = []
          }
          
          this.loadingRoom=true;
          const tmpArr = [];
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.url.push(response.data.url)
                currentObj.form.room_image[index] = currentObj.url
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
      onFileChangeLiving(event) {
          event.preventDefault();
          let currentObj = this;
          const index = event.target.getAttribute('data-id');
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
          formData.append('path', 'living');
          formData.append('key', 'id_proof');
          if(currentObj.form.living_image[index]){
            currentObj.l_url = []
            currentObj.l_url.push(currentObj.form.living_image[index])
          }else{
            currentObj.l_url = []
          }
          this.loading=true;
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.l_url.push(response.data.url)
                currentObj.form.living_image[index] = currentObj.l_url
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
      onFileChangeKitchen(event){
        event.preventDefault();
          let currentObj = this;
          const index = event.target.getAttribute('data-id');
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
          formData.append('path', 'kitchen');
          formData.append('key', 'id_proof');
          if(currentObj.form.kitchen_image[index]){
            currentObj.l_url = []
            currentObj.l_url.push(currentObj.form.kitchen_image[index])
          }else{
            currentObj.l_url = []
          }
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.k_url.push(response.data.url)
                currentObj.form.kitchen_image[index] = currentObj.k_url
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
      onFileChangeBath(event){
        event.preventDefault();
          let currentObj = this;
          const index = event.target.getAttribute('data-id');
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
          formData.append('path', 'bathroom');
          formData.append('key', 'id_proof');
          this.loading=true;
          if(currentObj.form.bath_image[index]){
            currentObj.l_url = []
            currentObj.l_url.push(currentObj.form.bath_image[index])
          }else{
            currentObj.l_url = []
          }
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.b_url.push(response.data.url)
                currentObj.form.bath_image[index] = currentObj.b_url
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
      onFileChangeFront(event){
        this.loadingFront = true
        event.preventDefault();
          let currentObj = this;
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
          formData.append('path', 'garden');
          formData.append('key', 'id_proof');
          if(currentObj.form.front_image){
            currentObj.front_url = []
            currentObj.front_url.push(currentObj.form.front_image)
          }else{
            currentObj.front_url = []
          }
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
            currentObj.loadingFront = false
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.front_url.push(response.data.url)
                currentObj.form.front_image = currentObj.front_url
              }
          })
        .catch(error => {
          currentObj.loadingFront = false
          this.$notifications.notify(
                {
                  message: `<span>`+error+`</span>`,
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'danger'
                })
        }).finally( () => {
          currentObj.loadingFront = false
        })
      },
      onFileChangeRear(event){
        event.preventDefault();
          let currentObj = this;
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          for (var i = 0; i < event.target.files.length; i++ ){
              let file = event.target.files[i];
              formData.append('image[' + i + ']', file);
          }
          formData.append('path', 'garden');
          formData.append('key', 'id_proof');
          this.loadingRear = true
          if(currentObj.form.rear_image){
            currentObj.rear_url = []
            currentObj.rear_url.push(currentObj.form.rear_image)
          }else{
            currentObj.rear_url = []
          }
          axios.post(process.env.VUE_APP_API_URL+'upload_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                currentObj.rear_url.push(response.data.url)
                currentObj.form.rear_image = currentObj.rear_url
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
          this.loadingRear=false;
        })
      },
      getProperty(id){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'property/'+id+'/edit',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.property){
                  this.propertyDetails = response.data.property
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
      saveProperty () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        console.log(this.form)
        alert('Your data: ' + JSON.stringify(this.form))
      }
    }
  }

</script>
<style>
img {
    width: 100%;
    height: auto;
}
</style>
