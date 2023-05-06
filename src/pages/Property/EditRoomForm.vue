<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Edit Property Amenities
              <router-link :to="{ path: '/admin/add-more-room/'+ form.property_id}" class="card-title pull-right text-primary">Add more Amenities</router-link>
            </h4>
              <ajax-loader v-if="loading"></ajax-loader>
              <form v-if="loadImage">
                <div>
                  <div class="row">
                    <div class="mx-auto col-md-12">
                      <h5>No. Bed Rooms</h5>
                        <div class="row" v-for="(index,i) in propertyDetails.no_of_bedrooms" :key="i">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Room identifier"
                              placeholder="Room identifier"
                              v-model="form.room_name[i]"
                              >
                            </base-input>
                            
                            <span v-if="room_id[i]" v-on:click="deleteImage(room_id[i])">Delete</span>
                          </div>
                         
                          <div class="col-md-6">
                            <!-- {{ form.room_name_image[i] }} -->
                            <label>Bed Room Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="i" @change="onFileChange" class="input-file">
                                <p v-if="!form.room_name_image[i]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-4 square" v-for="(inx, ki) in  form.room_name_image[i]" :key="ki+i+1">
                                    <img :src="imagePath+form.room_name_image[i][ki]">
                                  </div>
                                </div>
                               
                            </div>
                            <ajax-loader v-if="loadingRoom"></ajax-loader>
                          </div>

                        </div>
                    </div>
                    <hr>
                    <div class="mx-auto col-md-12">
                      <ajax-loader v-if="loadingLiving"></ajax-loader>
                      <h5>No. Living Rooms</h5>
                        <div class="row" v-for="(index,i) in propertyDetails.no_of_living_areas" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Living identifier"
                              placeholder="Living identifier"
                              v-model="form.living_name[i]"
                              >
                            </base-input>
                            <span v-if="living_id[i]" v-on:click="deleteImage(living_id[i])">Delete</span>

                          </div>
                          <div class="col-md-6">
                            <label>Living Room Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="i" @change="onFileChangeLiving" class="input-file">
                                <p v-if="!form.living_name_image[i]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-4 square" v-for="(inx, ki) in  form.living_name_image[i]" :key="ki">
                                    <img :src="imagePath+form.living_name_image[i][ki]">
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <hr>
                    <div class="mx-auto col-md-12">
                      <ajax-loader v-if="loadingKitchen"></ajax-loader>
                      <h5>No. Kitchen</h5>
                        <div class="row" v-for="(index,k) in propertyDetails.no_of_kitchens" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Kitchen identifier"
                              placeholder="Kitchen identifier"
                              v-model="form.kitchen_name[k]"
                              >
                            </base-input>
                            <span v-if="kitchen_id[k]" v-on:click="deleteImage(kitchen_id[isKeyObject])">Delete</span>
                          </div>
                          <div class="col-md-6">
                            <label>Kitchen  Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="k" @change="onFileChangeKitchen" class="input-file">
                                <p v-if="!form.kitchen_name_image[k]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-4 square" v-for="(inx, ki) in  form.kitchen_name_image[k]" :key="ki">
                                    <img :src="imagePath+form.kitchen_name_image[k][ki]">
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <hr>
                    <div class="mx-auto col-md-12">
                      <ajax-loader v-if="loadingBathroom"></ajax-loader>
                      <h5>No. Bathroom</h5>
                        <div class="row" v-for="(index,b) in propertyDetails.no_of_bathrooms" :key="index">
                          <div class="col-md-6">
                            <base-input type="text"
                              label="Bathroom identifier"
                              placeholder="Bathroom identifier"
                              v-model="form.bathroom_name[b]"
                              >
                            </base-input>
                            <span v-if="bathroom_id[b]" v-on:click="deleteImage(bathroom_id[b])">Delete</span>
                          </div>
                        
                          <div class="col-md-6">
                            <label>Bathroom Images</label><br>
                            <div class="dropbox">
                              <input type="file" multiple :data-id="b" @change="onFileChangeBath" class="input-file">
                                <p v-if="!form.bathroom_name_image[b]">
                                  Drag your file(s) here to begin<br> or click to browse
                                </p>
                                <div class="row">
                                  <div class="col-md-4 square" v-for="(inx, ki) in  form.bathroom_name_image[b]" :key="ki">
                                    <img :src="imagePath+form.bathroom_name_image[b][ki]">
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
                            <div class="row">
                              <div class="col-md-4 square" v-for="(inx, ki) in  front_url" :key="ki">
                                <img :src="imagePath+front_url[ki]">
                              </div>
                            </div> 
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
                            <div class="row">
                              <div class="col-md-4 square" v-for="(inx, ki) in  rear_url" :key="ki">
                                <img :src="imagePath+rear_url[ki]">
                              </div>
                            </div> 
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
        loadImage:false,
        loadingFront:false,
        loadingRear:false,
        loadingRoom:false,
        loadingLiving:false,
        loadingKitchen:false,
        loadingBathroom:false,
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
        room_id:[],
        living_id:[],
        kitchen_id:[],
        bathroom_id:[],
        form: {
          room_name:[],
          room_name_image:[],
          living_name:[],
          living_name_image:[],
          kitchen_name:[],
          kitchen_name_image:[],
          bathroom_name:[],
          bathroom_name_image:[],
          front_image:[],
          rear_image:[]
        }
      }
    },
    validations: {
   
    },
    mounted(){
      this.imagePath = process.env.VUE_APP_IMAGE
      this.getProperty(this.$route.params.id)
      this.getPropertyImage(this.$route.params.id)
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
          if(currentObj.form.room_name_image[index]){
            currentObj.url = []
            for(let i=0; i < currentObj.form.room_name_image[index].length; i++){
              currentObj.url.push(currentObj.form.room_name_image[index][i])
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
                currentObj.form.room_name_image[index] = currentObj.url
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
          if(currentObj.form.living_name_image[index]){
            currentObj.l_url = []
            for(let i=0; i < currentObj.form.living_name_image[index].length; i++){
              currentObj.l_url.push(currentObj.form.living_name_image[index][i])
            }
          }else{
            currentObj.l_url = []
          }
          this.loadingLiving=true;
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.l_url.push(response.data.url[i])
                }
                currentObj.form.living_name_image[index] = currentObj.l_url
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
          this.loadingLiving=false;
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
          if(currentObj.form.kitchen_name_image[index]){
            currentObj.k_url = []
            for(let i=0; i < currentObj.form.kitchen_name_image[index].length; i++){
              currentObj.k_url.push(currentObj.form.kitchen_name_image[index][i])
            }
          }else{
            currentObj.k_url = []
          }
          this.loadingKitchen = true
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.k_url.push(response.data.url[i])
                }               
                currentObj.form.kitchen_name_image[index] = currentObj.k_url
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
          this.loadingKitchen=false;
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
          if(currentObj.form.bathroom_name_image[index]){
            currentObj.b_url = []
            for(let i=0; i < currentObj.form.bathroom_name_image[index].length; i++){
              currentObj.b_url.push(currentObj.form.bathroom_name_image[index][i])
            }
          }else{
            currentObj.b_url = []
          }
          this.loadingBathroom=true
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.b_url.push(response.data.url[i])
                }  
                currentObj.form.bathroom_name_image[index] = currentObj.b_url
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
          this.loadingBathroom=false;
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
        
          if(currentObj.form.front_image[0].length > 0){
            currentObj.front_url[0] = []
            for(let i=0; i < currentObj.form.front_image[0].length; i++){
              currentObj.front_url.push(currentObj.form.front_image[0][i])
            }
          }else{
            currentObj.front_url = []
          }
          
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
            currentObj.loadingFront = false
              if(response.data.status){
                currentObj.isInitial = true;
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.front_url.push(response.data.url[i])
                } 
                currentObj.form.front_image[0] = currentObj.front_url
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
          if(currentObj.form.rear_image[0]){
            currentObj.rear_url = []
            for(let i=0; i < currentObj.form.rear_image[0].length; i++){
              currentObj.rear_url.push(currentObj.form.rear_image[0][i])
            }
          }else{
            currentObj.rear_url = []
          }
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
                currentObj.isInitial = true;
                for(let i=0; i < response.data.url.length; i++){
                  currentObj.rear_url.push(response.data.url[i])
                }                
                currentObj.form.rear_image[0] = currentObj.rear_url
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
      getPropertyImage(id){
        this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'property-images/'+id,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.propertiesImages.length!=0){
                  if(response.data.propertiesImages[1]){
                    for(let i=0; i < response.data.propertiesImages[1].length; i++){
                      this.room_id[i]=response.data.propertiesImages[1][i].id
                      this.form.room_name[i]=response.data.propertiesImages[1][i].name
                      let images = response.data.propertiesImages[1][i].images;
                      this.url=[]
                      for(let k=0; k < images.length; k++){
                        this.url.push(images[k].name)
                      }
                      this.form.room_name_image[i]=this.url
                    }
                  }
                  if(response.data.propertiesImages[2]){
                    for(let i=0; i < response.data.propertiesImages[2].length; i++){
                      this.living_id[i]=response.data.propertiesImages[2][i].id
                      this.form.living_name[i]=response.data.propertiesImages[2][i].name
                      let images = response.data.propertiesImages[2][i].images;
                      this.l_url=[]
                      for(let k=0; k < images.length; k++){
                        this.l_url.push(images[k].name)
                      }
                      this.form.living_name_image[i]=this.l_url
                    }
                  }
                  if(response.data.propertiesImages[3]){
                    for(let i=0; i < response.data.propertiesImages[3].length; i++){
                      this.kitchen_id[i]=response.data.propertiesImages[3][i].id
                      this.form.kitchen_name[i]=response.data.propertiesImages[3][i].name
                      let images = response.data.propertiesImages[3][i].images;
                      this.k_url=[]
                      for(let k=0; k < images.length; k++){
                        this.k_url.push(images[k].name)
                      }
                      this.form.kitchen_name_image[i]=this.k_url
                    }
                  }
                  if(response.data.propertiesImages[4]){
                    for(let i=0; i < response.data.propertiesImages[4].length; i++){
                      this.bathroom_id[i]=response.data.propertiesImages[4][i].id
                      this.form.bathroom_name[i]=response.data.propertiesImages[4][i].name
                      let images = response.data.propertiesImages[4][i].images;
                      this.b_url=[]
                      for(let k=0; k < images.length; k++){
                        this.b_url.push(images[k].name)
                      }
                      this.form.bathroom_name_image[i]=this.b_url
                    }
                  }
                  if(response.data.propertiesImages[5]){
                    for(let i=0; i < response.data.propertiesImages[5].length; i++){
                      let images = response.data.propertiesImages[5][i].images;
                      this.front_url=[]
                      for(let k=0; k < images.length; k++){
                        this.front_url.push(images[k].name)
                      }
                      this.form.front_image[i]=this.front_url
                    }
                  }
                  if(response.data.propertiesImages[6]){
                    for(let i=0; i < response.data.propertiesImages[6].length; i++){
                      let images = response.data.propertiesImages[6][i].images;
                      this.rear_url=[]
                      for(let k=0; k < images.length; k++){
                        this.rear_url.push(images[k].name)
                      }
                      this.form.rear_image[i]=this.rear_url
                    }
                  }
                  this.loadImage = true;
                }else{
                  this.$router.push({name: 'AddNewRoom', params: {'id': id}});
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
        this.loading=true;
        if(this.propertyDetails.rear_garden){
          this.form.rear = ['Rear garden']
        }
        if(this.propertyDetails.front_garden){
          this.form.front = ['Front garden']
        }
       
        axios.post(process.env.VUE_APP_API_URL+'update-property-image', this.form, {
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
                message: '<span>'+response.data.message+'</span>',
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
              })
              this.$router.push({name: 'PropertyList'});
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
            if(error.response.status==422){
              const message = error.response.data.errors
              let text = 'Something went wrong';
              if(message.bathroom_name){
                text = message.bathroom_name[0]
              }
              if(message.front_image){
                text = message.front_image[0]
              }
              if(message.kitchen_name){
                text = message.kitchen_name[0]
              }
              if(message.living_name){
                text = message.living_name[0]
              }
              if(message.rear_image){
                text = message.rear_image[0]
              }
              if(message.front_image){
                text = message.front_image[0]
              }
             
              this.$notifications.notify(
              {
                message: `<span>`+text+`</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            }else{
 
              this.$notifications.notify(
              {
                message: `<span>`+text+`</span>`,
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
      deleteImage(id){
        this.loading=true
        axios.get(process.env.VUE_APP_API_URL+'delete-property-room/'+id,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          }
        })
        .then(response => {
          if(response.status){
            this.$router.go(this.$router.currentRoute)
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
        }).finally( () => {
          this.loading=true
        })
      }
    }
  }

</script>
<style>
.square {
    width: 120px;
    height: 110px;
}
.square img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 10px;
}
</style>
