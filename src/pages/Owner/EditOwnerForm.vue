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
                </div>
                <div class="col-md-4">
                  <base-input type="email"
                            label="Email"
                            placeholder="Email"
                            v-model="user.email">
                  </base-input>
                </div>
                <div class="col-md-4">
                  <base-input type="tel"
                            label="Phone"
                            placeholder="Phone"
                            v-model="user.phone">
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
                  <label>Type</label>
                    <select v-model="type" class="form-control">
                      <option>Owner</option>
                      <option>Investors</option>
                    </select>
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
        email: '',
        firstName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        type: '',
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
