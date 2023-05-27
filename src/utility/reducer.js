// reducer.js
const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
