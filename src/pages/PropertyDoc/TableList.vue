<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Property Document List</h4></div>
            <div class="col-6">
              <router-link class="d-flex justify-content-end" :to="{ path: '/admin/add-doc/'+ id}">Add New</router-link>
            </div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>S.No</th>
                        <th>Type</th>
                        <th>Care Taker Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Path</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{index+1}}</td>
                      <td>
                        <p v-for="(index, i) in propertyType" :key="index">
                          <span v-if="i==item.type">{{ index }}</span>
                        </p>
                      </td>
                      <td>{{item.care_taker_name}}</td>
                      <td>{{item.start_date}}</td>
                      <td>{{item.end_date}}</td>
                      <td><div class="sequre"> <img :src='imagePath+item.name'></div></td>
                      <td>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/edit-doc/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" v-on:click="deleteDoc(item.id, index)">
                          Delete
                        </button>
                        
                      </td>
                    </slot>
                  </tr>
                  <tr v-if="this.tableData.length == 0">
                    <td>No data found</td>
                  </tr>
                  </tbody>
                </table>
                <ajax-loader v-if="loading"></ajax-loader>
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
  import AjaxLoader from '../../AjaxLoader.vue';
  export default {
    components: {
      LTable,
      Card,
      AjaxLoader
    },
    data () {
      return {
        propertyType:'',
        imagePath:'',
        tableData : [],
        id: '',
        loading: false
      }
    },
    mounted (){
      this.imagePath = process.env.VUE_APP_IMAGE
      this.id = this.$route.params.id
      this._getProperties(this.$route.params.id);
      this._getType()
    },
    methods: {
      _getType(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'document-types',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.documentTypes){
                this.propertyType = response.data.documentTypes
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
      _getProperties(id){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'document-list/'+id,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.documentList){
                  this.tableData = response.data.documentList
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
      deleteDoc (id, index) {
        if(confirm("Do you really want to delete?")){
          axios.delete(process.env.VUE_APP_API_URL+'document/'+id, {
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
                this.tableData.splice(index, 1);
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
.sequre {
    width: 100px;
    height: 100px;
}
.sequre img{
  width: 100%;
    height: 100%;
}
</style>
