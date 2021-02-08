import axios from "axios";

const DeleteCustomers = (id) => {
    console.log(id);
    return (dispatch) => {
        axios
            .delete(`/foodblog/api/customers/${id}`)
            .then((res) => {
                dispatch({
                    type: "DELETE_CUSTOMER",
                    payload: id,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "DELETE_CUSTOMER_ERR",
                    err,
                });
            });
    };
};

export default DeleteCustomers;
