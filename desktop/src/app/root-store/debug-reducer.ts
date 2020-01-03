import { ActionReducer, MetaReducer } from '@ngrx/store'

const reg_action_source = /^\[(\w*)\]/;

export function getDebugMetaReducer (storeId: string) {

    return function  (reducer: ActionReducer<any>): ActionReducer<any>  {
        return function  (state, action)  {

            // meta reducer 会相应所有的action...
            // 但是只会得到注册处的store
            // 为了避免重复log, action.type 里面加上了storeId来判断
            let ret = reg_action_source.exec(action.type)
            if (!ret) return reducer(state, action) // ngrx自带的action不log
            let sourceStore = ret[1]
            if (sourceStore.toLowerCase() !== storeId.toLowerCase()) return reducer(state, action) // action和store要对应


            let timeStamp = (new Date()).toLocaleString()
            console.group(`%cAction:${action.type} ->`, "color: #fff; font-style: italic; background-color: #ff5079;padding: 2px")
            console.log(timeStamp)
            console.group('%cbefore:', "color: #fff;background-color: #00a0e9")
            console.log(state)
            console.groupEnd()

            let payloadKeys = Object.keys(action).filter(k => k!=='type')
            let payload
            if (payloadKeys.length > 0) {
                payload = payloadKeys.reduce((accum, key) => {
                accum[key] = action[key]; 
                return accum
                }, {})
            }

            if (payloadKeys.length > 0) {
                console.group('%cpayload:', "color: #fff;background-color: purple")
                console.log(payload)
                console.groupEnd()
            }

            let modifyed = reducer(state, action);
            console.group('%cafter:', "color: #fff;background-color: #07c160")
            console.log(modifyed)
            console.groupEnd()
            console.groupEnd()

            return modifyed
        }
    }
}