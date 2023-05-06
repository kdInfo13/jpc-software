import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

//Login page
import Login from 'src/components/Login.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

import Owner from 'src/pages/Owner/TableList'
import AddOwnerForm from 'src/pages/Owner/AddOwnerForm'
import EditOwnerForm from 'src/pages/Owner/EditOwnerForm'

import Property from 'src/pages/Property/TableList'
import PropertyImages from 'src/pages/Property/Images'
import PropertyView from 'src/pages/Property/View'
import AddPropertyForm from 'src/pages/Property/AddPropertyForm'
import EditPropertyForm from 'src/pages/Property/EditPropertyForm'

import AddNewRoom from 'src/pages/Property/AddRoomForm'
import EditNewRoom from 'src/pages/Property/EditRoomForm'
import AddMoreRoom from 'src/pages/Property/AddMoreRoom'
import AddMaintenance from 'src/pages/Property/Maintenance'
import AddNewMaintenance from 'src/pages/Property/AddMaintenance'

import Tenants from 'src/pages/Tenants/TableList'
import AddTenantsForm from 'src/pages/Tenants/AddTenantsForm'
import EditTenantsForm from 'src/pages/Tenants/EditTenantsForm'

import Trade from 'src/pages/TradePerson/TableList'
import AddTradeForm from 'src/pages/TradePerson/AddTradeForm'
import EditTradeForm from 'src/pages/TradePerson/EditTradeForm'

import Expense from 'src/pages/PropertyExpense/TableList'
import AddExpenseForm from 'src/pages/PropertyExpense/AddExpenseForm'
import EditExpenseForm from 'src/pages/PropertyExpense/EditExpenseForm'

import User from 'src/pages/User/TableList'
import AddUserForm from 'src/pages/User/AddUserForm'
import EditUserForm from 'src/pages/User/EditUserForm'

import ListDoc from 'src/pages/PropertyDoc/TableList'
import AddNewDoc from 'src/pages/PropertyDoc/AddDocForm'
import EditNewDoc from 'src/pages/PropertyDoc/EditDocForm'
import AddCash from 'src/pages/AddCash'
import adminComplaints from 'src/pages/Complaints/TableList'
import viewComplaints from 'src/pages/Complaints/View'
//tenant route
import TenantComplaints from 'src/tenant/complaints/TableList'
import addComplaints from 'src/tenant/complaints/AddUserForm'
import editComplaints from 'src/tenant/complaints/EditUserForm'

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    name:'dashboard',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'add-cash/:id/:type',
        name: 'AddCash',
        component: AddCash
      },
      {
        path: 'owner-list',
        name: 'OwnerList',
        component: Owner
      },
      {
        path: 'new-owner',
        name: 'Add New Owner',
        component: AddOwnerForm
      },
      {
        path: 'edit-owner/:id',
        name: 'Edit Owner',
        component: EditOwnerForm
      },

      {
        path: 'tenants-list',
        name: 'TenantsList',
        component: Tenants
      },
      {
        path: 'new-tenant',
        name: 'Add New Tenant',
        component: AddTenantsForm
      },
      {
        path: 'edit-tenant/:id',
        name: 'Edit Tenant',
        component: EditTenantsForm
      },

      {
        path: 'trades-list',
        name: 'TradesList',
        component: Trade
      },
      {
        path: 'new-trade',
        name: 'Add New Trade',
        component: AddTradeForm
      },
      {
        path: 'edit-trade/:id',
        name: 'Edit Trade',
        component: EditTradeForm
      },

      {
        path: 'property-list',
        name: 'PropertyList',
        component: Property
      },
      {
        path: 'property-image/:id',
        name: 'PropertyImages',
        component: PropertyImages
      },
      {
        path:'maintenance/:id',
        name: 'AddMaintenance',
        component: AddMaintenance
      },
      {
        path:'add-maintenance/:id',
        name: 'AddNewMaintenance',
        component: AddNewMaintenance
      },
      {
        path: 'property-view/:id',
        name: 'PropertyView',
        component: PropertyView
      },
      {
        path: 'new-property',
        name: 'Add New Property',
        component: AddPropertyForm
      },
      {
        path: 'edit-property/:id',
        name: 'Edit Property',
        component: EditPropertyForm
      },
      {
        path: 'add-amenities/:id',
        name: 'AddNewRoom',
        component: AddNewRoom
      },
      {
        path: 'edit-amenities/:id',
        name: 'EditNewRoom',
        component: EditNewRoom
      },
      {
        path: 'add-more-room/:id',
        name: 'AddMoreRoom',
        component: AddMoreRoom
      },
      {
        path: 'doc-list/:id',
        name: 'ListDoc',
        component: ListDoc
      },
      {
        path: 'add-doc/:id',
        name: 'AddNewDoc',
        component: AddNewDoc
      },
      {
        path: 'edit-doc/:id',
        name: 'EditDoc',
        component: EditNewDoc
      },
      {
        path: 'property-expense/:id',
        name: 'PropertyExpense',
        component: Expense
      },
      {
        path: 'new-property-expense/:id?',
        name: 'AddExpense',
        component: AddExpenseForm
      },
      {
        path: 'edit-property-expense/:id',
        name: 'EditExpense',
        component: EditExpenseForm
      },

      {
        path: 'user-list',
        name: 'User',
        component: User
      },
      {
        path: 'add-user',
        name: 'addUser',
        component: AddUserForm
      },
      {
        path: 'edit-user/:id',
        name: 'editUser',
        component: EditUserForm
      },
      {
        path: 'user',
        name: 'user',
        component: UserProfile
      },
      {
        path: 'admin-complaints',
        name: 'adminComplaints',
        component: adminComplaints
      },
      {
        path: 'view-complaint/:id',
        name: 'viewComplaints',
        component: viewComplaints
      },
      {
        path: 'tenant-complaints',
        name: 'TenantComplaints',
        component: TenantComplaints
      },
      {
        path: 'add-conplaint',
        name: 'addComplaints',
        component: addComplaints
      },
      {
        path: 'edit-conplaint/:id',
        name: 'editComplaints',
        component: editComplaints
      },
      {
        path: 'finance',
        name: 'addComplaints',
        component: TenantComplaints
      },
      {
        path: 'property-doc',
        name: 'addComplaints',
        component: TenantComplaints
      },
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
