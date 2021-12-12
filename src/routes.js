
export const Routes = {
    // pages
    Presentation: { path: "/" },
    DashboardOverview: { path: "/dashboard/overview" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" },

    // dashboard
    User: { path: '/user' },
    AddUser: { path: '/user/add' },
    UserDetail: {path: '/user/:id'},
    EditUser: {path: '/user/edit/:id'},
    ChangePassword: {path: '/user/change-password'},

    // Coming dispatch management
    ComingDispatchManagement: { path: '/coming-dispatch'},
    AddComingDispatch: { path: '/coming-dispatch/add'},
    ComingDispatchDetail: {path: '/coming-dispatch/:id'},
    EditComingDispatch: {path: '/coming-dispatch/edit/:id'},

    // Out going dispatch management
    OutGoingDispatchManagement: { path: '/out-going-dispatch'},
    AddOutGoingDispatch: { path: '/out-going-dispatch/add'},
    OutGoingDispatchDetail: {path: '/out-going-dispatch/:id'},
    EditOutGoingDispatch: {path: '/out-going-dispatch/edit/:id'},

    // published dispatch
    PublishedDispatchDetail: { path: '/published-dispatch/:id' },
};