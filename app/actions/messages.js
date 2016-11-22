/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'types';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}


export function dismissError() {
  return { 
      type: types.DISMISS_ERROR 
  };  
}

export function createMessage(data) {
  return { 
      type: types.CREATE_ERROR,
      data
  };  
}
