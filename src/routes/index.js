import UserList from "../views/components/UserList";
import Registration from "../views/components/Registration";

export const routes = [
    {
        path: '/users',
        component: UserList
    },
    {
        path: '/registration',
        component: Registration,
    }
]