<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6">
             
            </div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/add-user">Add New</router-link></div>
          </div>
          <div class="table-responsive" v-if="!loading && currentuser">
              <tabs>
                  <tab name="Admin List" class="active" v-if="currentuser.role_id==1">
                    <table class="table">
                      <thead>
                        <slot name="columns">
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in tableData.admins" :key="index">
                        <slot :row="item">
                          <td>{{index+1}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.email}}</td>
                          <td>Admin</td>
                          <td>
                            <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-user/'+ item.id}">Edit</router-link>
                            <button type="submit" class="btn btn-danger p-1 ml-2" @click.prevent="deleteProfile(item.id, index, 'admin')">
                              Delete
                            </button>
                            
                          </td>
                        </slot>
                      </tr>
                      </tbody>
                  </table>
                  </tab>

                  <tab name="Manager List" v-if="currentuser || currentuser.role_id==1 || currentuser.role_id==2">
                    <table class="table">
                      <thead>
                        <slot name="columns">
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in tableData.managers" :key="index">
                        <slot :row="item">
                          <td>{{index+1}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.email}}</td>
                          <td>Manager</td>
                          <td>
                            <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-user/'+ item.id}">Edit</router-link>
                            <button type="submit" class="btn btn-danger p-1 ml-2" @click.prevent="deleteProfile(item.id, index,'manager')">
                              Delete
                            </button>
                            
                          </td>
                        </slot>
                      </tr>
                      </tbody>
                  </table>
                  </tab>
              </tabs>
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
        currentuser:'',
        loading: false,
        managertable:false,
        admintable:false,
        tableData : []
      }
    },
    mounted() {
      this._getUser()
      this.currentuser = JSON.parse(localStorage.getItem('user'))
    },
    methods: {
      _getUser(){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'user-list',{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.data){
                  if(response.data.data.admins){
                    this.admintable=true
                  }
                  this.tableData = response.data.data
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
      deleteProfile (id, index, role) {
        if(confirm("Do you really want to delete?")){
          axios.delete(process.env.VUE_APP_API_URL+'user/'+id, {
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
                if(role=='admin'){
                  this.tableData.admins.splice(index, 1);
                }
                if(role=='manager'){
                  this.tableData.managers.splice(index, 1);
                }
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
ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}
li.tabs-component-tab {
    padding: 5px;
}
li.tabs-component-tab a{
  color:#191818
}
li.tabs-component-tab.is-active a{
  color:#1DC7EA
}
</style>
