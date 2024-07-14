export const ROUTE_PATH = {
    root() {
        return '/'
    },
    main() {
        return ROUTE_PATH.root().concat('main')
    },
    signUp() {
        return ROUTE_PATH.root().concat('sign-up')
    },
    signIn() {
        return ROUTE_PATH.root().concat('sign-in')
    },
    forgotPassword() {
        return ROUTE_PATH.root().concat('forgot-password')
    },
}
