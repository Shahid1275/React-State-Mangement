import {createStore,combineReducers} from 'redux';


 
const initialStateCustomer = {
    fullName : "",
    nationalId : "",
    createdAt:"",
}

function accountReducer(state = initialStateAccount, action){
   switch(action.type){
    case "account/deposit":
        return{
            ...state,balance: state.balance + action.payload
        }
        case "account/withdraw":
            return{
                ...state,balance: state.balance - action.payload
            }
            case "account/requestLoan":
               if(state.loan > 0) return state;

               return{
                ...state, loan:action.payload.amount,loanPurpose: action.payload.purpose,
                balance:state.balance + action.payload.amount
               }
               case "account/payLoan":
                return{
                    ...state,loan:0,loanPurpose:"",balance:state.balance - state.loan
                }
                default:
 
 
                return state;
   }
}

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
            return{
                ...state,fullName:action.payload.fullName,nationalId:action.payload.nationalId,createdAt:action.payload.createdAt
            }
            case "customer/updateCustomer":
                return{
                    ...state,fullName:action.payload.fullName
                }
                default:
                return state;
    }
}

const rootReducer = combineReducers({customer :customerReducer, account :accountReducer})
const store = createStore(rootReducer);

// store.dispatch({
//     type: "account/deposit",
//     payload: 500
// })

// store.dispatch({
//     type: "account/withdraw",
//     payload:100
// })
// store.dispatch({
//     type: "account/requestLoan",
//     payload:{
//         amount: 1000,
//         purpose: "buying a house"
//     }
// })

// store.dispatch({
//     type: "account/payLoan"
// })
// console.log(store.getState());


function deposit(amount){
    return{
        type: "account/deposit",
        payload: amount
    }
}

function withdraw(amount){
    return{
        type: "account/withdraw",
        payload: amount
    }
}

function requestLoan(amount,purpose){
    return{
        type: "account/requestLoan",
        payload:{amount,purpose}
    }

}

function payLoan(){

    return{
        type: "account/payLoan"
    }
}

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(100));
console.log(store.getState());
store.dispatch(requestLoan(1000,"Buying a house"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName,nationalId){
    return{
        type : "customer/createCustomer",
        payload:{fullName,nationalId ,createdAt : new Date().toISOString()}
    }
}
function updateCustomer(fullName){
    return{
        type : "customer/updateCustomer",
        payload:{fullName}
    }
}


store.dispatch(createCustomer("Ahmed","123456789"));
store.dispatch(deposit(100));

console.log(store.getState());
