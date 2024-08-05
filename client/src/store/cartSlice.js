import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0,
        totalQuantity: 0
    },
    reducers: {
        addToCart(state, action) {
            console.log(action.payload._id)
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (itemIndex >= 0) {
                state.cartItems.map((item)=>(
                     item._id === action.payload._id ? item.quantity++:item
                ))
            } else {
                state.cartItems.push({...action.payload,quantity:1});
            }
            state.totalPrice += action.payload.price;
            state.totalQuantity += 1;
            console.log(state.totalPrice,"from add to cart")
            localStorage.setItem("cart",state.cartItems);
            localStorage.setItem("totalPrice",state.totalPrice)
            localStorage.setItem("totalQuantity",state.totalQuantity);
            


        },
        removeFromCart(state, action) {
            //find the cart that need to be deleted
            const cartTobeDeleted = state.cartItems.find(
                (cartItem) => cartItem._id === action.payload._id
            )

            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems = nextCartItems;
            state.totalPrice -= ( cartTobeDeleted.price*cartTobeDeleted.quantity);
            state.totalQuantity -= cartTobeDeleted.quantity;

            console.log(state.totalPrice ,"from remove cart")

        },
        increaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                 state.cartItems.map((item)=>(
                     item._id === action.payload._id ? item.quantity++:item
                ))
                state.totalPrice += action.payload.price;
                state.totalQuantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems.map((item)=>(
                    item._id === action.payload._id ? item.quantity > 1 ? item.quantity-- : item.quantity:item
               ))
            } 
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }


    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;