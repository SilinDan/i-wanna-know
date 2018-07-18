import modelsCreator from 'Utils/models';
import demoServices from '../services/demo';

export default modelsCreator({

  namespace: 'demo',

  state: {

  },

  effects: {
    fetch: {
      service: demoServices.fetch,
      save: 'oneState',
    },
  },

});
