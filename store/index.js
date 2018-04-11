import firebase, { auth } from '@/services/fireinit.js'


export const state = () => ({
    page_loading: true,
    user: null
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
}

export const actions = {
    autoSignIn: ({ commit }, payload) => {
        commit('setUser', payload)
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
                commit('setUser', null)
            }).catch(err => {
                console.log(err)
            })
    }
}

export const strict = false