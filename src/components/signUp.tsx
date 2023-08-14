import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface SignUpProps {
    onClose: () => void
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
    const history = useNavigate();
    const [open, setOpen] = useState(true);
    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <input type='email' placeholder="Enter Email"></input>
                    <input type='password' placeholder="Set password"></input>
                    <input type='text' placeholder="Enter location"></input>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}>SignUp</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignUp
