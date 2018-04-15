import _ from "lodash"

export default function ({ store, redirect, route }) {
    return new Promise(async (resolve, reject) => {
        if(store.state.userData === null) {
            await store.dispatch('authSet')
        }
        
        if (resolveRoute(store.state.userData.accType)) {
            resolve()
        }else{
            resolve(redirect('/'))
        }
        
    })
}

function resolveRoute(type) {
    if (type === 4) {
        return true
    }else {
        return false
    }
}

function checkAuth() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            resolve(user)
        })
    })
}