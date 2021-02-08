import axios from 'axios'


 const AddCustomers = (customer) =>{
    return async (dispatch)=>{
       await axios.post("/foodblog/api/customers",customer)
        .then(res=>{
            dispatch({
                type:'ADD_CUSTOMER',
                payload:res.data
            })
        })
        .catch(err=>{
             dispatch({
                type:'ADD_CUSTOMER_ERR',
                err
            })
        })
    }
}

export default AddCustomers