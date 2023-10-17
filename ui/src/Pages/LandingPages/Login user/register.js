import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
const Register = () => {
  return (
    <>
      <section className="vh-100" style={{ background: "rgb(245, 245, 245)" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="back">
                      <Link to="/landing-page" className="btnBack">
                        <ArrowLeft className="rounded-circle"style={{ background: "#7F1122", color: "white", width: "30px", height: "30px" }}/>
                      </Link>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration</p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                            <input type="text" id="form3Example1c" className="form-control" />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c">
                              Your Phone Number
                            </label>
                            <PhoneInput placeholder="input phone number" specialLabel={""} country={"id"} value={""} />
                          </div>
                        </div>

                        <div className="mx-3 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-sm" style={{ background: "#7F1122", color: "white" }}>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="./assets/img/sigup.png" className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
