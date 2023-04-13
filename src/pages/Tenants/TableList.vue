<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Tenants List</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/new-tenant">Add New</router-link></div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Propert Name</th>
                        <th>Rent Date</th>
                        <th>Rent Amount</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{item.id}}</td>
                      <td>{{item.tanent.name}}</td>
                      <td>{{item.property.name}}</td>
                      <td>{{item.rent_date}}</td>
                      <td>{{item.rent_amount}}</td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-tenant/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2"  v-on:click="deleteProfile(item.id, index)">
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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import axios from "axios";

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        tableData : []
      }
    },
    mounted(){
      this._getTenants();
    },
    methods: {
      _getTenants(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'tanent-list',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.tanents){
                this.tableData = response.data.tanents
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
          axios.delete(process.env.VUE_APP_API_URL+'tanent/'+id, {
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
</style>
