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
    <form @submit.prevent="handleSubmit">
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
        </select> at
        <input type="date" v-model="nextFollowUpDate" />
        <input type="time" v-model="nextFollowUpTime" />
        <button type="submit">Submit</button>
      </p>
    </form>
    <h2>Add a contact</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import { addBusinessDays, format, formatDistance, getUnixTime } from 'date-fns';

import { Contact, Touch, TouchTypes, User, NewTouch } from '../types';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // Comes from vuex-class
  @State user!: User;
  @State touchOptions!: TouchTypes[];

  @Mutation addTouch!: (touch: NewTouch) => void;

  // Bind selected contact with local state
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
    return formatDistance(this.user.contacts[this.selectedContact].followUpDate, Date.now());
  }
  get nextFollowUpUnixTime() {
    return getUnixTime(new Date(`${this.nextFollowUpDate} ${this.nextFollowUpTime}`));
  }

  // Methods
  handleSubmit() {
    this.addTouch({
      contactId: this.selectedContact,
      nextFollowUp: this.nextFollowUpUnixTime * 1000,
      nextFollowUpShouldBe: 'email',
      newTouch: {
        type: this.selectedCurrentFollowUp,
        date: Date.now() * 1000,
        note: this.note,
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
