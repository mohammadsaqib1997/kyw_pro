import { auth, DB } from '@/services/fireinit.js'


export const state = () => ({
    page_loading: true,
    user: null,
    userData: null
})

export const getters = {
    activeUser: (state, getters) => {
        return state.user
    }
}

export const mutations = {
    setPageLoading: (state, payload) => {
        state.page_loading = payload
    },
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
            DB.ref('Users').child(state.user.uid).once('value', snap => {
                commit('setUserData', snap.val())
                resolve()
            })
        })
    },

    authCheck: ({ dispatch }) => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(user => {
                dispatch('autoSignIn', user)
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