<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Complaints List</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/new-trade">Add New</router-link></div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>S.No</th>
                        <th>Tenant Name</th>
                        <th>Property</th>
                        <th>Description</th>
                        <th>Remarks</th>
                        <th>Prority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{index+1}}</td>
                      <td>{{item.tenant.name}}</td>
                      <td>{{item.property.name}} - {{ item.room.name }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.remarks }}</td>
                      <td>
                        <span v-if="item.prority==1">High</span>
                        <span v-if="item.prority==2">Medium</span>
                        <span v-if="item.prority==3">Low</span>
                      </td>
                      <td>
                        <span v-if="item.status==1">Open</span>
                        <span v-if="item.status==2">Closed</span>
                      </td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/view-complaint/'+ item.id}">View</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" v-on:click="deleteProfile(item.id, index)">
                          Delete
                        </button>
                        
                      </td>
                    </slot>
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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import AjaxLoader from '../../AjaxLoader.vue';
  import axios from "axios";

  export default {
    components: {
      LTable,
      Card,
      AjaxLoader
    },
    data () {
      return {
        tableData : [],
        loading: false
      }
    },
    mounted (){
        this._getTraders()
    },
    methods: {
      _getTraders(){
        this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'complaints',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.complaints){
                  this.tableData = response.data.complaints
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
      deleteProfile (id, index) {
        if(confirm("Do you really want to delete?")){
          axios.delete(process.env.VUE_APP_API_URL+'trade-person/'+id, {
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
      },
    }
  }
</script>
<style>
</style>
