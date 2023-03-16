<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
          <div class="row">
            <div class="col-6"><h4 class="card-title">Property Expense List</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/new-property-expense">Add New</router-link></div>
          </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr>
                        <th>ID</th>
                        <th>Property Name</th>
                        <th>Expense Type</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <slot :row="item">
                      <td>{{item.id}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.type}}</td>
                      <td>${{item.amount}}</td>
                      <td>{{item.date}}</td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-property-expense/'+ item.id}">Edit</router-link>
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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        tableData : [{
          id: 1,
          name: 'Dakota Rice',
          type: 'council tax',
          date: '12-12-2023',
          amount: '100'
        }]
      }
    },
    methods: {
      deleteProfile () {
        alert('delete tenant')
      }
    }
  }
</script>
<style>
</style>
