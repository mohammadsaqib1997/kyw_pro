import { auth, DB } from '@/services/fireinit.js'


export const state = () => ({
    user: null,
    userData: null
})

export const getters = {
    activeUser: (state, getters) => {
        return state.user
    }
}

export const mutations = {
    setUser: (state, payload) => {
        state.user = payload
    },
    setUserData: (state, payload) => {
        state.userData = payload
    }
}

export const actions = {
    autoSignIn: ({ commit }, payload) => {
        commit('setUser', payload)
    },

    userDataLoad: ({ commit, state }) => {
        return new Promise((resolve, reject) => {
            if(state.user) {
                DB.ref('Users').child(state.user.uid).once('value', snap => {
                    commit('setUserData', snap.val())
                    resolve()
                })
            }else{
                commit('setUserData', null)
                resolve()
            }
        })
    },

    authSet: ({ dispatch }) => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async user => {
                await dispatch('autoSignIn', user)
                await dispatch('userDataLoad')
                resolve(user)
            })
        })
    },

    signOut: ({ commit }) => {
        auth.signOut()
            .then(() => {
                commit('setUserData', null)
                commit('setUser', null)
            }).catch(err => {
                console.log(err)
            })
    }
}

export const strict = false