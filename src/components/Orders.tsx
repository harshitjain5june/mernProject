import React from 'react'
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState, useEffect } from 'react'

interface OrdersProps {
    onClose: () => void;
}
const Orders: React.FC<OrdersProps> = ({ onClose }) => {
    const [showBackDrop, setShowBackDrop] = useState(true);
    const [ordersData, setOrdersData] = useState<any>([])
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/myOrderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email")
                })
            });
            const data = await response.json();
            setOrdersData(data.orderData.order_data)
        }
        catch (error) {
            console.log("error occured: ", error)
        }
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        console.log(ordersData)
    }, [ordersData])


    return (
        <Dialog open={true} onClose={onClose} PaperProps={{
            style: {
                backgroundColor: "rgb(34, 34, 34)",
                boxShadow: "none"
            },
        }} maxWidth='lg' fullWidth={true}>
            <button
                className='btn bg-danger fs-10'
                style={{ marginLeft: '97%', width: '40px' }}
                onClick={onClose}
            >
                X
            </button>
            <DialogContent>
                <div style={{ padding: '10px', width: '50%' }}>
                    {
                        ordersData.length > 0 ? <div>
                            {ordersData.map((item: any[]) => (
                                <div style={{ border: '2px solid white', padding: '5px', marginBottom: '10px' }}>
                                    <h6 style={{ color: 'white' }}>Order Date: {item[0].Order_date}</h6>
                                    <TableContainer >
                                        <Table>
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>#</TableCell>
                                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>Name</TableCell>
                                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>Quantity</TableCell>
                                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>Size</TableCell>
                                                    <TableCell style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.map((subitem: any, index: number) => (
                                                    index !== 0 ? (
                                                        <TableRow key={index}>
                                                            <TableCell style={{ color: 'white' }}>{index}</TableCell>
                                                            <TableCell style={{ color: 'white' }}>{subitem.name}</TableCell>
                                                            <TableCell style={{ color: 'white' }}>{subitem.quantity}</TableCell>
                                                            <TableCell style={{ color: 'white' }}>{subitem.size}</TableCell>
                                                            <TableCell style={{ color: 'white' }}>{subitem.price}</TableCell>
                                                        </TableRow>
                                                    ) : null
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                            ))}
                        </div> : null
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Orders
