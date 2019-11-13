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
          email: 'bridget.marks@gmail.com',
          phone: '312-507-9511',
          touches: [
            {
              type: 'coffee',
              date: new Date('2019-11-9'),
              note: 'Talked about Penelope',
              followUpDate: new Date('2019-11-16'),
              nextFollowUpType: 'email',
            },
          ],
        },
        {
          name: 'Nathan',
          company: 'Algorithmia', // Eventually factor out
          email: 'lyle.black@gmail.com',
          phone: '',
          // FollowUpDate lives on contact bc any contact should trigger a new followup date
          touches: [
            {
              type: 'coffee',
              date: new Date('2019-11-10'),
              note: 'Talked about coding',
              followUpDate: new Date('2019-11-16'),
              nextFollowUpType: 'email',
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
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        touches: [
          {
            type: payload.touches[0].type,
            date: new Date(),
            note: payload.touches[0].note,
            followUpDate: payload.touches[0].followUpDate,
            nextFollowUpType: payload.touches[0].nextFollowUpType,
          },
        ],
      });
    },
    addTouch(state, payload: NewTouch) {
      const thisUser = state.user.contacts[payload.contactId];

      thisUser.touches.push(payload.newTouch);
    },
  },
  actions: {},
  modules: {},
});
