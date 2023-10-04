import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../../api/axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ handleShow, handleClose, transaction, swal }) => {
  const navigate = useNavigate()

  const transaction_customer_deposit = transaction.customer?.deposit
  const transaction_total_price = transaction.total_price

  const [customerPaid, setCustomerPaid] = useState(0)
  const [depositInput, setDepositInput] = useState(0)

  const [showUseDeposit, setShowUseDeposit] = useState(false)

  const [errorDeposit, setErrorDeposit] = useState('')
  const [ errors, setErrors ] = useState([])

  const validateDepositInput = (e) => {
    const input = e.target.value
    if (input > transaction_customer_deposit) {
      setErrorDeposit('You don\'t have enough deposit money')
    } else if (input <= transaction_customer_deposit) {
      setErrorDeposit('')
    }
    setDepositInput(input)
  }

  const handleFinishGame = async (e) => {
    e.preventDefault()
    try {
      await axios.get('/sanctum/csrf-cookie')
      const dataRequest = {
        customer_paid: customerPaid,
        input_deposit: depositInput,
        customer_deposit: 0,
        total_price: transaction_total_price,
        phone_number: transaction.customer?.phone_number,
        booking_code: transaction.booking_code,
      }
      const configRequest = {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
      }
      if (errorDeposit.length > 0) {
        swal.fire({ icon: "error", title: "Error!", html: errorDeposit, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
      } else if ((+depositInput + +customerPaid) > transaction_total_price) {
        swal.fire({ icon: "warning", title: "Warning!", html: 'Overall cost has exceeded the total price, would you like to keep the rest as a deposit?', showConfirmButton: true, showCancelButton: true, allowOutsideClick: false, allowEscapeKey: false })
        .then(result => {
          if (result.isConfirmed) {
            const rest = (+depositInput + +customerPaid) - transaction_total_price
            dataRequest.customer_deposit = rest
            dataRequest.customer_paid = dataRequest.customer_paid - rest
            axios.post('/api/pay', dataRequest, configRequest).then(({data}) => {
              swal.fire({ icon: "success", title: "Success!", html: data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
                .then((result) => { if (result.isConfirmed) { navigate('/history-booking') } });
            })
          }
        })
      } else {
        const { data } = await axios.post('/api/pay', dataRequest, configRequest)
        swal.fire({ icon: "success", title: "Success!", html: data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
        .then((result) => { if (result.isConfirmed) { navigate('/history-booking') } });
      }
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      } else if (e?.response?.status === 404 || e?.response?.status === 403 || e?.response?.status === 401) {
        swal.fire({icon: "error", title: "Error!", html: e.response.data.message, showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false
        })
      } else {
        swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false })
      }
    }
  }

  return (<Modal show={handleShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Payment Form</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <h2>total price: {new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(transaction_total_price)}</h2>
      <label htmlFor="customer_paid">Pay</label><br />
      <input id="customer_paid" value={customerPaid} onChange={(e) => setCustomerPaid(e.target.value)} />
      {errors.customer_paid && <span className="text-danger">{errors.customer_paid[ 0 ]}</span>}
      {errors.phone_number && <span className="text-danger">{errors.phone_number[ 0 ]}</span>}
      {errors.booking_code && <span className="text-danger">{errors.booking_code[ 0 ]}</span>}
      {(customerPaid < transaction_total_price && transaction_customer_deposit > 0) && <>
        <hr />
        <button onClick={() => {
          setShowUseDeposit(!showUseDeposit)
          setDepositInput('')
        }}>use deposit ?</button>
      </>}
      {(showUseDeposit === true && customerPaid < transaction_total_price && transaction_customer_deposit > 0) && <>
        <hr />
        <h5>You have {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction_customer_deposit)} from deposit</h5>
        <label htmlFor="customer_deposit">How much?</label><br/>
        <input id="customer_deposit" value={depositInput} onChange={validateDepositInput} />
      </>}
      {errorDeposit.length > 0 && <p className="text-danger">{errorDeposit}</p>}
      <hr/>
      <button onClick={handleFinishGame}>Pay</button>
    </Modal.Body>
  </Modal>)
}

export default PaymentForm;