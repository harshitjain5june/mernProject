import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Link } from 'react-router-dom'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import '../styles/user.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface LoginProps {
    onClose: () => void;
    onOpenSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onOpenSignUp }) => {

    const [formData, setFormData] = useState({ email: "", password: ""})
    const open = true;
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailAlert, setShowFailAlert] = useState(false);

    const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const closeAlerts = () => {
        setShowFailAlert(false);
        setShowSuccessAlert(false);
    };

    const submitDetails = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);
        const response = await fetch('http://localhost:8090/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json()
        if (response.status >= 200 && response.status < 400) {
            console.log("auth",json.authToken);
            localStorage.setItem("authToken", json.authToken)
            setTimeout(() => {
                onClose();
            }, 1000)
            console.log(response);
            setShowSuccessAlert(true);
        }
        else {
            console.log(response);
            setShowFailAlert(true);
        }
    }


    return (
        <div className='dialog-user-details'>
            <Dialog PaperProps={{ style: { backgroundColor: '#0F1924' } }} maxWidth='sm' fullWidth={true} open={open} onClose={onClose}>
                <DialogTitle><h4 style={{ color: 'white', fontFamily: 'BricolageGrotesque' }}>Login</h4></DialogTitle>
                <DialogContent>
                    <div >
                        <form className="userForm" onSubmit={submitDetails}>

                            <label htmlFor="email">Email</label>
                            <input required={true} type='email' name='email' onChange={(e) => setData(e)} placeholder="Enter Email"></input>
                            <label htmlFor="password">Password</label>
                            <input required={true} type='password' name='password' onChange={(e) => setData(e)} placeholder="Set password"></input>

                            <div>
                                <Link to='/signup' onClick={() => { onClose(); onOpenSignUp() }}>Create a new account</Link>
                            </div>
                            <DialogActions>
                                <Button className='cancel-btn' style={{ color: 'white' }} onClick={onClose}>Cancel</Button>
                                <Button type='submit' className='Submit-btn' style={{ backgroundColor: 'green', color: 'white' }}>Login</Button>
                            </DialogActions>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showSuccessAlert} onClose={closeAlerts} autoHideDuration={4000} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    You are logged in!!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showFailAlert} onClose={closeAlerts} autoHideDuration={3000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Invalid Credentials.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login
