import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import createState from './state';


export default () => ({
  namespaced: true,
  actions,
  mutations,
  getters,
  state: createState(),
});
