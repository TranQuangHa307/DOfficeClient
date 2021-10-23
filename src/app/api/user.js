import { get } from './sender';

const GET_USER_LIST = '/users'

export const listUser = () => {
    return get(GET_USER_LIST);
}