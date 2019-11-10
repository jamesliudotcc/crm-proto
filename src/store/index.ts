import Vue from 'vue';
import Vuex from 'vuex';

import { Contact, NewTouch } from '../types';

Vue.use(Vuex);

// TODO: Put the next followup on the touch, not the contact. Only madness this way.
// TODO: Figure out a saner way of dealing with dates. Maybe JS date object will have to do.

export default new Vuex.Store({
  state: {
    touchOptions: ['email', 'coffee', 'meal', 'drink', 'meeting', 'phone'],
    user: {
      // add uuid, email, etc.
      name: 'James',
      contacts: [
        {
          name: 'Bridet',
          company: '', // Eventually factor out
          followUpDate: 1573789615000,
          nextFollowUpShouldBe: 'email',
          // FollowUpDate lives on contact bc any contact should trigger a new followup date
          touches: [
            {
              type: 'coffee',
              date: 1573184815,
              note: 'Talked about Penelope',
            },
          ],
        },
        {
          name: 'Nathan',
          company: 'Algorithmia', // Eventually factor out
          followUpDate: 1573789645000,
          nextFollowUpShouldBe: 'email',
          // FollowUpDate lives on contact bc any contact should trigger a new followup date
          touches: [
            {
              type: 'coffee',
              date: 1573184815,
              note: 'Talked about coding',
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
        nextFollowUpShouldBe: payload.nextFollowUpShouldBe,
        followUpDate: payload.followUpDate,
        touches: [],
      });
    },
    addTouch(state, payload: NewTouch) {
      const thisUser = state.user.contacts[payload.contactId];

      thisUser.touches.push(payload.newTouch);
      thisUser.followUpDate = payload.nextFollowUp;
      thisUser.nextFollowUpShouldBe = payload.nextFollowUpShouldBe;
    },
    // No way to resolve a followup due except by making a new touch!
  },
  actions: {},
  modules: {},
});
