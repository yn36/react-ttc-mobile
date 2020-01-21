import {ADDSHOPPING, DELSHOPPING, ADDSUM, DESUM, ISCHECKBOX, CKEALL} from './action-type'

export const addshopping = (item) => ({type: ADDSHOPPING, data: item})
export const delshopping = (store, item) => ({type: DELSHOPPING, data: item, hehe: store})
export const addsum = (item) => ({type: ADDSUM, data: item})
export const desum = (item) => ({type: DESUM, data: item})
export const checkbox = (item) => ({type: ISCHECKBOX, data: item})
export const ckeall = (item, optxt) => ({type: CKEALL, data: item, hehe: optxt})