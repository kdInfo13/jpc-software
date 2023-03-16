<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Add New Trader</h4>
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Full Name"
                              placeholder="Full Name"
                              v-model="user.firstName">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.firstName.$error" class="invalid-feedback">
                      <span v-if="!$v.form.firstName.required">Full name field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="email"
                              label="Email"
                              placeholder="Email"
                              v-model="user.email">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.email.$error" class="invalid-feedback">
                      <span v-if="!$v.form.email.required">Email field is required.</span>
                      <span v-if="!$v.form.email.email">Please provide valid email</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="tel"
                              label="Phone"
                              placeholder="Phone"
                              v-model="user.phone">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.phone.$error" class="invalid-feedback">
                      <span v-if="!$v.form.phone.required">Phone field is required.</span>
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
                    <div v-if="isSubmitted && $v.form.address.$error" class="invalid-feedback">
                      <span v-if="!$v.form.address.required">Address field is required.</span>
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
                    <div v-if="isSubmitted && $v.form.city.$error" class="invalid-feedback">
                      <span v-if="!$v.form.city.required">City field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="State"
                              placeholder="State"
                              v-model="user.state">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.state.$error" class="invalid-feedback">
                      <span v-if="!$v.form.state.required">State field is required.</span>
                  </div>
                  </div>
                  <div class="col-md-4">
                    <base-input type="number"
                              label="Postal Code"
                              placeholder="ZIP Code"
                              v-model="user.postalCode">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.postalCode.$error" class="invalid-feedback">
                      <span v-if="!$v.form.postalCode.required">Postal Code field is required.</span>
                  </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Occupation Detail"
                              placeholder="Occupation Detail"
                              v-model="user.occupation">
                    </base-input>
                    <div v-if="isSubmitted && $v.form.occupation.$error" class="invalid-feedback">
                      <span v-if="!$v.form.occupation.required">Occupation field is required.</span>
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
          email: '',
          firstName: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          occupation: '',
        },
        isSubmitted: false
      }
    },
    validations: {
      form: {
        email:{required, email},
        firstName: {required},
        occupation:{required},
        phone:{required},
        address:{required},
        city:{required},
        state:{required},
        postalCode:{required}
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
