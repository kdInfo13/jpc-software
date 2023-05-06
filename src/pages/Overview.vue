<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-if="currentUser.email_verified_at && currentUser.phone_no_verified_at && (currentUser.role_id==1 || currentUser.role_id==2 || currentUser.role_id==3)">
        <div class="col-xl-3 col-md-6" v-if="currentUser.role_id==1"  @click.prevent="directLink('admin')">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-circle-09 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.adminCount }}</h4>
            </div>
            <div slot="footer">
             Admin
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6" v-if="currentUser.role_id==1 || currentUser.role_id==2"  @click.prevent="directLink('manager')">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-circle-09 text-success"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.managerCount }}</h4>
            </div>
            <div slot="footer">
              Manager
            </div>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6" @click.prevent="directLink('OwnerList')">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-circle-09 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.owners }}</h4>
            </div>
            <div slot="footer">
              Owner
            </div>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6" @click.prevent="directLink('OwnerList')">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-circle-09 text-warning"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.investor }}</h4>
            </div>
            <div slot="footer">
              Investor
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6" @click.prevent="directLink('TenantsList')">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-circle-09 text-info"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.tanentCount }}</h4>
            </div>
            <div slot="footer">
              Tenants
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6" @click.prevent="directLink('TradesList')">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-circle-09 text-sucess"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.trader }}</h4>
            </div>
            <div slot="footer">
              Trader
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6" @click.prevent="directLink('PropertyList')">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-istanbul text-danger"></i>
            </div>
            <div slot="content">
              <h4 class="card-title">{{ dashboard.properties }}</h4>
            </div>
            <div slot="footer">
              Property
            </div>
          </stats-card>
        </div>
      </div>
      <div class="row" v-if="!currentUser.email_verified_at || !currentUser.phone_no_verified_at && currentUser.role_id==4 || currentUser.role_id==2 || currentUser.role_id==3">
        <otp></otp>
      </div>
      <div class="row" v-if="currentUser.email_verified_at && currentUser.phone_no_verified_at && currentUser.role_id==4">
        <div class="col-xl-6 col-md-6">
          <card>
            <h4>Your Details</h4>
            <ul class="list-group">
              <li class="list-group-item"><strong>Reference:</strong> {{ dashboard.tanent_details.reference }}</li>
              <li class="list-group-item"><strong>Profile Name:</strong> {{ dashboard.name }}</li>
              <li class="list-group-item"><strong>Email:</strong> {{ dashboard.email }} <span v-if="dashboard.email_verified_at" class="badge badge-success">Verified</span></li>
              <li class="list-group-item"><strong>Phone:</strong> {{ dashboard.phone_no }} <span v-if="dashboard.phone_no_verified_at" class="badge badge-success">Verified</span></li>
              <li class="list-group-item"><strong>Profile Name:</strong> {{ dashboard.name }}</li>
              <li class="list-group-item"><strong>ID prof Doc.</strong> <a target="_blank" :href="imagePath+dashboard.tanent_details.id_proof"> View</a></li>
            </ul>
          </card>
        </div>
        <div class="col-xl-6 col-md-6">
          <card>
            <h4>Rent Details</h4>
            <ul class="list-group">
              <li class="list-group-item"><strong>Deposite Amount:</strong> {{ dashboard.tanent_details.deposite_amount }}</li>
              <li class="list-group-item"><strong>Deposite Date:</strong> {{ dashboard.tanent_details.deposite_date }}</li>
              <li class="list-group-item"><strong>Tanency Period:</strong> {{ dashboard.tanent_details.tanency_period }}</li>
              <li class="list-group-item"><strong>Tanency Start Date:</strong> {{ dashboard.tanent_details.tanency_start_date }}</li>
              <li class="list-group-item"><strong>Tanency End Date:</strong> {{ dashboard.tanent_details.tanency_end_date }}</li>
              <li class="list-group-item"><strong>Rent Amount:</strong> {{ dashboard.tanent_details.rent_amount }}</li>
              <li class="list-group-item"><strong>Rent Date Per Month:</strong> {{ dashboard.tanent_details.rent_date }}</li>
            </ul>
          </card>
        </div>
        <div class="col-xl-12 col-md-12">
          <card>
            <h4>Property Details</h4>
            <ul class="list-group">
              <li class="list-group-item"><strong>Name:</strong> {{ dashboard.tanent_details.property.name }}</li>
              <li class="list-group-item"><strong>Address:</strong> {{ dashboard.tanent_details.property.door_no }} {{ dashboard.tanent_details.property.street }}, {{ dashboard.tanent_details.property.area }}, {{ dashboard.tanent_details.property.county }}, {{ dashboard.tanent_details.property.postcode }}</li>
              <li class="list-group-item"><strong>Room Detail:</strong>{{ dashboard.tanent_details.room.name }}</li>
            </ul>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import Otp from 'src/pages/Otp'
  import axios from "axios";

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      Otp
    },
    data () {
      return {
        imagePath:'',
        dashboard:'',
        currentUser:'',
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        uer:'',
        lineChart: {
          data: {
            labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
            series: [
              [2879, 2850, 4900],
              [670, 1520, 0],
            ]
          },
          options: {
            low: 0,
            high: 9000,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 100
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        }
      }
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      console.log(this.currentUser)
      this._getDashboard();
      this.imagePath = process.env.VUE_APP_IMAGE
    },
    methods:{
      directLink(nameP){
        if(nameP==='admin'){
          window.location.href = "/admin/user-list"
        }else if(nameP==='manager'){
          window.location.href = "/admin/user-list#manager-list"
        }else{
          this.$router.push({name: nameP});
        }
      },
      _getDashboard(){
        if(this.currentUser.role_id==1 || this.currentUser.role_id==2){
          this.url = process.env.VUE_APP_API_URL+'dashboard';
        }
        if(this.currentUser.role_id==4){
           this.url = process.env.VUE_APP_API_URL+'tenant-dashboard';
        }
        axios.get(this.url, {
          headers: {
            'Authorization' : 'Bearer '+ localStorage.getItem('token')
          },
        }).then(response => {
          if(response.data){
            this.dashboard = response.data.data
          }
        }).catch(error => {
          console.log(error)
          this.$notifications.notify(
          {
            message: '<span>Somethign went wrong.</span>',
            icon: 'nc-icon nc-bell-55',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
        }).finally( () =>{

        })
      }
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
