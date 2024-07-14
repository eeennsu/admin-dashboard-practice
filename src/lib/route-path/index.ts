const companies = {
    root() {
        return ROUTE_PATH.root().concat('companies')
    },
    list() {
        return companies.root()
    },
    show() {
        return companies.root().concat(`/:id`)
    },
    create() {
        return companies.root().concat('/new')
    },
    edit() {
        return companies.root().concat(`/edit/:id`)
    },
}

const tasks = {
    root() {
        return ROUTE_PATH.root().concat('tasks')
    },
    list() {
        return tasks.root()
    },
    show() {
        return tasks.root().concat(`/:id`)
    },
    create() {
        return tasks.root().concat('/new')
    },
    edit() {
        return tasks.root().concat(`/edit/:id`)
    },
}

export const ROUTE_PATH = {
    root() {
        return '/'
    },
    main() {
        return ROUTE_PATH.root()
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
    companies,
    tasks,
}
