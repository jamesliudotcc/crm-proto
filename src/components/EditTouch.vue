<template>
  <div>
    <p>
      I had a
      <!-- TODO inflect -->
      <select v-model="selectedCurrentFollowUp">
        <option
          v-for="option in touchOptions"
          v-bind:value="option"
          v-bind:key="option"
        >{{ option }}</option>
      </select>
      with {{ contacts[selectedContact].name }}.
    </p>
    <textarea v-model="note" rows="4" cols="50"></textarea>
    <p>
      The next follow-up is a
      <select v-model="selectedNextFollowUp">
        <option
          v-for="option in touchOptions"
          v-bind:value="option"
          v-bind:key="option"
        >{{ option }}</option>
      </select>
      at
      <input type="date" v-model="nextFollowUpDate" />
      <input type="time" v-model="nextFollowUpTime" />
      <button type="submit">Submit</button>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { addBusinessDays, format, formatDistance, getUnixTime } from 'date-fns';
import { Contact, Touch, TouchTypes, User, NewTouch } from '../types';

@Component
export default class EditTouch extends Vue {
  @Prop() private selectedContact!: number;

  @State user!: User;
  @State touchOptions!: TouchTypes[];

  @Mutation addTouch!: (touch: NewTouch) => void;

  selectedNextFollowUp: TouchTypes = 'email';
  nextFollowUpDate = format(addBusinessDays(Date.now(), 5), 'yyyy-MM-dd');
  nextFollowUpTime = '13:00';
  note = '';

  // Syntax for computed properties
  get contacts() {
    return this.user.contacts.map((contact: {}, i: number) => ({ ...contact, index: i }));
  }
  get followUpDateReadable() {
    // TODO [0] is wrong. Fix.
    return formatDistance(this.user.contacts[this.selectedContact].touches[0].followUpDate, Date.now());
  }
  get nextFollowUpDateTime() {
    return new Date(`${this.nextFollowUpDate} ${this.nextFollowUpTime}`);
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
