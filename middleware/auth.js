import _ from "lodash"
import { auth } from '@/services/fireinit.js'

export default function ({ redirect, route }) {
    return new Promise(async (resolve, reject) => {
        let response = await checkAuth()
        if (response !== null) {
            if (typeof checkRoutes(route.name) !== 'undefined') {
                resolve(redirect('/'))
            } else {
                resolve()
            }
        } else {
            if (typeof checkRoutes(route.name) !== 'undefined') {
                resolve()
            } else {
                resolve(redirect('/login'))
            }
        }
    })
}

function checkRoutes(routeName) {
    const notAuthRoutes = [
        'login',
        'forgot-password'
    ]
    return _.find(notAuthRoutes, function (item) {
        return item === routeName
    })
}

function checkAuth() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            resolve(user)
        })
    })
}