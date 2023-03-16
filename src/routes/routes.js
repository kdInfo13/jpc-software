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
import AddTradeForm from 'src/pages/TradePerson/AddTenantsForm'
import EditTradeForm from 'src/pages/TradePerson/EditTenantsForm'

import Expense from 'src/pages/PropertyExpense/TableList'
import AddExpenseForm from 'src/pages/PropertyExpense/AddExpenseForm'
import EditExpenseForm from 'src/pages/PropertyExpense/EditExpenseForm'


const routes = [
  {
    path: '/login',
    component: Login,
    name: 'Login'
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
        name: 'Owner List',
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
        name: 'Tenants List',
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
        name: 'Trades List',
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
        name: 'Property List',
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
        path: 'property-expense',
        name: 'PropertyExpense',
        component: Expense
      },
      {
        path: 'new-property-expense',
        name: 'AddExpense',
        component: AddExpenseForm
      },
      {
        path: 'edit-property-expense/:id',
        name: 'EditExpense',
        component: EditExpenseForm
      },

      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
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

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
