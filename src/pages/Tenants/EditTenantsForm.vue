<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Update Tenant</h4>
            <form>
              <div class="row">
                <div class="col-md-4">
                  <base-input type="text"
                            label="Reference Number"
                            placeholder="Reference Number"
                            v-model="user.reference">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.reference.$error" class="invalid-feedback">
                  <span v-if="!$v.user.reference.required">Reference field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="Full Name"
                            placeholder="Full Name"
                            v-model="user.firstName">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.firstName.$error" class="invalid-feedback">
                  <span v-if="!$v.user.firstName.required">Full name field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="email"
                            label="Email"
                            placeholder="Email"
                            v-model="user.email">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.email.$error" class="invalid-feedback">
                  <span v-if="!$v.user.email.required">Email field is required.</span>
                </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input type="tel"
                            label="Phone"
                            placeholder="Phone"
                            v-model="user.phone">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.phone.$error" class="invalid-feedback">
                  <span v-if="!$v.user.phone.required">Phone field is required.</span>
                </div>
                </div>
             
                <div class="col-md-4">
                  <base-input type="date"
                            label="Start Agreement Date"
                            placeholder="Start Agreement Date"
                            v-model="user.start_date">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.start_date.$error" class="invalid-feedback">
                  <span v-if="!$v.user.start_date.required">Agreement Date field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="date"
                            label="End Agreement Date"
                            placeholder="end Agreement Date"
                            v-model="user.end_date">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.end_date.$error" class="invalid-feedback">
                  <span v-if="!$v.user.end_date.required">Agreement Date field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="date"
                            label="Rent Date"
                            placeholder="Rent Date"
                            v-model="user.rent_date">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.rent_date.$error" class="invalid-feedback">
                  <span v-if="!$v.user.rent_date.required">Rent Date field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="number"
                            label="Rent Amount"
                            placeholder="Rent Amount"
                            v-model="user.rent_amount">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.rent_amount.$error" class="invalid-feedback">
                  <span v-if="!$v.user.rent_amount.required">Rent Amount field is required.</span>
                </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <base-input type="text"
                            label="Address"
                            placeholder="Home Address"
                            v-model="user.address">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.address.$error" class="invalid-feedback">
                  <span v-if="!$v.user.address.required">Address field is required.</span>
                </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input type="text"
                            label="City"
                            placeholder="City"
                            v-model="user.city">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.city.$error" class="invalid-feedback">
                  <span v-if="!$v.user.city.required">City field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="State"
                            placeholder="State"
                            v-model="user.state">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.state.$error" class="invalid-feedback">
                  <span v-if="!$v.user.state.required">State field is required.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="number"
                            label="Postal Code"
                            placeholder="ZIP Code"
                            v-model="user.postalCode">
                  </base-input>
                  <div v-if="isSubmitted && $v.user.postalCode.$error" class="invalid-feedback">
                  <span v-if="!$v.user.postalCode.required">Postal Code field is required.</span>
                </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <label>Property Details</label>
                  <select v-model="user.property_details" class="form-control">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.property_details.$error" class="invalid-feedback">
                  <span v-if="!$v.user.property_details.required">Select any property.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <label>Room Details</label>
                  <select v-model="user.room_details" class="form-control">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                  <div v-if="isSubmitted && $v.user.room_details.$error" class="invalid-feedback">
                  <span v-if="!$v.user.room_details.required">Select any room.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="text"
                            label="Other Detail"
                            placeholder="Other Detail"
                            v-model="user.other">
                  </base-input>
                </div>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveProfile">
                  Update
                </button>
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

export default {
  components: {
    Card
  },
  data () {
    return {
      user: {
        reference: '',
        email: '',
        firstName: '',
        phone: '',
        email: '',
        rent_date: '',
        start_date:'',
        end_date:'',
        rent_amount:'',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        property_details: '',
        room_details: '',
        other:''
      },
      isSubmitted: false
    }
  },
  validations: {
    user: {
      reference:{required},
      email:{required, email},
      firstName: {required},
      phone: {required},
      address:{required},
      city:{required},
      state:{required},
      postalCode:{required},
      rent_date : {required},
      start_date:{required},
      end_date:{required},
      property_details:{required},
      room_details:{required},
      rent_amount:{required}
    }
  },
  methods: {
    saveProfile () {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }
      alert('Your data: ' + JSON.stringify(this.user))
    }
  }
}

</script>
<style>

</style>
