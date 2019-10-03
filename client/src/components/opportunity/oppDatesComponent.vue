<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <br>
      </div>
      <div class="col-md-2 rectangle-bidDue">
        BidDue
      </div>
      <div class="col-md-2 rectangle-order">
        Order
      </div>
      <div class="col-md-2 rectangle-ship">
        Ship
      </div>
      <div class="col-md-2">
        <button
          class="btn btn-primary"
          @click.prevent="keyAdd"
        >
          Refresh
        </button>
      </div>
    </div>
    <FullCalendar
      :key="calendarKey"
      ref="fullCalendar"
      default-view="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
      }"
      :height="800"
      :aspect-ratio="2.4"
      :plugins="calendarPlugins"
      :weekends="false"
      :events="calendarEvents"
      :editable="true"
      :event-resource-editable="true"
      @eventDrop="dropDate"
    />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarKey: 0,
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin
      ],
      oppDates: [
        {
          Id: null,
          Bid_Due_Date__c:  null,
          OrderDate__c: null,
          Ship_Date__c: null,
          Name: null,
          Primary_Quote_Status__c: null
        },
      ],
    };
  },
  computed: {
    calendarEvents() {
      const dueDates = this.oppDates.map(opp => (
        {
          title: opp.Name + ' - ' + opp.Primary_Quote_Status__c,
          timeZone: 'America/Los_Angeles',
          start: opp.Bid_Due_Date__c,
          id: 'BD' + opp.Id,
          url: 'https://cray.my.salesforce.com/' + opp.Id,
          backgroundColor: '#59c2bb',
          allDay: true,
          textColor: (opp.Primary_Quote_Status__c === 'Export Complete') ? 'black'
            : (opp.Primary_Quote_Status__c === 'Export Pending') ? 'red'
              : (opp.Primary_Quote_Status__c === 'Approved') ? 'cyan'
                : (opp.Primary_Quote_Status__c === 'Revision Pending') ? 'yellow'
                  : (opp.Primary_Quote_Status__c === 'Approval Pending') ? 'green'
                    : 'blue'
        })
      );
      const orderDates = this.oppDates.map(opp => (
        {
          title: opp.Name + ' - ' + opp.Primary_Quote_Status__c,
          timeZone: 'America/Los_Angeles',
          start: opp.OrderDate__c,
          id: 'OD' + opp.Id,
          url: 'https://cray.my.salesforce.com/' + opp.Id,
          backgroundColor: '#5587c4',
          allDay: true,
          textColor: (opp.Primary_Quote_Status__c === 'Export Complete') ? 'black'
            : (opp.Primary_Quote_Status__c === 'Export Pending') ? 'red'
              : (opp.Primary_Quote_Status__c === 'Approved') ? 'cyan'
                : (opp.Primary_Quote_Status__c === 'Revision Pending') ? 'yellow'
                  : (opp.Primary_Quote_Status__c === 'Approval Pending') ? 'green'
                    : 'blue'
        })
      );
      const shipDates = this.oppDates.map(opp => (
        {
          title: opp.Name + ' - ' + opp.Primary_Quote_Status__c,
          timeZone: 'America/Los_Angeles',
          start: opp.Ship_Date__c,
          id: 'SD' + opp.Id,
          url: 'https://cray.my.salesforce.com/' + opp.Id,
          backgroundColor: '#db7590',
          allDay: true,
          textColor: (opp.Primary_Quote_Status__c === 'Export Complete') ? 'black'
            : (opp.Primary_Quote_Status__c === 'Export Pending') ? 'red'
              : (opp.Primary_Quote_Status__c === 'Approved') ? 'cyan'
                : (opp.Primary_Quote_Status__c === 'Revision Pending') ? 'yellow'
                  : (opp.Primary_Quote_Status__c === 'Approval Pending') ? 'green'
                    : 'blue'
        })
      );
      return dueDates.concat(orderDates).concat(shipDates);
    },
  },


  created() {
    let uri = '/oppDates';
    if (process.env.NODE_ENV !== 'production') {
      uri = 'http://localhost:4000/oppDates';
    }
    this.axios.get(uri, {withCredentials: true})
      .then(response => {
        this.oppDates = response.data;
      })
      .catch(() => {
        console.log('oppDates catch');
      });
  },

  methods: {
    keyAdd() {
      let uri = '/oppDates';
      if (process.env.NODE_ENV !== 'production') {
        uri = 'http://localhost:4000/oppDates';
      }
      this.axios.get(uri, {withCredentials: true})
        .then(response => {
          this.oppDates = response.data;
        })
        .catch(() => {
          console.log('oppDates catch');
        });

      this.calendarKey += 1;
    },
    dropDate (eventDropInfo) {

      const dropDate = new Date(eventDropInfo.event.start);
      const sourceId = eventDropInfo.event.id.substring(2);
      const eventType = eventDropInfo.event.id.substring(0,2);
      let uri = '/oppDates/change/' + sourceId;
      if (process.env.NODE_ENV !== 'production') {
        uri = 'http://localhost:4000/oppDates/change/' + sourceId;
      }
      let changeJson = null;
      switch (eventType) {
      case 'BD':
        changeJson = {Bid_Due_Date__c: dropDate};
        break;
      case 'OD':
        changeJson = {OrderDate__c: dropDate};
        break;
      case 'SD':
        changeJson = {Ship_Date__c: dropDate};
      }
      this.axios.post(uri, changeJson, {withCredentials: true})
        .then(() => {

        })
        .catch(() => {
        });
    }
  }

};
</script>

<style lang='scss'>

  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';

  .rectangle-bidDue {
    height: 30px;
    width: 50px;
    background-color: #59c2bb;
  }
  .rectangle-order {
    height: 30px;
    width: 50px;
    background-color: #5587c4;
  }
  .rectangle-ship {
    height: 30px;
    width: 50px;
    background-color: #db7590;
  }

</style>
