<template>
  <div id="fullLeftDiv">
    <div class="dateAndTime">
      {{ todaysDate.toDateString() }} |
      {{
        todaysDate.getHours() > 12
          ? todaysDate.getHours() - 12
          : todaysDate.getHours()
      }}:{{ todaysDate.getMinutes() }}: {{ todaysDate.getSeconds() }}
      {{ todaysDate.getHours() > 12 ? 'PM' : 'AM' }}
    </div>
    <div>
      <Calendar :value="selectedDate" />
    </div>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'

export default {
  components: {
    Calendar
  },
  data: () => ({
    daysInMoth: Number,
    checkTheTime: null,
    calanderDivs: 0,
    monthName: String,
    todaysDate: new Date(),
    selectedDate: new Date()
  }),
  mounted: function() {
    setInterval(() => {
      this.todaysDate = new Date()
    }, 1000)
  }
}
</script>

<style scoped>
#fullLeftDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 0.5vw;
  height: 100%;
}

.dateAndTime {
  display: flex;
  /* border: 2px solid white; */
  height: 50px;
  width: 300px;
  padding-left: 10px;
  color: #c9caca;
  font-size: 1.4em;
}
</style>
