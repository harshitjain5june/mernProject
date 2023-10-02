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

interface SignUpProps {
    onClose: () => void
    onOpenLogin: () => void
}

const SignUp: React.FC<SignUpProps> = ({ onClose, onOpenLogin }) => {

    const [formData, setFormData] = useState({ name: "", email: "", password: "", location: "" })
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
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.status >= 200 && response.status < 400) {
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
                <DialogTitle><h4 style={{ color: 'white', fontFamily: 'BricolageGrotesque' }}>Sign Up</h4></DialogTitle>
                <DialogContent>
                    <div >
                        <form className="userForm" onSubmit={submitDetails}>
                            <label htmlFor="name">Name</label>
                            <input required={true} type='text' name='name' value={formData.name} onChange={(e) => setData(e)} placeholder="Enter FullName"></input>
                            <label htmlFor="email">Email</label>
                            <input required={true} type='email' name='email' onChange={(e) => setData(e)} placeholder="Enter Email"></input>
                            <label htmlFor="password">Password</label>
                            <input required={true} type='password' name='password' onChange={(e) => setData(e)} placeholder="Set password"></input>
                            <label htmlFor="location">Location</label>
                            <input required={true} type='text' name='location' onChange={(e) => setData(e)} placeholder="Enter location"></input>
                            <div>
                                <Link to='/login' onClick={()=>{onClose(); onOpenLogin()}}>Already a user?</Link>
                            </div>
                            <DialogActions>
                                <Button className='cancel-btn' style={{ color: 'white' }} onClick={onClose}>Cancel</Button>
                                <Button type='submit' className='Submit-btn' style={{ backgroundColor: 'green', color: 'white' }}>SignUp</Button>
                            </DialogActions>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showSuccessAlert} onClose={closeAlerts} autoHideDuration={3000} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Your Account is created!!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showFailAlert} onClose={closeAlerts} autoHideDuration={3000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Something went wrong. Please try again later.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SignUp
