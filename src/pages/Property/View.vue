<template>
    <div class="content">
      <div class="container-fluid">
        <card>
        <div class="row">
                <div class="col-md-6" v-if="tableData">
                    <ul class="list-group">
                        <li class="list-group-item text-capitalize"><strong>Property Name: </strong> {{ tableData.organisers.name }}</li>
                        <li class="list-group-item text-capitalize"><strong>Property Address:</strong> {{ tableData.organisers.door_no }} {{ tableData.organisers.street }}, {{ tableData.organisers.area }} {{ tableData.organisers.postcode }}, {{ tableData.organisers.county }} </li>
                        <li class="list-group-item text-capitalize"><strong>No. of Rooms:</strong> {{ tableData.organisers.no_of_bedrooms }}</li>
                        <li class="list-group-item text-capitalize"><strong>No. of Living Area:</strong> {{ tableData.organisers.no_of_living_areas }}</li>
                        <li class="list-group-item"><strong>No. of Kitchen:</strong> {{ tableData.organisers.no_of_kitchens }}</li>
                        <li class="list-group-item"><strong>No. of Bathroom:</strong> {{ tableData.organisers.no_of_bathrooms }}</li>
                        <li class="list-group-item text-capitalize"><strong>Front Garden:  </strong> <span v-if="tableData.organisers.front_garden">Yes</span><span v-else>No</span></li>
                        <li class="list-group-item text-capitalize"><strong>Rear Garden:   </strong> <span v-if="tableData.organisers.rear_garden">Yes</span><span v-else>No</span></li>
                        <li class="list-group-item text-capitalize"><strong>Occupied Rooms:   </strong> {{ tableData.occupiedRooms.length }}</li>
                        <li class="list-group-item text-capitalize"><strong>Other Rooms:   </strong> {{ tableData.otherRooms.length }}</li>
                        <li class="list-group-item text-capitalize"><strong>Vaccant Rooms:   </strong> {{ tableData.vaccantRooms.length }}</li>
                        <li class="list-group-item text-capitalize"><strong>Expense Rooms:   </strong> {{ tableData.expenses.length }}</li>
                        <li class="list-group-item text-capitalize"><strong>Complaints   </strong>  <span v-for="(index, i) in tableData.complaints" :key="i"><p v-if="i==1">High Priority: {{ index.length }}</p> <p v-if="i==2">Medium Priority: {{ index.length }}</p><p v-if="i==3">Low Priority: {{ index.length }}</p></span> </li>

                    </ul>
                </div>
                <div class="col-md-6" v-if="tableData">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Admin Name:</strong> {{ tableData.organisers.admin.name }}</li>
                        <li class="list-group-item"><strong>Admin Eamil:</strong> {{ tableData.organisers.admin.email }}</li>
                        <li class="list-group-item"><strong>Admin Phone No:</strong> {{ tableData.organisers.admin.phone_no }}</li>
                        <li class="list-group-item"><strong>Manager Name:</strong> {{ tableData.organisers.manager.name }}</li>
                        <li class="list-group-item"><strong>Manager Eamil:</strong> {{ tableData.organisers.manager.email }}</li>
                        <li class="list-group-item"><strong>Manager Phone No:</strong> {{ tableData.organisers.manager.phone_no }}</li>
                        <li class="list-group-item"><strong>Landlord Name:</strong> {{ tableData.organisers.landlord.name }}</li>
                        <li class="list-group-item"><strong>Landlord Eamil:</strong> {{ tableData.organisers.landlord.email }}</li>
                        <li class="list-group-item"><strong>Landlord Phone No:</strong> {{ tableData.organisers.landlord.phone_no }}</li>
                        <li class="list-group-item"><strong>Investor Name:</strong> {{ tableData.organisers.investor.name }}</li>
                        <li class="list-group-item"><strong>Investor Eamil:</strong> {{ tableData.organisers.investor.email }}</li>
                        <li class="list-group-item"><strong>Investor Phone No:</strong> {{ tableData.organisers.investor.phone_no }}</li>
                    </ul>
                </div>

                <div class="col-md-12">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Rent start date to landlord :</strong> {{ tableData.organisers.rent_start_date_to_landlord }}</li>
                        <li class="list-group-item"><strong>Rent to landlord :</strong>  {{ tableData.organisers.rent_to_landlord }}</li>
                        <li class="list-group-item"><strong>Rent date to landlord : </strong>{{ tableData.organisers.rent_date_to_landlord }}</li>
                        <li class="list-group-item"><strong>Rent start date to investor :</strong> {{ tableData.organisers.rent_start_date_to_investor }}</li>
                        <li class="list-group-item"><strong>Rent to investor :</strong>  {{ tableData.organisers.rent_to_investor }}</li>
                        <li class="list-group-item"><strong>Rent date to investor : </strong>{{ tableData.organisers.rent_date_to_investor }}</li>
                    </ul>
                </div>
        </div>
    </card>

    </div>
</div>
</template>
<script>
  import axios from "axios";

export default{
    data(){
        return{
            loading:false,
            tableData:''
        }
    },
    mounted(){
        this._getProperty(this.$route.params.id);
    },
    methods:{
        _getProperty(id){
            this.loading=true;
            axios.get(process.env.VUE_APP_API_URL+'property-details/'+id,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer '+ localStorage.getItem('token')
              }
            })
            .then(response => {
                if(response.status==200 && response.data.property_details){
                  this.tableData = response.data.property_details
                }
                this.loading=false;
            })
            .catch(error => {
              this.$notifications.notify(
              {
                message: `<span>Something went wrong.</span>`,
                icon: 'nc-icon nc-bell-55',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
                this.loading=false;
            }).finally( () => {
                this.loading = false
            })
        }
    }
}
</script>
