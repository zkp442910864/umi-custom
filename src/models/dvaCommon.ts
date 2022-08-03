
/** https://www.jianshu.com/p/1ded865efc22 */
export default {
    namespace: 'dvaCommon',
    state: {
        xxxData: {},
    },
    effects: {
        *getXxxData ({payload, callback}, {call, put}) {

            // const response = yield call(window.fetch, '/xxx/xxx', {method: 'POST'});
            yield put({type: 'setXxxData', payload: payload});
        },
    },
    reducers: {
        setXxxData (state, data) {
            return {...state, xxxData: data};
        },
    },
};
