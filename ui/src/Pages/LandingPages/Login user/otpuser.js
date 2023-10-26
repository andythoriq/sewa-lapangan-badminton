import React, {useState} from "react";
import OTPInput from "otp-input-react";
import { Button } from "react-bootstrap";
const OTPUser = () => {
  const [OTP, setOTP] = useState('');
  return (
    <>
      <div className="d-flex justify-content-center align-items-center container" height="100vh">
        <div className="card py-5 px-3 p-10" style={{ width: "350px", marginTop: "100px" ,borderRadius: "20px", background: "#fff", border: "2px solid #000", height: "350px", position: "relative" }}>
          <h5 className="m-0 fw-bold">Phone Number verification</h5>
          <span className="mobile-text" style={{ fontSize: "15px" }}>
            Enter the code we just send on your Phone Number <b className="text-danger">+62 86684833</b>
          </span>
          <div className="d-flex flex-row mt-5 ms-2">
            <OTPInput OTPLength={6} otpType="number" value={OTP} />
          </div>
          <Button type="submit" className="btn btn-sm btn-block col-12 mt-2 rounded" style={{ background: "#B21830", color: "white" }}>
            Submit
          </Button>
          <div className="text-center mt-5">
            <span className="d-block mobile-text">Don't receive the code?</span>
            <span className="font-weight-bold text-danger" style={{ cursor: "pointer" }}>Resend</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPUser;
