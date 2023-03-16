<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Property</h4>
            <form>
              <div>
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Property Name"
                              placeholder="Property Name"
                              v-model="user.propertyName">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.propertyName.$error" class="invalid-feedback">
                      <span v-if="!$v.user.propertyName.required">Property name field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-8">
                    <base-input type="text"
                              label="Address"
                              placeholder="Property Address"
                              v-model="user.address">
                    </base-input>
                      <div v-if="isSubmitted && $v.user.address.$error" class="invalid-feedback">
                        <span v-if="!$v.user.address.required">Address field is required.</span>
                    </div>
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="City"
                              placeholder="City"
                              v-model="user.city">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.city.$error" class="invalid-feedback">
                        <span v-if="!$v.user.city.required">city field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="State"
                              placeholder="State"
                              v-model="user.state">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.state.$error" class="invalid-feedback">
                        <span v-if="!$v.user.state.required">state field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="number"
                              label="Postal Code"
                              placeholder="ZIP Code"
                              v-model="user.postalCode">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.postalCode.$error" class="invalid-feedback">
                        <span v-if="!$v.user.postalCode.required">Postal Code field is required.</span>
                    </div>
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
                      <div v-if="isSubmitted && $v.user.property_images.$error" class="invalid-feedback">
                          <span v-if="!$v.user.property_images.required">Minimum one image is required.</span>
                      </div>
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
                    v-model="user.bed_room" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.bed_room.$error" class="invalid-feedback">
                        <span v-if="!$v.user.bed_room.required">Bed room field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Livingroom"
                    placeholder="No. of Livingroom"
                    v-model="user.living_room" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.living_room.$error" class="invalid-feedback">
                        <span v-if="!$v.user.living_room.required">Living room field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Kitchen"
                    placeholder="No. of Kitchen"
                    v-model="user.kitchen" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.kitchen.$error" class="invalid-feedback">
                        <span v-if="!$v.user.kitchen.required">Kitchen field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Bathrooms"
                    placeholder="No. of Bathrooms"
                    v-model="user.bathroom" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.bathroom.$error" class="invalid-feedback">
                        <span v-if="!$v.user.bathroom.required">Bathroom field is required.</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Front garden</label>
                    <div class=" d-flex">
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="yes" :value=1 v-model="user.front_garden"  v-on:change="showImageBox" />
                          <span class="form-check-sign">Yes</span>
                        </label>
                      </div>
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="no" :value=0 v-model="user.front_garden" v-on:change="showImageBox" />
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
                          <input type="radio" id="back_yes" :value=1 v-model="user.back_garden" v-on:change="showImageBoxBack" />
                          <span class="form-check-sign">Yes</span>
                        </label>
                      </div>
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="back_no" :value=0 v-model="user.back_garden" v-on:change="showImageBoxBack" />
                          <span class="form-check-sign">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="showFrontGarden">
                    <label>Front Garden Image</label>
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
                  <div class="col-md-6" v-if="showBackGarden">
                    <label>Back Garden Image</label>
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
            
          

              <div class="row mt-4">
                <div class="col-md-12">
                  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProperty">
                    Save & Continuous
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
      showFrontGarden: false,
      showBackGarden: false,
      isSubmitted:false,
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
  }
}

</script>
<style>

</style>
