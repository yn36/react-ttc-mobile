import {ADDSHOPPING, DELSHOPPING, ADDSUM, DESUM, ISCHECKBOX, CKEALL} from './action-type'

const shopping = []

export default function addshopping(store = shopping, action) {
    switch (action.type) {
        case ADDSHOPPING:
            let newState = JSON.parse(JSON.stringify(store));
            newState.push(action.data);
            return newState;

        case DELSHOPPING:
            let delState = JSON.parse(JSON.stringify(store));

            let del = delState.findIndex((item) => {
                return item.id === action.data.id
            })
            delState.splice(del, 1)
            return delState;

        case ADDSUM:
            let addState = JSON.parse(JSON.stringify(store));
            let add = addState.findIndex((item) => {
                return item.id === action.data.id
            })
            addState[add].sum++
            return addState
        case DESUM:
            let deState = JSON.parse(JSON.stringify(store));

            let de = deState.findIndex((item) => {
                return item.id === action.data.id
            })

            if (deState[de].sum <= 1) {
                deState[de].sum = 1
            } else {
                deState[de].sum--
            }

            return deState

        case ISCHECKBOX:
            let ischeckbox = JSON.parse(JSON.stringify(store))

            let is = ischeckbox.findIndex((item) => {
                return item.id === action.data.id
            })

            if (ischeckbox[is].isfalse) {
                ischeckbox[is].isfalse = false
            } else {
                ischeckbox[is].isfalse = true
            }

            return ischeckbox
        case CKEALL:
            let ckeall = JSON.parse(JSON.stringify(store))

            for (let i = 0; i < ckeall.length; i++) {
                ckeall[i].isfalse = action.hehe
            }
            return ckeall
        default:
            return store
    }
}
