import axiosInstance from "./AxiosInstance";

export const addToCart = (product) => {
    return (dispatch, getState) => {
        const newItem = { id: product.id, name: product.name };
        dispatch(fetchCartItems());
    };
};

export const fetchCartItems = () => {
    return (dispatch, getState) => {
        axiosInstance.get('/cart').then((res) => {
            const fetchedCartItems = res.data;
            dispatch({ type: 'FETCH_CART_ITEMS', payload: fetchedCartItems });
        })
    };
};
