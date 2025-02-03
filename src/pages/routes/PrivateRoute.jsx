import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PrivateRoute = (props) => {
     const pathname = window.location.pathname
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const { Component } = props
     const navigate = useNavigate()
     useEffect(() => {
          if (!localStorage.getItem("token")) {
               return handleShow()
          }

     }, [pathname])
     return (
          <>
               <Modal className='alert-modal h-100 d-flex justify-content-center align-items-center' show={show}>
                    <Modal.Header className='justify-content-center'>
                         <Modal.Title className='text-center'><SlClose /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center mt-3 mb-4'>
                         <h3>Session Expired!</h3>
                         Please sign in to continue!
                    </Modal.Body>
                    <Button variant="primary" onClick={() => {
                         handleClose()
                         navigate("login")
                    }}
                    >
                         Ok
                    </Button>
               </Modal >
               <Component />
          </>

     );
};

export default PrivateRoute;