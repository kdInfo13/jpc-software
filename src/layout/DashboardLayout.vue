<template>
  <div class="wrapper">
    <side-bar>
      <div v-if="currentUser.role_id==1 || currentUser.role_id==2 || currentUser.role_id==3">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user-list" v-if="currentUser.role_id==1">
        <i class="nc-icon nc-circle-09"></i>
        <p>Admin / Manager</p>
      </sidebar-link>
      <sidebar-link to="/admin/user-list" v-if="currentUser.role_id==2">
        <i class="nc-icon nc-circle-09"></i>
        <p>Manager</p>
      </sidebar-link>
      <sidebar-link to="/admin/owner-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>Landlord / Investors</p>
      </sidebar-link>
      <sidebar-link to="/admin/tenants-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>Tenants</p>
      </sidebar-link>
      <sidebar-link to="/admin/trades-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>Trade Persons</p>
      </sidebar-link>
      <sidebar-link to="/admin/property-list">
        <i class="nc-icon nc-istanbul"></i>
        <p>Properties list</p>
      </sidebar-link>
      <sidebar-link to="/admin/admin-complaints">
        <i class="nc-icon nc-istanbul"></i>
        <p>Complaints list</p>
      </sidebar-link>
      </div>
      <div v-if="currentUser.email_verified_at && currentUser.phone_no_verified_at && currentUser.role_id==4">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/tenant-complaints">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Complaints</p>
      </sidebar-link>
      <sidebar-link to="/admin/finance">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Finance</p>
      </sidebar-link>
      <sidebar-link to="/admin/property-doc">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Property Doc</p>
      </sidebar-link>
    </div>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
import SidebarLink from '../components/SidebarPlugin/SidebarLink.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
        SidebarLink
    },
    data () {
      return {
        currentUser : '',
      }
    },
    mounted(){
      this.currentUser = JSON.parse(localStorage.getItem('user'))
      console.log(this.currentUser)
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
