import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader/Loading";

const Profile = () => {
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    axios.get('/api/me-admin', {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    })
      .then(({ data }) => {
        setAdmin(data)
      })
      .catch((e) => {
        Swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      });
  }, [])

  const TableRows = ({ rows }) => {
    return rows.map((val, index) => {
      return (
        <tr key={val.id}>
          <td>{index + 1}</td>
          <td>{val.start}</td>
          <td>{val.finish}</td>
          <td>{val.status}</td>
          <td>{val.price}</td>
        </tr>
      )
    });
  }

  return ( admin && admin.role && admin.rentals ?
    <>
      <div className="py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card card-profile text-center p-5">
              <div className="card-body">
                <img src="./assets/icon/owl.png" alt="user" className="img img-thumbnail rounded-circle w-50" />
                <h2>{admin.name}</h2>
                <Link to={'/formprofile/edit'} className="btn btn-sm add" style={{ background: "#B21830", color: "white" }}>
                       Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row">
              <div className="shadow border rounder p-5 mb-1 bg-white">
                <h2>Details</h2>
                <b className="mt-3">Full Name:</b> {admin.name}<br />
                <b className="mt-3">Username:</b> {admin.username}<br />
                <b className="mt-3">Phone number:</b> {admin.phone_number}<br />
                <b className="mt-3">Status:</b> {admin.status === 'Y' ? 'active' : 'in active'}<br />
                <b className="mt-3">Role:</b> {admin.role?.label}<br />
              </div>
            </div>
            <div className="row">
              <div className="table-responsive">
                <table className="table table-hover mt-4" border={1}>
                  <thead>
                    <tr>
                      <th width={'1%'}>No</th>
                      <th width={'30%'}>start</th>
                      <th width={'30%'}>finish</th>
                      <th width={'10%'}>status</th>
                      <th width={'19%'}>price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRows
                      rows={admin.rentals}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> : <Loader />
  );
};

export default Profile;
