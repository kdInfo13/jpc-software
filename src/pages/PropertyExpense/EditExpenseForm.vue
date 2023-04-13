<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Property Expense</h4>
            <form v-if="!loading">
              <div class="row">
                <div class="col-md-4">
                  <label>Select Type</label>
                  <select class="form-control" v-model="form.type">
                    <option value="1">Property name 1</option>
                  </select>
                  <div v-if="isSubmitted && $v.form.type.$error" class="invalid-feedback">
                    <span v-if="!$v.form.type.required">Select type.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="type"
                            label="Name"
                            placeholder="Name"
                            v-model="form.name">
                  </base-input>
                    <div v-if="isSubmitted && $v.form.name.$error" class="invalid-feedback">
                      <span v-if="!$v.form.name.required">Name field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <label>who is paying</label>
                  <select v-model="form.who_is_paying" class="form-control">
                    <option value="1">Tenant</option>
                  </select>
                    <div v-if="isSubmitted && $v.form.who_is_paying.$error" class="invalid-feedback">
                      <span v-if="!$v.form.who_is_paying.required">who is paying field is required.</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input type="number"
                  label="Amount"
                  placeholder="Amount"
                  v-model="form.amount"
                  ></base-input>
                  <div v-if="isSubmitted && $v.form.amount.$error" class="invalid-feedback">
                      <span v-if="!$v.form.amount.required">amount field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="date"
                  label="Payment date"
                  placeholder="Payment date"
                  v-model="form.payment_date"
                  ></base-input>
                  <div v-if="isSubmitted && $v.form.payment_date.$error" class="invalid-feedback">
                      <span v-if="!$v.form.payment_date.required">payment date field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                  label="invoice"
                  placeholder="invoice"
                  v-model="form.invoice"
                  ></base-input>
                  <div v-if="isSubmitted && $v.form.invoice.$error" class="invalid-feedback">
                      <span v-if="!$v.form.invoice.required">invoice field is required.</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Remarks</label>
                  <textarea v-model="form.remarks" class="form-control"></textarea>
                  <div v-if="isSubmitted && $v.form.remarks.$error" class="invalid-feedback">
                      <span v-if="!$v.form.remarks.required">remarks field is required.</span>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProfile">
                  Save
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
            <ajax-loader v-if="loading"></ajax-loader>
          </card>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import {
      required,
      email,
  } from "vuelidate/lib/validators";
import Card from 'src/components/Cards/Card.vue'
import BaseInput from '../../components/Inputs/BaseInput.vue';
import AjaxLoader from '../../AjaxLoader.vue';
import axios from "axios";

export default {
  components: {
    Card,
    BaseInput,
    AjaxLoader
  },
  data () {
    return {
      form: {
        property_id: '',
        type: '',
        name: '',
        who_is_paying: '',
        amount: '',
        payment_date: '',
        invoice:'',
        remarks:''
      },
      isSubmitted: false,
      loading:false
    }
  },
  validations: {
    form: {
      type:{required},
      name: {required},
      who_is_paying:{required},
      amount:{required},
      payment_date:{required},
      invoice:{required},
      remarks:{required},
    }
  },
  mounted() {
    this._getExpens(this.$route.params.id);
  },
  methods: {
    _getExpens(id){
      this.loading = true;
      axios.get(process.env.VUE_APP_API_URL+'expense/'+id+'/edit', { 
        headers: {
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
        }
      }).then((response) => {
        if(response.status==200 && response.data.expenseDetails){
          this.form.property_id = response.data.expenseDetails.property_id
          this.form.type = response.data.expenseDetails.type
          this.form.name = response.data.expenseDetails.name
          this.form.who_is_paying = response.data.expenseDetails.who_is_paying
          this.form.amount = response.data.expenseDetails.amount
          this.form.invoice = response.data.expenseDetails.invoice
          this.form.remarks = response.data.expenseDetails.remarks
          this.form.id = response.data.expenseDetails.id
          this.form.payment_date = response.data.expenseDetails.payment_date

        }
        this.loading=false;
      }).catch( (error) => {

      })
    },
    saveProfile () {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }
      this.form.property_id = this.$route.params.id
      this.loading=true;
      axios.post(process.env.VUE_APP_API_URL+'expense/update', this.form, {
        headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
        },
        })
        .then(response => {
          this.loading=false;
          this.isSubmitted=false;
          console.log(response)
          if(response.status == 200 && response.data){
            this.$notifications.notify(
            {
              message: '<span>Record updated successfully</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
            this.$router.push({name: 'PropertyExpense'});
          }else{
            this.$notifications.notify(
            {
              message: '<span>'+response.data.error_message+'</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          }
       
        })
        .catch(error => {
          if(error.response.status == 422){
            this.$notifications.notify(
            {
              message: `<span>`+error.response.data.message+`</span>`,
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          }else{
            this.$notifications.notify(
            {
              message: `<span>Something went wrong.</span>`,
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          }
            this.isSubmitted=false;
            this.loading=false;
        }).finally( () => {
            this.isSubmitted = false
            this.loading=false;
        })
    }
  }
}

</script>
<style>

</style>
