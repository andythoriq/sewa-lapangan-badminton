import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const PaymentForm = ({ handleShow, handleClose, deposit, totalPrice }) => {
  const [customerPaid, setCustomerPaid] = useState(0)
  const [customerDeposit, setCustomerDeposit] = useState(0)

  const [showUseDeposit, setShowUseDeposit] = useState(false)

  const handleFinishGame = (e) => {
    e.preventDefault()
    console.log('test')
  }

  return (<Modal show={handleShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Payment Form</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <h2>total price: {totalPrice}</h2>
      <label htmlFor="customer_paid">Pay</label>
      <input id="customer_paid" value={customerPaid} onChange={(e) => setCustomerPaid(e.target.value)} />
      
      {(customerPaid < totalPrice && deposit > 0) && <button onClick={() => setShowUseDeposit(true)}>use deposit ?</button> }

      {showUseDeposit === true && <>
        <label htmlFor="customer_deposit">How much deposit ?</label>
        <input id="customer_deposit" value={customerDeposit} onChange={(e) => setCustomerDeposit(e.target.value)} disabled={customerDeposit >= deposit} />
      </>}

      <button onClick={handleFinishGame}>Pay and Finish</button>
    </Modal.Body>
  </Modal>)
}

export default PaymentForm;