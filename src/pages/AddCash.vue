<template>
 <div>
  <add-cash-property v-if="type=='property'" :id="id"></add-cash-property>
  <add-cash-tenant v-if="type=='tenant'"></add-cash-tenant>
 </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import BaseInput from '../components/Inputs/BaseInput.vue';
  import AddCashTenant from 'src/pages/AddCashTenant'
  import AddCashProperty from 'src/pages/AddCashProperty'
  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      BaseInput,
      AddCashTenant,
      AddCashProperty,
      AddCashTenant
    },
    data () {
      return {
        type:'',
        id:'',
        currentUser:''
      }
    },
    mounted(){
      this.type = this.$route.params.type 
      this.id = this.$route.params.id 
      console.log(this.id)
      this.currentUser = JSON.parse(localStorage.getItem('user'))
    },
    methods:{
 

    }
  }
</script>
<style>
.card.card-stats {
    cursor: pointer;
}
.card.card-stats:hover {
    background: #00000008;
}
</style>
