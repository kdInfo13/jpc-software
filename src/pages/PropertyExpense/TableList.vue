<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Property Expense List</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" :to="{ path: '/admin/new-property-expense/'+ property_id}">Add New</router-link></div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>S.no</th>
                        <th>Expense</th>
                        <th>Property Name</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{index+1}}</td>
                      <td>{{ item.name }}</td>
                      <td>{{item.property.name}}</td>
                      <td>${{item.amount}}</td>
                      <td> {{ item.created_at | formatDate }}</td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-property-expense/'+ item.id}">Edit</router-link>
                        <button type="submit" class="btn btn-danger p-1 ml-2" @click.prevent="deleteExpense(item.id, index)">
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
  import axios from "axios";
  import AjaxLoader from '../../AjaxLoader.vue';

  export default {
    components: {
      LTable,
      Card,
      AjaxLoader
    },
    data () {
      return {
        property_id:'',
        loading: false,
        tableData : []
      }
    },
    mounted(){
      this.property_id=this.$route.params.id
      this._getExpense(this.$route.params.id);
    },
    methods: {
      _getExpense(id){
        this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'expense-list/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.expense){
                this.tableData = response.data.expense
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
      deleteExpense (id, index) {
        if(confirm("Do you really want to delete?")){
          axios.delete(process.env.VUE_APP_API_URL+'expense/'+id, {
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
