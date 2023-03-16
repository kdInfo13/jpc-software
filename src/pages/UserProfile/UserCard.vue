<template>
  <card class="card-user">
    <div class="" v-if="!bankStatus">
      <i>username: user_good</i><br>
      <i>password: pass_good</i>
      <br>
      <PlaidLink
        clientName="Vue Test"
        env="sandbox"
        public_key="dbaef5e48f1ccc027c209c029ef395"
        :products="['auth','transactions']"
        :onLoad='onLoad'
        :onSuccess='onSuccess'
        :onExit='onExit'
        :onEvent='onEvent'
        >
        <button class="btn btn-danger justify-center">Add your bank account</button>
      </PlaidLink>
    </div>
    <div v-if="bankStatus">
      <ul class="list-group">
        <li class="list-group-item">Bank name: {{ bankDetails.institution.name }}</li>
        <li class="list-group-item">Account Id: {{ bankDetails.account_id }}</li>
        <li class="list-group-item">Public Token: {{ bankDetails.public_token }}</li>
        <li class="list-group-item">Account type: {{ bankDetails.accounts[0].subtype }}</li>
      </ul>
    </div>
  </card>
</template>
<script>
  // import PlaidLink from "src/components/PlaidLink.vue";
  import Card from 'src/components/Cards/Card.vue';
  import PlaidLink from 'vue-plaid-link2';

  export default {
    components: {
      Card,
      PlaidLink
    },
    data () {
      return {   
        bankStatus: false,
        bankDetails:[]
      }
    },
    methods: {
      onLoad() {},
      onSuccess(public_token, metadata) {
          this.bankStatus = true
          this.bankDetails = metadata
      },
      onExit(err, metadata) {},
      onEvent(eventName, metadata) {
          console.log(metadata)
      }
    }
  }

</script>
<style>

</style>
