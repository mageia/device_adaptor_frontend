import actions from './actions';
import mutations from './mutations';
import { getToken, getUser} from '@/utils/auth'

const state = {
    token: getToken(),
    user: getUser()
};

export default { namespaced: true, state, mutations, actions };
