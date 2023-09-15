import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react'
import { RootState } from '../app/store';
function Cart() {
    const { cart } = useSelector((state: RootState) => state.cartData)

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cart.map((item) => (

                                <TableRow>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>

                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Cart;
