<template>
  <div class="hello">
    <h2>Hi {{ user.name }}</h2>
    <form @submit.prevent>
      <select v-model="selectedContact">
        <option
          v-for="contact in contacts"
          v-bind:value="contact.index"
          v-bind:key="`contact-${contact.index}`"
        >{{ contact.name }}</option>
      </select>
    </form>
    <p>Follow up with {{contacts[selectedContact].name}} within {{followUpDateReadable}}</p>
    <h2>Record a touch</h2>
    <form @submit.prevent="submitAddTouch">
      <!-- this is a componenet -->
      <EditTouch :selectedContact="selectedContact" v-bind:newTouch="newTouch" />
    </form>
    <h2>Add a contact</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import { addBusinessDays, format, formatDistance, getUnixTime } from 'date-fns';

import { Contact, Touch, TouchTypes, User, NewTouch } from '../types';
import EditTouch from './EditTouch.vue';

@Component({ components: { EditTouch } })
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // Comes from vuex-class
  @State user!: User;
  @State touchOptions!: TouchTypes[];

  @Mutation addTouch!: (touch: NewTouch) => void;

  selectedContact = 0;
  selectedCurrentFollowUp: TouchTypes = 'email';
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

  // Methods
  submitAddTouch() {
    this.addTouch({
      contactId: this.selectedContact,
      newTouch: {
        type: this.selectedCurrentFollowUp,
        date: new Date(),
        note: this.note,
        followUpDate: this.nextFollowUpDateTime,
        nextFollowUpType: this.selectedNextFollowUp,
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
