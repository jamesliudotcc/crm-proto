import Vue from 'vue';
import Vuex from 'vuex';

import { Contact, NewTouch } from '../types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    touchOptions: ['email', 'coffee', 'meal', 'drink', 'meeting', 'phone'],
    user: {
      name: 'James',
      contacts: [
        {
          name: 'Bridet',
          company: '', // Eventually factor out
          followUpDate: 1573789615000,
          // FollowUpDate lives on contact bc any contact should trigger a new followup date
          touches: [
            {
              type: 'coffee',
              date: 1573184815,
              note: 'Talked about Penelope',
            },
          ],
        },
      ],
    },
  },
  mutations: {
    addContact(state, payload: Contact) {
      state.user.contacts.push({
        name: payload.name,
        company: payload.company,
        followUpDate: payload.followUpDate,
        touches: [],
      });
    },
    addTouch(state, payload: NewTouch) {
      state.user.contacts[payload.contactId].touches.push(payload.newTouch);
      state.user.contacts[payload.contactId].followUpDate = payload.nextFollowUp;
    },
    // No way to resolve a followup due except by making a new touch!
  },
  actions: {},
  modules: {},
});
