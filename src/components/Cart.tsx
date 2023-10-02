import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, emptyCart } from '../features/createSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../app/store';

type deletePayload = {
    id: number
}

function Cart() {
    const { cart } = useSelector((state: RootState) => state.cartData)
    const dispatch = useDispatch();
    let grandTotal = 0
    cart.map((item) => (
        grandTotal += item.price
    ))

    const handleDelete = (payload: deletePayload) => {
        dispatch(removeFromCart(payload))
    }

    const handleCheckOut = async () => {

        const response = await fetch('http://localhost:8090/api/orderData', {
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
            console.log("fucked up")
        }
    }

    return (
        <div style={{ width: "90%", margin: 'auto' }}>
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
            <div><button onClick={() => handleCheckOut()}>Checkout</button></div>
        </div>
    )
}

export default Cart;
