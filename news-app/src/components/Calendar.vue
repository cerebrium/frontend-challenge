<template>
  <div id="fullLeftDiv">
    <div class="dateAndTime">
      {{ todaysDate.toDateString() }} |
      {{
        todaysDate.getHours() > 12
          ? todaysDate.getHours() - 12
          : todaysDate.getHours()
      }}:{{ todaysDate.getMinutes() }}
      {{ todaysDate.getHours() > 12 ? 'PM' : 'AM' }}
    </div>
    <div>
      {{ n }}
    </div>
  </div>
</template>

<script>
const getDaysInMonth = function(month, year) {
  return new Date(year, month, 0).getDate()
}

export default {
  //   props: {
  //     contentObject: Object
  //   },

  data: () => ({
    daysInMoth: Number,
    calanderDivs: 0,
    monthName: String,
    todaysDate: new Date(),
    selectedDate: new Date()
  }),
  watch: {
    selectedDate: {
      // makes a calender
      function() {
        this.calanderDivs = getDaysInMonth(
          this.selectedDate.getMonth(),
          this.selectedDate.getYear()
        )
      }
    }
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
