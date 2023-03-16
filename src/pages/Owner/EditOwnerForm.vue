<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Owner/Investors</h4>
            <form>
              <div class="row">
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
                  <label>Type</label>
                    <select v-model="user.type" class="form-control">
                      <option>Owner</option>
                      <option>Investors</option>
                    </select>
                    <div v-if="isSubmitted && $v.user.type.$error" class="invalid-feedback">
                    <span v-if="!$v.user.type.required">Please select any type.</span>
                  </div>
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
        email: '',
        firstName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        type: '',
      },
      isSubmitted: false
    }
  },
  validations: {
    user: {
        email:{required, email},
        firstName: {required},
        phone: {required},
        address:{required},
        city:{required},
        state:{required},
        postalCode:{required},
        type : {required}
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
