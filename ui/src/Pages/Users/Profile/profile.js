import React from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <div className="py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card card-profile text-center p-5">
              <div className="card-body">
                <img src="./assets/icon/user-circle.png" alt="user" className="img img-thumbnail rounded-circle w-50" />
                <h2>Admeen</h2>
                <Link to={'/formprofile/add'} className="btn btn-danger btn-sm add">
                       Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="shadow border rounder p-5 mb-5 bg-white">
                <h2>Details</h2>
                <b className="mb-2">Account ID:</b><br/>
                <b className="mt-3">Full Name:</b><br/>
                <b className="mt-3">Username:</b><br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
