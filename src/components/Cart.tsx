import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, emptyCart } from '../features/createSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../app/store';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type deletePayload = {
    id: number
}

function Cart() {
    const { cart } = useSelector((state: RootState) => state.cartData)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const dispatch = useDispatch();
    let grandTotal = 0
    cart.map((item) => (
        grandTotal += item.price
    ))
    const handleClose = () => {
        setOrderPlaced(false)
    }
    const handleDelete = (payload: deletePayload) => {
        dispatch(removeFromCart(payload))
    }

    const handleCheckOut = async () => {
        setOrderPlaced(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/OrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    order_data: cart,
                    order_date: new Date().toDateString()
                })
            });
            console.log(response)
            if (response.status === 200) {
                dispatch(emptyCart())
            }
            else {
                console.log("error!!", response.status)
            }
        }
        catch (error) {
            console.log("error occured : ", error)
        }
    }

    return (
        <div style={{ width: "90%", margin: 'auto' }}>
            {cart.length == 0 ? <div style={{ display: 'flex', justifyContent: 'center' }}><h3>Cart is empty</h3></div> :
                <>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}>#</TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}>Name</TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}>Quantity</TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}>Size</TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}>Price</TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    cart.map((item, index) => (

                                        <TableRow>
                                            <TableCell style={{ color: 'white' }}>{index + 1}</TableCell>
                                            <TableCell style={{ color: 'white' }}>{item.name}</TableCell>
                                            <TableCell style={{ color: 'white' }}>{item.quantity}</TableCell>
                                            <TableCell style={{ color: 'white' }}>{item.size}</TableCell>
                                            <TableCell style={{ color: 'white' }}>{item.price}</TableCell>
                                            <TableCell style={{ color: 'white' }}><DeleteIcon sx={{ "&:hover": { color: "red" } }} style={{ cursor: 'pointer' }} onClick={() => handleDelete({ "id": index })} /></TableCell>
                                        </TableRow>

                                    ))

                                }
                                <TableRow>
                                    <TableCell colSpan={4}></TableCell>
                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '20px' }} colSpan={2} >Grand Total: {grandTotal}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                        <button style={{ backgroundColor: '#1F1B24', padding: '5px', borderRadius: '9px', fontSize: 'large', color: 'white' }} onClick={() => handleCheckOut()}>Checkout <ShoppingCartCheckoutIcon style={{ marginLeft: '7px', marginBottom: '2px' }} fontSize='small' /></button>
                    </div>
                </>
            }
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={orderPlaced} autoHideDuration={2000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your Order has been placed!
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Cart;
