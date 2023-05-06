<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
          <div class="row">
            <div class="col-6"><h4 class="card-title">View Complaint</h4></div>
            <div class="col-6"><router-link class="d-flex justify-content-end" to="/admin/new-trade">Add New</router-link></div>
          </div>
              <form>
                <div class="col-md-4">
                  <label>Select Status</label>
                  <select class="form-control" v-model="form.status">
                    <option>Select Status</option>
                    <option value="1">Open</option>
                    <option value="2">Closed</option>
                  </select>
                  <div v-if="isSubmitted && $v.form.status.$error" class="invalid-feedback">
                      <span v-if="!$v.form.status.required">status field is required.</span>
                  </div>
                </div>
                <div class="col-md-12">
                  <label>Add Remarks</label>
                  <textarea class="form-control" v-model="form.remarks"></textarea>
                  <div v-if="isSubmitted && $v.form.remarks.$error" class="invalid-feedback">
                      <span v-if="!$v.form.remarks.required">remarks field is required.</span>
                  </div>
                </div>
                <div class="col-md-12">
                  <button class="btn btn-fill btn-info pull-right" type="submit" @click.prevent="saveProfile">Update</button>
                </div>
              </form>
                <ajax-loader v-if="loading"></ajax-loader>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from "vuelidate/lib/validators";
  import AjaxLoader from '../../AjaxLoader.vue';
  import axios from "axios";

  export default {
    components: {
      AjaxLoader
    },
    data () {
      return {
        isSubmitted:false,
        form : {
          complaint_id:'',
          status:'',
          remarks:''
        },
        loading: false
      }
    },
    validations: {
      form: {
        complaint_id:{required},
        status: {required},
        remarks:{required}
      }
    },
    mounted(){
      this.form.complaint_id = this.$route.params.id;
    },
    methods: {
      saveProfile () {
        this.isSubmitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        this.loading=true;
        axios.post(process.env.VUE_APP_API_URL+'change-complaint-status', this.form, {
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
              message: '<span>Compaint updated successfully.</span>',
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
            this.$router.push({name: 'adminComplaints'});
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
