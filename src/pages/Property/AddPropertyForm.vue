<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New Property</h4>
              <form>
                <div v-if="!nextopen">
                  <div class="row">
                    <div class="col-md-4">
                      <base-input type="text"
                                label="Property Name"
                                placeholder="Property Name"
                                v-model="user.propertyName">
                      </base-input>
                    </div>
                    <div class="col-md-8">
                      <base-input type="text"
                                label="Address"
                                placeholder="Property Address"
                                v-model="user.address">
                      </base-input>
                    </div>
                  </div>
    
                  <div class="row">
                    <div class="col-md-4">
                      <base-input type="text"
                                label="City"
                                placeholder="City"
                                v-model="user.city">
                      </base-input>
                    </div>
                    <div class="col-md-4">
                      <base-input type="text"
                                label="State"
                                placeholder="State"
                                v-model="user.state">
                      </base-input>
                    </div>
                    <div class="col-md-4">
                      <base-input type="number"
                                label="Postal Code"
                                placeholder="ZIP Code"
                                v-model="user.postalCode">
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <label>Property Images</label>
                    </div>
                    <div class="col-md-12">
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

                  <div class="row">
                    <div class="col-md-12">
                      <label>Property Amenities</label>
                    </div>
                    <div class="col-md-3">
                      <base-input typep="text"
                      label="No. of Bedrooms"
                      placeholder="No. of Bedrooms"
                      v-model="user.bed_rooms" >
                      </base-input>
                    </div>
                    <div class="col-md-3">
                      <base-input typep="text"
                      label="No. of Livingroom"
                      placeholder="No. of Livingroom"
                      v-model="user.living_room" >
                      </base-input>
                    </div>
                    <div class="col-md-3">
                      <base-input typep="text"
                      label="No. of Kitchen"
                      placeholder="No. of Kitchen"
                      v-model="user.kitchen" >
                      </base-input>
                    </div>
                    <div class="col-md-3">
                      <base-input typep="text"
                      label="No. of Bathrooms"
                      placeholder="No. of Bathrooms"
                      v-model="user.bathroom" >
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <label>Front garden</label>
                      <div class=" d-flex">
                        <div class="form-check-radio">
                          <label class="form-check-label">
                            <input type="radio" id="yes" :value=1 v-model="user.front_garden" />
                            <span class="form-check-sign">Yes</span>
                          </label>
                        </div>
                        <div class="form-check-radio">
                          <label class="form-check-label">
                            <input type="radio" id="no" :value=0 v-model="user.front_garden" />
                            <span class="form-check-sign">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label>Back garden</label>
                      <div class=" d-flex">
                        <div class="form-check-radio">
                          <label class="form-check-label">
                            <input type="radio" id="back_yes" :value=1 v-model="user.back_garden" />
                            <span class="form-check-sign">Yes</span>
                          </label>
                        </div>
                        <div class="form-check-radio">
                          <label class="form-check-label">
                            <input type="radio" id="back_no" :value=0 v-model="user.back_garden" />
                            <span class="form-check-sign">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="nextopen">
                  <div class="row">
                    <div class="col-md-12">
                      <amenities-image :name="user.room_images" :input-name=user.room_name id="room_image" :number-room=user.bed_room :maximage=5></amenities-image>
                    </div>
                  </div>
                </div>
                <div class="row mt-4" v-if="!nextopen">
                  <div class="col-md-12">
                    <button type="button" class="btn bnt-info btn-fill float-right" @click.prevent="nextOpen">Next</button>
                  </div>
                </div>

                <div class="row mt-4" v-if="nextopen">
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-info" @click.prevent="nextBack">
                      Back
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProfile">
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
import Card from 'src/components/Cards/Card.vue'
import AmenitiesImage from 'src/components/AmenitiesImage.vue'
import BaseCheckbox from '../../components/Inputs/BaseCheckbox.vue'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import BaseRadio from '../../components/Inputs/BaseRadio.vue'

  export default {
    components: {
      Card,
      BaseCheckbox,
      VueUploadMultipleImage,
      AmenitiesImage,
      BaseRadio
    },
    data () {
      return {
        nextopen:false,
        user: {
          propertyName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          property_images:[],
          room_images:[],
          bed_room:5,
          living_room:'',
          kitchen:'',
          bathroom: '',
          front_garden:0,
          back_garden:0,
          room_name:'',
        }
      }
    },
    methods: {
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
    nextOpen() {
      this.nextopen=true;
    },
    nextBack() {
      this.nextopen=false;
    },
    saveProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
