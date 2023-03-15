<template>
  <div>
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
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
  name: "UploadImage",
  components: {
      VueUploadMultipleImage,
  },
  props: {
    name:Array,
    id:String,
    maximage:Number
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