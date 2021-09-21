import {takeLatest, call, put} from 'redux-saga/effects';
import axios from "axios";


//this saga/generator function watches for the trigger of the action mentioned 
export function* watcherSaga(){
    yield takeLatest('API_CALL_REQUEST', workerSaga);

}

//api call 
function fetchDog(){
    return axios({
        method: 'GET',
        url: "https://dog.ceo/api/breeds/image/random"
    });
}

//once the above trigger happens this below gen function gets triggered cool

function* workerSaga(){
    try{
        const response = yield(call(fetchDog))
        const dog = response.data.message;

        //dispatch an event that says we got a success response

        yield put({type: "API_CALL_SUCCESS", dog})
    }
    catch(error){yield put({type: "API_CALL_FAILURE", error})}
}


/*To run multiple sagas 
    1. We have to combine all the sagas in generator function as shown below
        function* rootSaga () {
                yield [
                    fork(saga1), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
                    fork(saga2),
                    ];
                }

    2. In main.js/index.js we have to run the sagaMiddleware to run root saga as shown below
        sagaMiddleware.run(rootSaga)


*/