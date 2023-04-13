<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6" v-if="currentUser.role_id==1">
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

        <div class="col-xl-3 col-md-6">
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
        <div class="col-xl-3 col-md-6">
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
        <div class="col-xl-3 col-md-6">
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

        <div class="col-xl-3 col-md-6">
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

        <div class="col-xl-3 col-md-6">
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

        <div class="col-xl-3 col-md-6">
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

      <div class="row">
        <div class="col-md-12">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Finances Charts</h4>
              <p class="card-category">{{new Date().getFullYear()}} performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Earning
                <i class="fa fa-circle text-danger"></i> Expenses
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated every month
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import axios from "axios";

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        dashboard:'',
        currentUser:'',
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
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
      this._getDashboard();
    },
    methods:{
      _getDashboard(){
        axios.get(process.env.VUE_APP_API_URL+'dashboard', {
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

</style>
