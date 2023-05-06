<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <ajax-loader v-if="loading"></ajax-loader>
          <h4 slot="header" class="card-title">Add Cash Details</h4>
          <form>
            <div class="row">
              <div class="col-md-4">
                <label>Select room</label>
                <select class="form-control" v-model="form.room_id" @change="_getTenant($event)">
                  <option>Select Room</option>
                  <option v-for="(item, i) in rooms" :key="i" :value="item.id">{{ item.name }}</option>
                </select>
                <div v-if="isSubmitted && $v.form.room_id.$error" class="invalid-feedback">
                    <span v-if="!$v.form.room_id.required">Select room is required.</span>
                </div>
              </div>
              <div class="col-md-4">
                <base-input type="text"
                label="Tenant"
                :placeholder="tenant.name"
                :value="tenant.name"
                ></base-input>
                <div v-if="isSubmitted && $v.form.tanent_id.$error" class="invalid-feedback">
                    <span v-if="!$v.form.tanent_id.required">Select tenant is required.</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <base-input type="number"
                label="Enter Amount"
                placeholder="Enter Amount"
                v-model="form.amount"
                >
                </base-input>
                <div v-if="isSubmitted && $v.form.amount.$error" class="invalid-feedback">
                    <span v-if="!$v.form.amount.required">Amount field is required.</span>
                </div>
              </div>
              <div class="col-md-4">
                <base-input type="date"
                label="Cash Date"
                placeholder="Cash Date"
                v-model="form.date"
                >
                </base-input>
                <div v-if="isSubmitted && $v.form.date.$error" class="invalid-feedback">
                    <span v-if="!$v.form.date.required">Date field is required.</span>
                </div>
              </div>
              <div class="col-md-4">
                <base-input type="text"
                label="Receiver Name"
                placeholder="Receiver Name"
                v-model="form.given_to"
                >
                </base-input>
                <div v-if="isSubmitted && $v.form.given_to.$error" class="invalid-feedback">
                    <span v-if="!$v.form.given_to.required">given to field is required.</span>
                </div>
              </div>
              <div class="col-md-12">
                <button class="btn btn-info btn-fill float-right" type="submit" @click.prevent="saveCash">Save</button>
              </div>
            </div>
          </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import axios from "axios";
  import BaseInput from '../components/Inputs/BaseInput.vue';
  import AjaxLoader from 'src/AjaxLoader.vue';
  import { required} from "vuelidate/lib/validators";
  export default {
    components: {
        BaseInput,
        AjaxLoader
    },
    data () {
      return {
        type:'',
        tenant:'',
        rooms:'',
        loading:false,
        isSubmitted:false,
        form:{
          property_id:'',
          room_id:'',
          tanent_id:'',
          amount:'',
          date:'',
          given_to:''
        }
      }
    },
    validations: {
      form: {
        tanent_id:{required},
        property_id:{required},
        room_id: {required},
        amount:{required},
        date:{required},
        given_to:{required}
      }
    },
    mounted(){
      this.form.property_id = this.$route.params.id
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      this._getRoom(this.$route.params.id);
    },
    methods:{
      _getRoom(id){
        this.loading=true;
        axios.get(process.env.VUE_APP_API_URL+'roomlist/'+id,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          }
        })
        .then(response => {
            if(response.status==200 && response.data){
              this.rooms = response.data.data
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
      _getTenant(event){
        this.loading=true;
        axios.get(process.env.VUE_APP_API_URL+'tenant-from-room/'+event.target.value,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          }
        })
        .then(response => {
            if(response.status==200 && response){
              this.tenant = response.data.tenant
              this.form.tanent_id = response.data.tenant.id
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
      saveCash(){
        console.log(this.form)
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'add-cash-entry', this.form, {
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
              message: '<span>Cash added successfully.</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
            this.$router.back()
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
.card.card-stats {
    cursor: pointer;
}
.card.card-stats:hover {
    background: #00000008;
}
</style>
