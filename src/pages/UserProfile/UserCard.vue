<template>
  <card class="card-user">
    <h4 slot="header" class="card-title">Bank Details</h4>
    <plaid-link
      env="sandbox"
      publicKey="88df89aa7dc1a384a12643f958e603"
      clientName="Test App"
      product="transactions"
      v-bind="{ onSuccess }"
    >
      <template slot="button" slot-scope="props">
        <a @click="props.onClick">Add Bank Account</a>
      </template>
    </plaid-link>
  </card>
</template>
<script>
  import PlaidLink from "src/components/PlaidLink.vue";
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card,
      PlaidLink
    },
    data () {
      return {      
      }
    },
    methods: {
      onSuccess(token) {
        console.log(token);
      },
      onLoad(){

      }
    }
  }

</script>
<style>

</style>
