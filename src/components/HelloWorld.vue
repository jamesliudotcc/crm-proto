<template>
  <div class="hello">
    <h2>Hi {{user.name}}</h2>
    <form @submit.prevent="handleSubmit">
      <select v-model="contacts">
        <option
          v-for="contact in contacts"
          :value="contact.index"
          v-bind:key="`contact-${contact.index}`"
        >{{contact.name}}</option>
      </select>
    </form>
    <p>{{followUpDateReadable}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { Contact, Touch, TouchTypes } from '../types';

import fromUnixTime from 'date-fns/fromUnixTime';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // Comes from vuex-class
  @State user: any;

  // Bind selected contact with local state

  // Syntax for computed properties
  get contacts() {
    return this.user.contacts.map((contact: {}, i: number) => ({ ...contact, index: i }));
  }
  get followUpDateReadable() {
    return 'Today';
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
