<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <div class="row">
              <div class="col-6"><h4 class="card-title">Maintenance Videos</h4></div>
              <div class="col-6">
                <router-link class="d-flex justify-content-end" :to="{ path: '/admin/add-maintenance/'+ id}">Maintenance</router-link>
              </div>
            </div>
            <form>
              <div class="row">
              <div class="col-md-4">
                <label>Select Lable</label>
                <select class="form-control">
                  <option>Select Label</option>
                </select>
              </div>
              <div class="col-md-8">
                <label>Short Descriptions</label>
                <textarea class="form-control"></textarea>
              </div>
              <div class="col-md-12">
                <label>rear garden Images</label><br>
                  <div class="dropbox">
                    <input type="file" multiple  @change="onFileChange" class="input-file">
                      <p>
                        Drag your file(s) here to begin<br> or click to browse
                      </p>
                      <div class="row">
                        
                      </div> 
                  </div>
              </div>
            </div>
            </form>
            <div class="row">
              <div class="col-md-6">
                <h4>Category</h4>
                <p>Small descriptions</p>
                <video
                :key="video"
                    width="450"
                    controls
                  >
                    <source
                      :src="video"
                      type="video/mp4"
                    >
                  </video>
              </div>
              <div class="col-md-6">
                <h4>Category</h4>
                <p>Small descriptions</p>
                  <video
                      :key="video"
                      width="450"
                      controls
                    >
                      <source
                        :src="video"
                        type="video/mp4"
                      >
                    </video>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        video:'',
        id:'',
        imagePath:'',
        tableData : [],
        loading: false
      }
    },
    mounted (){
      this.id=this.$route.params.id
      this.imagePath = process.env.VUE_APP_IMAGE
    },
    methods: {
      onFileChange(event){
        event.preventDefault();
          let currentObj = this;
          const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }
          let formData = new FormData();
          this.fileName = event.target.files[0].name;
          formData.append('path', 'garden');
          formData.append('key', 'id_proof');
          this.loadingRear = true
          axios.post(process.env.VUE_APP_API_URL+'upload_multiple_image', formData, config)
          .then(function (response) {
              if(response.data.status){
              
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
    }
  }
</script>
<style>
span.delete {
    cursor: pointer;
}
</style>
