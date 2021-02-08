const initialState = {
    customers: [],
    isLoading:true,
    err: "",
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CUSTOMER":
            return { ...state,customers:[action.payload,...state.customers] };

        case "ADD_CUSTOMER_ERR":
            return { ...state, err: action.err };

        case "GET_CUSTOMER":
            console.log(action.payload)
            return { ...state, customers: action.payload,isLoading:false };

        case "GET_CUSTOMER_ERR":
            return { ...state, err: action.err };

       case "DELETE_CUSTOMER":
            return { ...state,
            customers:state.customers.filter(customer=>{return customer._id!==action.payload} )
            };

        case "DELETE_CUSTOMER_ERR":
            return { ...state, err: action.err };


        default:
            return state;
    }
};

export default Reducer;
