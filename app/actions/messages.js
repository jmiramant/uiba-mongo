/* eslint consistent-return: 0, no-else-return: 0*/
import { MessageTypes } from 'types';

export function dismissMessage() {
  return { type: MessageTypes.DISMISS_MESSAGE };
}


export function dismissError() {
  return { 
      type: MessageTypes.DISMISS_ERROR 
  };  
}

export function createMessage(data) {
  return { 
      type: MessageTypes.CREATE_ERROR,
      data
  };  
}
