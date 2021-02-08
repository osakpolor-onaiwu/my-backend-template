import axios from 'axios';

const GetCustomers = () => {
  return (dispatch) => {
    axios
      .get('/foodblog/api/customers')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'GET_CUSTOMER',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'GET_CUSTOMER_ERR',
          err,
        });
      });
  };
};

export default GetCustomers;
