<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Properties</h4></div>
            <div class="col-6">
              <router-link class="d-flex justify-content-end" to="/admin/new-property">Add New</router-link>
            </div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>S.No</th>
                        <th>Property Name</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{index+1}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.door_no}} {{item.street}} {{item.area}} {{item.county}} {{item.postcode}} </td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/add-cash/'+ item.id + '/'+ 'property'}">Add Cash</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/property-image/'+ item.id}">Images</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/doc-list/'+ item.id}">Document</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/property-expense/'+ item.id}">Expense</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/property-view/'+ item.id}">View</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/maintenance/'+ item.id}">Maintenance</router-link>
                        <router-link class="btn btn-info p-2 ml-2" :to="{ path: '/admin/edit-property/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" @click.prevent="deleteProfile">
                          Delete
                        </button>
                        
                      </td>
                    </slot>
                  </tr>
                  </tbody>
                </table>
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
        tableData : [],
        loading: false
      }
    },
    mounted (){
      this._getProperties();
    },
    methods: {
      _getProperties(){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'properties',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.properties){
                  this.tableData = response.data.properties
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
      deleteProfile () {
        alert('delete tenant')
      }
    }
  }
</script>
<style>
</style>
