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
import AddPropertyForm from 'src/pages/Property/AddPropertyForm'
import EditPropertyForm from 'src/pages/Property/EditPropertyForm'

import AddNewRoom from 'src/pages/Property/AddRoomForm'

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
        path: 'property-expense/',
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
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
