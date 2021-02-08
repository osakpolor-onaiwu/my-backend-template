import axios from "axios";

const UpdateCustomer = (id, update) => {
    console.log(id);
    return (dispatch) => {
        axios
            .put(`/foodblog/api/customers/${id}`, update)
            .then((res) => {
                dispatch({
                    type: "UPDATE_CUSTOMER",
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "UPDATE_CUSTOMER_ERR",
                    err,
                });
            });
    };
};

export default UpdateCustomer;
