export type TouchTypes = 'email' | 'coffee' | 'meal' | 'drink' | 'meeting' | 'phone';

export interface Contact {
  name: string;
  company: string;
  followUpDate: number;
  nextFollowUpShouldBe: TouchTypes;
  touches: TouchTypes[];
}

export interface Touch {
  type: TouchTypes;
  date: number;
  note: string;
  // New fields should be added for tracking
}

export interface NewTouch {
  contactId: number;
  nextFollowUp: number;
  nextFollowUpShouldBe: TouchTypes;
  newTouch: Touch;
}

export interface User {
  name: string;
  contacts: Contact[];
}
