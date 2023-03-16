<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add Property Amenities</h4>
              <form>
                <div>
                  <div class="row">
                    <div class="mx-auto col-md-12">
                      <h5>{{propertyDetails.bed_room}} Bed Rooms</h5>
                        <div class="row" v-for="index in parseInt(propertyDetails.bed_room)" :key="index">
                          <div class="col-md-4">
                            <base-input type="text"
                              label="Room Name"
                              placeholder="Room Name"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-4">
                            <base-input type="text"
                              label="Room Rent Amount"
                              placeholder="Room Rent Amount"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-4">
                            <label>Bed Room Image</label>
                            <vue-upload-multiple-image
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            :data-images="user.property_images"
                            idUpload="myIdUpload"
                            :maxImage=5
                            accept="image/gif,image/jpeg,image/png,image/bmp,image/jpg"
                            editUpload="myIdEdit"
                            dragText="Drop here"
                            browseText="Upload images"
                            primaryText="File name"
                            markIsPrimaryText="File Name"
                            ></vue-upload-multiple-image>
                          </div>
                        </div>
                    </div>

                    <div class="mx-auto col-md-12">
                      <h5>{{propertyDetails.living_room}} Living Rooms</h5>
                        <div class="row" v-for="index in parseInt(propertyDetails.living_room)" :key="index">
                          <div class="col-md-4">
                            <base-input type="text"
                              label="Living Name"
                              placeholder="Living Name"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-4">
                            <base-input type="text"
                              label="Living Rent Amount"
                              placeholder="Living Rent Amount"
                              >
                            </base-input>
                          </div>
                          <div class="col-md-4">
                            <label>Bed Room Image</label>
                            <vue-upload-multiple-image
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            :data-images="user.property_images"
                            idUpload="myIdUpload"
                            :maxImage=5
                            accept="image/gif,image/jpeg,image/png,image/bmp,image/jpg"
                            editUpload="myIdEdit"
                            dragText="Drop here"
                            browseText="Upload images"
                            primaryText="File name"
                            markIsPrimaryText="File Name"
                            ></vue-upload-multiple-image>
                          </div>
                        </div>
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
import {
      required,
      email,
  } from "vuelidate/lib/validators";
import Card from 'src/components/Cards/Card.vue'
import AmenitiesImage from 'src/components/AmenitiesImage.vue'
import BaseCheckbox from '../../components/Inputs/BaseCheckbox.vue'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import BaseRadio from '../../components/Inputs/BaseRadio.vue'
import BaseInput from '../../components/Inputs/BaseInput.vue';

  export default {
    components: {
      Card,
      BaseCheckbox,
      VueUploadMultipleImage,
      AmenitiesImage,
      BaseRadio,
        BaseInput
    },
    data () {
      return {
        showFrontGarden: false,
        showBackGarden: false,
        isSubmitted:false,
        propertyDetails:[],
        user: {
          propertyName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          property_images:[],
          bed_room:0,
          living_room:0,
          kitchen:0,
          bathroom: 0,
          front_garden:0,
          back_garden:0,
          room_name:0,
        }
      }
    },
    validations: {
      user: {
        propertyName:{required},
        address: {required},
        city:{required},
        state:{required},
        property_images:{required},
        bed_room:{required},
        living_room:{required},
        kitchen:{required},
        bathroom:{required},
        front_garden:{required},
        back_garden:{required},
        room_name:{required},
        postalCode:{required},
        bed_rooms:{required}
      }
    },
    methods: {
      async getProperty() {
        const propertyDetails = localStorage.getItem('property')
        this.propertyDetails = JSON.parse(propertyDetails)
      },
      uploadImageSuccess(formData, index, fileList) {
        console.log('data', formData, index, fileList)
      },
      beforeRemove (index, done, fileList) {
        console.log('index', index, fileList)
        var r = confirm("remove image")
        if (r == true) {
          done()
        } else {
        }
      },
      editImage (formData, index, fileList) {
        console.log('edit data', formData, index, fileList)
      },
      showImageBox(){
        if(this.user.front_garden){
          this.showFrontGarden = true
        }else{
          this.showFrontGarden = false
        }
      },
      showImageBoxBack(){
        if(this.user.back_garden){
          this.showBackGarden = true
        }else{
          this.showBackGarden = false
        }
      },
      saveProperty () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
          alert('Your data: ' + JSON.stringify(this.user))
          localStorage.setItem('property', JSON.stringify(this.user))
      }
    },
    created() {
      this.getProperty();
    },
  }

</script>
<style>

</style>
