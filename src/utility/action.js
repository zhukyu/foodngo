import axiosInstance from "./AxiosInstance";

// actions.js
export const addToCart = (product) => {
    return (dispatch, getState) => {
        // Gọi API thêm sản phẩm vào giỏ hàng ở đây
        // Sau khi gọi API thành công và nhận được kết quả, gọi action "fetchCartItems" để lấy danh sách giỏ hàng và cập nhật vào Redux state
        // Ví dụ: giả sử kết quả từ API là một đối tượng sản phẩm đã được thêm vào giỏ hàng
        const newItem = { id: product.id, name: product.name };

        // Gọi API thêm sản phẩm vào giỏ hàng ở đây

        // Sau khi gọi API thành công và nhận được kết quả, gọi action "fetchCartItems" để lấy danh sách giỏ hàng và cập nhật vào Redux state
        dispatch(fetchCartItems());
    };
};

export const fetchCartItems = () => {
    return (dispatch, getState) => {
        axiosInstance.get('/cart').then((res) => {
            const fetchedCartItems = res.data; // Kết quả từ API
            dispatch({ type: 'FETCH_CART_ITEMS', payload: fetchedCartItems });
        })
    };
};
