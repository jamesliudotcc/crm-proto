export type TouchTypes = 'initial' | 'email' | 'coffee' | 'meal' | 'drink' | 'meeting' | 'phone';

export interface Contact {
  name: string;
  email: string;
  phone: string;
  company: string;
  touches: Touch[];
}

export interface Touch {
  type: TouchTypes;
  date: Date;
  note: string;
  followUpDate: Date;
  nextFollowUpType: TouchTypes;
  // New fields should be added for tracking
}

export interface NewTouch {
  contactId: number;
  newTouch: Touch;
}

export interface User {
  name: string;
  contacts: Contact[];
}
