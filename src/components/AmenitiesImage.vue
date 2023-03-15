<template>
  <div class="row">
    <div class="col-md-4">
      <base-input type="text"
      label="Room Name"
      placeholder="Room Name"
      :v-model="inputname"
      ></base-input>
    </div>
    <div class="col-md-8">
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      :data-images="name"
      :idUpload=id
      :maxImage=maximage
      accept="image/gif,image/jpeg,image/png,image/bmp,image/jpg"
      editUpload="myIdEdit"
      dragText="Drop here"
      browseText="Upload images"
      primaryText="File name"
      markIsPrimaryText="File Name"
      ></vue-upload-multiple-image>
    </div>
  </div>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import BaseInput from './Inputs/BaseInput.vue';

export default {
  name: "AmenitiesImage",
  components: {
      VueUploadMultipleImage,
      BaseInput,
  },
  props: {
    name:Array,
    id:String,
    maximage:Number,
    inputname:Array,
    numberroom:Number
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
  }
};
</script>