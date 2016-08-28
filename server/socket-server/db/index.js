import r from 'rethinkdb';

export default {
  connect(settings) {
    return r.connect(Object.assign({}, settings));
  }
};
