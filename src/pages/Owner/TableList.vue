<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Owner / Investors List</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/new-owner">Add New</router-link></div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Doc Link</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{index+1}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.phone_no}}</td>
                      <td>
                        <span v-if="item.typer_of_owner==1">Landlord</span>
                        <span v-if="item.typer_of_owner==2">Investor</span>
                      </td>
                      <td>{{item.door_no}} {{item.street}} {{item.area}}, {{item.postcode}}</td>
                      <td>
                        <a v-if="item.id_proof" :href="imagePath+item.id_proof" target="_blank">Click Here</a>
                        <span v-else>N/A</span>
                      </td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-owner/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" v-on:click="deleteProfile(item.id, index)">
                          Delete
                        </button>
                      </td>
                    </slot>
                  </tr>
                  <tr v-for="(item, index) in tableInvestor" :key="index+tableData.length">
                    <slot :row="item">
                      <td>{{index+1+tableData.length}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.email}}</td>
                      <td>{{item.phone_no}}</td>
                      <td>
                        <span v-if="item.typer_of_owner==1">Landlord</span>
                        <span v-if="item.typer_of_owner==2">Investor</span>
                      </td>
                      <td>{{item.door_no}} {{item.street}} {{item.area}}, {{item.postcode}}</td>
                      <td>
                        <a v-if="item.id_proof" :href="imagePath+item.id_proof" target="_blank">Click Here</a>
                        <span v-else>N/A</span>
                      </td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-owner/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" v-on:click="deleteProfile(item.id, index+tableData.length)">
                          Delete
                        </button>
                      </td>
                    </slot>
                  </tr>
                  <tr v-if="tableData.length==0">
                    <td v-if="!loading">No record found.</td>
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
        imagePath:'',
        tableData : [],
        tableInvestor:[],
        loading: false
      }
    },
    mounted (){
      this.imagePath = process.env.VUE_APP_IMAGE
      this._getBusinesses()
    },
    methods: {
      deleteProfile (id, index) {
        if(confirm("Do you really want to delete?")){
          axios.delete(process.env.VUE_APP_API_URL+'owner/'+id, {
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
      _getBusinesses(){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'owners',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.owners){
                  this.tableInvestor = response.data.investor
                  this.tableData = response.data.owners

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
    },
  }
</script>
<style>
</style>
