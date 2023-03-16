<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit Property Expense</h4>
            <form>
              <div class="row">
                <div class="col-md-4">
                  <label>Select Property</label>
                  <select class="form-control" v-model="form.property_name">
                    <option>Property name 1</option>
                    <option>Property name 2</option>
                    <option>Property name 3</option>
                    <option>Property name 4</option>
                  </select>
                  <div v-if="isSubmitted && $v.form.property_name.$error" class="invalid-feedback">
                    <span v-if="!$v.form.property_name.required">Select property.</span>
                </div>
                </div>
                <div class="col-md-4">
                  <base-input type="type"
                            label="Expens Type"
                            placeholder="Expens Type"
                            v-model="form.expens_type">
                  </base-input>
                    <div v-if="isSubmitted && $v.form.expens_type.$error" class="invalid-feedback">
                      <span v-if="!$v.form.expens_type.required">Expens type field is required.</span>
                  </div>
                </div>
                <div class="col-md-4">
                  <base-input type="type"
                            label="Expens Amount"
                            placeholder="Expens Amount"
                            v-model="form.amount">
                  </base-input>
                    <div v-if="isSubmitted && $v.form.amount.$error" class="invalid-feedback">
                      <span v-if="!$v.form.amount.required">Expens amount field is required.</span>
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
      form: {
        property_name: '',
        amount: '',
        expens_type: ''
      },
      isSubmitted: false
    }
  },
  validations: {
    form: {
      property_name:{required},
      amount: {required},
      expens_type:{required}
    }
  },
  methods: {
    saveProfile () {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }
      alert('Your data: ' + JSON.stringify(this.form))
    }
  }
}

</script>
<style>

</style>
