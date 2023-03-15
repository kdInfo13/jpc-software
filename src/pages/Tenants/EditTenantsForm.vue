<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card>
              <h4 slot="header" class="card-title">Edit Tenant</h4>
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Reference Number"
                              placeholder="Reference Number"
                              v-model="user.reference">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="Full Name"
                              placeholder="Full Name"
                              v-model="user.firstName">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="email"
                              label="Email"
                              placeholder="Email"
                              v-model="user.email">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <base-input type="tel"
                              label="Phone"
                              placeholder="Phone"
                              v-model="user.phone">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="date"
                              label="Rent Date"
                              placeholder="Rent Date"
                              v-model="user.rent_date">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="number"
                              label="Rent Amount"
                              placeholder="Rent Amount"
                              v-model="user.rent_amount">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input type="text"
                              label="Address"
                              placeholder="Home Address"
                              v-model="user.address">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <base-input type="text"
                              label="City"
                              placeholder="City"
                              v-model="user.city">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="State"
                              placeholder="State"
                              v-model="user.state">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="number"
                              label="Postal Code"
                              placeholder="ZIP Code"
                              v-model="user.postalCode">
                    </base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label>Property Details</label>
                    <select v-model="property_details" class="form-control">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label>Room Details</label>
                    <select v-model="room_details" class="form-control">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
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
          rent_amount:'',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          property_details: '',
          room_details: '',
          other:''
        }
      }
    },
    methods: {
      saveProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
