<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Complaints</h4>
            <form>
              <div class="col-md-4">
                <label>Select Complaint Proritie</label>
                <select class="form-control" v-model="user.prority">
                <option v-for="(item, i) in prorities" :key="i" :value="i">{{ item }}</option>
                </select>
                <div v-if="isSubmitted && $v.user.prority.$error" class="invalid-feedback">
                  <span v-if="!$v.user.prority.required">prority field is required.</span>
                </div>
              </div>
              <div class="col-md-12">
                <label>Enter description</label>
                <textarea class="form-control" v-model="user.description"></textarea>
                <div v-if="isSubmitted && $v.user.description.$error" class="invalid-feedback">
                  <span v-if="!$v.user.description.required">description field is required.</span>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right mt-3" @click.prevent="saveProfile">
                  Save
                </button>
                <ajax-loader v-if="loading"></ajax-loader>
              </div>
              <div class="clearfix"></div>
            </form>
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
import AjaxLoader from '../../AjaxLoader.vue';
import axios from "axios";

export default {
  components: {
    Card,
    AjaxLoader
  },
  data () {
    return {
      prorities:'',
      permissions:'',
      currentUser:'',
      user: {
        prority: '',
        description: '',
      },
      isSubmitted: false,
      loading: false
    }
  },
  validations: {
    user: {
      prority:{required},
      description:{required},
    }
  },
  mounted(){
   this._getProrities();
   this._getComplaint(this.$route.params.id)
  },
  methods: {
    _getProrities(){
        this.loading=true;
        axios.get(process.env.VUE_APP_API_URL+'complaint-prorities',{
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          }
        })
        .then(response => {
            if(response.status==200 && response.data.prorities){
              this.prorities = response.data.prorities
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
    _getComplaint(id){
        this.loading=true;
        axios.get(process.env.VUE_APP_API_URL+'complaint-prorities',{
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          }
        })
        .then(response => {
            if(response.status==200 && response.data.prorities){
              this.prorities = response.data.prorities
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
    saveProfile () {
      
      this.isSubmitted = true;
      this.adminerror=false;
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }

      this.loading=true;
      axios.post(process.env.VUE_APP_API_URL+'raise-complaint', this.user, {
          headers: {
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
          })
          .then(response => {
            this.loading=false;
            this.isSubmitted=false;
            if(response.status == 200 && response.data){
              this.$notifications.notify(
              {
                message: '<span>complaint raised successfully</span>',
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
              })
              this.$router.push({name: 'TenantComplaints'});
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
