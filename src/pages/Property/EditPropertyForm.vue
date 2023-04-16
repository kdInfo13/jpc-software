<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <card>
        <div class="col-12">
            <h4 slot="header" class="card-title">Edit Property</h4>
            <form v-if="!loading">
              <div>
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Property Name"
                              placeholder="Property Name"
                              v-model="user.name">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.name.$error" class="invalid-feedback">
                      <span v-if="!$v.user.name.required">Property name field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Door Number"
                              placeholder="Door Number"
                              v-model="user.door_no">
                    </base-input>
                      <div v-if="isSubmitted && $v.user.door_no.$error" class="invalid-feedback">
                        <span v-if="!$v.user.door_no.required">Door no. field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Street"
                              placeholder="Street"
                              v-model="user.street">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.street.$error" class="invalid-feedback">
                        <span v-if="!$v.user.street.required">Street field is required.</span>
                    </div>
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="area"
                              placeholder="area"
                              v-model="user.area">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.area.$error" class="invalid-feedback">
                        <span v-if="!$v.user.area.required">area field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="county"
                              placeholder="county"
                              v-model="user.county">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.county.$error" class="invalid-feedback">
                        <span v-if="!$v.user.county.required">county field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Post Code"
                              placeholder="Post Code"
                              v-model="user.postcode">
                    </base-input>
                    <div v-if="isSubmitted && $v.user.postcode.$error" class="invalid-feedback">
                        <span v-if="!$v.user.postcode.required">Post Code field is required.</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Select Landlord</label>
                    <select v-model="user.landlord_id" class="form-control">
                      <option v-for="(owner, index) in ownerList" :key="index" :value="owner.id">{{ owner.name }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.landlord_id.$error" class="invalid-feedback">
                        <span v-if="!$v.user.landlord_id.required">Landlord field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>Select Investor</label>
                    <select v-model="user.investor_id" class="form-control">
                      <option v-for="(owner, index) in investorList" :key="index" :value="owner.id">{{ owner.name }}</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.investor_id.$error" class="invalid-feedback">
                        <span v-if="!$v.user.investor_id.required">Investorfield is required.</span>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-12">
                    <label>Property Amenities</label>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Bedrooms"
                    placeholder="No. of Bedrooms"
                    v-model="user.no_of_bedrooms" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.no_of_bedrooms.$error" class="invalid-feedback">
                        <span v-if="!$v.user.no_of_bedrooms.required">Bed room field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Livingroom"
                    placeholder="No. of Livingroom"
                    v-model="user.no_of_living_areas" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.no_of_living_areas.$error" class="invalid-feedback">
                        <span v-if="!$v.user.no_of_living_areas.required">Living room field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Kitchen"
                    placeholder="No. of Kitchen"
                    v-model="user.no_of_kitchens" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.no_of_kitchens.$error" class="invalid-feedback">
                        <span v-if="!$v.user.no_of_kitchens.required">Kitchen field is required.</span>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input typep="text"
                    label="No. of Bathrooms"
                    placeholder="No. of Bathrooms"
                    v-model="user.no_of_bathrooms" >
                    </base-input>
                    <div v-if="isSubmitted && $v.user.no_of_bathrooms.$error" class="invalid-feedback">
                        <span v-if="!$v.user.no_of_bathrooms.required">Bathroom field is required.</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Front garden</label>
                    <div class=" d-flex">
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="yes" :value=1 v-model="user.front_garden" />
                          <span class="form-check-sign">Yes</span>
                        </label>
                      </div>
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="no" :value=0 v-model="user.front_garden" />
                          <span class="form-check-sign">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>Back garden</label>
                    <div class=" d-flex">
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="back_yes" :value=1 v-model="user.rear_garden" />
                          <span class="form-check-sign">Yes</span>
                        </label>
                      </div>
                      <div class="form-check-radio">
                        <label class="form-check-label">
                          <input type="radio" id="back_no" :value=0 v-model="user.rear_garden" />
                          <span class="form-check-sign">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
               
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input
                  type="text"
                  label="Rent to landlord"
                  placeholder="Rent to landlord"
                  v-model="user.rent_to_landlord"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.rent_to_landlord.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_to_landlord.required">Rent to landlord field is required.</span>
                    </div>
                </div>
                <div class="col-md-4">
                  <base-input
                  type="date"
                  label="Rent start date to landlord"
                  placeholder="Rent start date to landlord"
                  v-model="user.rent_start_date_to_landlord"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.rent_start_date_to_landlord.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_start_date_to_landlord.required">Rent start date to landlord field is required.</span>
                    </div>
                </div>
                <div class="col-md-4">
                  <label>Rent date to landlord</label>
                  <select v-model="user.rent_date_to_landlord" class="form-control">
                  <option v-for="index in 31" :key="index" :value="k=index">{{ index }}</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.rent_date_to_landlord.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_date_to_landlord.required">Rent date to landlord field is required.</span>
                    </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input
                  type="text"
                  label="Rent to investor"
                  placeholder="Rent to investor"
                  v-model="user.rent_to_investor"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.rent_to_investor.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_to_investor.required">Rent to investor field is required.</span>
                    </div>
                </div>
                <div class="col-md-4">
                  <base-input
                  type="date"
                  label="Rent start date to investor"
                  placeholder="Rent start date to investor"
                  v-model="user.rent_start_date_to_investor"
                  ></base-input>
                  <div v-if="isSubmitted && $v.user.rent_start_date_to_investor.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_start_date_to_investor.required">Rent start date to investor field is required.</span>
                    </div>
                </div>
                <div class="col-md-4">
                  <label>Rent date to investor</label>
                  <select v-model="user.rent_date_to_investor" class="form-control">
                    <option v-for="index in 31" :key="index" :value="k=index">{{ index }}</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.rent_date_to_investor.$error" class="invalid-feedback">
                        <span v-if="!$v.user.rent_date_to_investor.required">Rent date to investor field is required.</span>
                    </div>
                </div>
              </div>
            
          

              <div class="row mt-4">
                <div class="col-md-12">
                  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProperty">
                    Update
                  </button>
                </div>
              </div>

              <div class="clearfix"></div>
            </form>
            <ajax-loader v-if="loading"></ajax-loader>

        </div>
      </card>
      </div>
    </div>
</div>
</template>
<style>
.image-container[data-v-10e59822]{
width: 100%;
}
</style>
<script>
import {
    required,
    email,
} from "vuelidate/lib/validators";
import Card from 'src/components/Cards/Card.vue'
import AmenitiesImage from 'src/components/AmenitiesImage.vue'
import BaseCheckbox from '../../components/Inputs/BaseCheckbox.vue'
import BaseRadio from '../../components/Inputs/BaseRadio.vue'
import BaseInput from '../../components/Inputs/BaseInput.vue';
import axios from "axios";
import AjaxLoader from '../../AjaxLoader.vue';

export default {
  components: {
    Card,
    BaseCheckbox,
    AmenitiesImage,
    BaseRadio,
      BaseInput,
      AjaxLoader
  },
  data () {
    return {
      showFrontGarden: false,
      showBackGarden: false,
      isSubmitted:false,
      loading: false,
      ownerList: '',
      investorList:'',
      user: {
        id:'',
        name: '',
        door_no: '',
        street: '',
        area: '',
        county: '',
        postcode: '',
        landlord_id: '',
        investor_id: '',
        no_of_bedrooms:0,
        no_of_living_areas:0,
        no_of_kitchens:0,
        no_of_bathrooms: 0,
        front_garden:0,
        rear_garden:0,
        rent_to_landlord: '',
        rent_start_date_to_landlord:'',
        rent_date_to_landlord: '',
        rent_to_investor: '',
        rent_start_date_inverent_to_investor:'',
        rent_date_to_investor: ''
      }
    }
  },
  validations: {
    user: {
      name:{required},
      door_no: {required},
      street:{required},
      area:{required},
      county: {required},
      landlord_id: {required},
      investor_id: {required},
      no_of_bedrooms:{required},
      no_of_living_areas:{required},
      no_of_kitchens:{required},
      no_of_bathrooms:{required},
      front_garden:{required},
      rear_garden:{required},
      postcode:{required},
      rent_to_landlord: {required},
      rent_start_date_to_landlord:{required},
      rent_date_to_landlord:{required},
      rent_to_investor: {required},
      rent_start_date_to_investor:{required},
      rent_date_to_investor:{required}
    }
  },
  mounted (){
      this._getOwner()
      this.getProperty(this.$route.params.id)
  },
  methods: {
    getProperty(id){
      this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'property/'+id+'/edit',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.property){
                this.user.id = response.data.property.id
                this.user.area = response.data.property.area
                this.user.county = response.data.property.county
                this.user.door_no = response.data.property.door_no
                this.user.front_garden = response.data.property.front_garden
                this.user.investor_id = response.data.property.investor_id
                this.user.landlord_id = response.data.property.landlord_id
                this.user.name = response.data.property.name
                this.user.no_of_bathrooms = response.data.property.no_of_bathrooms
                this.user.no_of_bedrooms = response.data.property.no_of_bedrooms
                this.user.no_of_kitchens = response.data.property.no_of_kitchens
                this.user.no_of_living_areas = response.data.property.no_of_living_areas
                this.user.postcode = response.data.property.postcode
                this.user.rear_garden = response.data.property.rear_garden
                this.user.rent_date_to_investor = response.data.property.rent_date_to_investor
                this.user.rent_date_to_landlord = response.data.property.rent_date_to_landlord
                this.user.rent_start_date_to_investor = response.data.property.rent_start_date_to_investor
                this.user.rent_start_date_to_landlord = response.data.property.rent_start_date_to_landlord
                this.user.rent_to_investor = response.data.property.rent_to_investor
                this.user.rent_to_landlord = response.data.property.rent_to_landlord
                this.user.street = response.data.property.street
              }
              this.loading=false;
          })
          .catch(error => {
            console.log(error)
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
    _getOwner(){
          this.loading=true;
          axios.get(process.env.VUE_APP_API_URL+'owners',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            }
          })
          .then(response => {
              if(response.status==200 && response.data.owners){
                const tmpOwner = [];
                const tmpInvestor = [];
                response.data.owners.map(function(value, key){
                  if(value.typer_of_owner==1){
                    tmpOwner.push(value)
                  }else{
                    tmpInvestor.push(value)
                  }
                })
                this.ownerList = tmpOwner
                this.investorList = tmpInvestor
              }
              this.loading=false;
          })
          .catch(error => {
            console.log(error)
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
    saveProperty () {
    this.isSubmitted = true;
    this.$v.$touch();
    if (this.$v.$invalid) {
        return;
    }
    this.loading=true;
      axios.post(process.env.VUE_APP_API_URL+'property/create', this.user, {
          headers: {
              'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
          })
          .then(response => {
            this.loading=false;
            this.isSubmitted=false;
            console.log(response.status)
            if(response.status == 200 && response.data){
              this.$notifications.notify(
              {
                message: '<span>'+response.data.message+'</span>',
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
              })
              this.$router.push({name: 'PropertyList'});
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
            this.$notifications.notify(
            {
              message: `<span>Something went wrong.</span>`,
              icon: 'nc-icon nc-bell-55',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
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
