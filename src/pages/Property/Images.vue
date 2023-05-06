<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <div class="row" v-for="(index, i) in tableData" :key="i">
              <div class="col-md-12" v-for="(item, k) in index" :key="k">
                <div class="row"> 
                  <div class="col-md-12"><h2>{{ item.name }}</h2></div>
                  <div class="col-md-3" v-for="image in item.images" :key="image.id">
                    <img  :src="imagePath+image.name"  alt="" class="img-thumbnail">
                    <a :href="imagePath+image.name" class="text-success" target="_blank">View</a>
                    <span class="delete text-danger ml-4" v-on:click="deleteImage(image.id)">Delete</span>
                  </div>
                </div>
                <hr>
              </div>
              <hr>
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
        imagePath:'',
        tableData : [],
        loading: false
      }
    },
    mounted (){
      this.imagePath = process.env.VUE_APP_IMAGE
      this._getProperties(this.$route.params.id);
    },
    methods: {
      _getProperties(id){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'property-images/'+id,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.propertiesImages){
                  this.tableData = response.data.propertiesImages
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
      deleteImage (id) {
        if(confirm("Do you really want to delete?")){
          axios.get(process.env.VUE_APP_API_URL+'delete-image/'+id, {
          headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            },
          })
            .then(resp => {
              this.$notifications.notify(
                {
                  message: '<span>'+resp.data.message+'</span>',
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'success'
                })
                this._getProperties(this.$route.params.id);
            })
            .catch(error => {
              this.$notifications.notify(
                {
                  message: '<span>'+error+'</span>',
                  icon: 'nc-icon nc-bell-55',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'danger'
                })
            })
        }
      }
    }
  }
</script>
<style>
span.delete {
    cursor: pointer;
}
</style>
