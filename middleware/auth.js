import _ from "lodash"

export default function ({ store, redirect, route }) {
    store.state.user != null && typeof checkRoutes(route.name) !== 'undefined' ? redirect('/') : ''
    store.state.user == null && typeof checkRoutes(route.name) === 'undefined' ? redirect('/login') : ''
}

function checkRoutes (routeName) {
    const notAuthRoutes = [
        'login',
        'forgot-password'
    ]
    return _.find(notAuthRoutes, function (item) {
        return item === routeName
    })
}