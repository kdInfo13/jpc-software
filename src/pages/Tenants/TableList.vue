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
                        <th>Address</th>
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
                      <td>{{item.name}}</td>
                      <td>{{item.property}}</td>
                      <td>{{item.address}}</td>
                      <td>{{item.rent_date}}</td>
                      <td>{{item.rent_amount}}</td>
                      <td>
                        <router-link class="btn btn-info p-2" :to="{ path: '/admin/edit-tenant/'+ item.id}">Edit</router-link>
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
          rent_date: '10-12-2023',
          rent_amount: '30.99',
          property: 'Niger',
          address: 'Oud-Turnhout'
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
