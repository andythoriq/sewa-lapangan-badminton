import React, { useState } from "react";

const Verification = () => {
  let listData = [{ start: "10-00", finish: "12-00", status: "on progress", price: "Rp150.000", court: "Court A", customer: "Budi - (0892347826382)" }];

  const TableRows = ({ rows }) => {
    return rows.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.start} s/d {val.finish}</td>
          <td>{val.status}</td>
          <td>{val.price}</td>
          <td>{val.court}</td>
          <td className=" d-md-flex justify-content-between">
            <button className="btn btn-sm btn-success">Start Game</button>
            &nbsp;
            <button className="btn btn-sm btn-danger">End Game</button>
          </td>
        </tr>
      );
    });
  };
  const [rows] = useState(listData);

  return (
    <>
      {/* left */}
      <div className="row mt-3">
        <div class="col-lg-3">
          <div class="accordion" id="accordionPayment">
            <div class="accordion-item mb-3">
              <h2 class="h5 px-3 py-3 accordion-header d-flex">
                <div class="form w-100 collapsed">
                  <label className="fw-bold">Check Order</label>
                </div>
              </h2>
              <div id="collapseCC" class="accordion-collapse collapse show" data-bs-parent="#accordionPayment">
                <div class="accordion-body">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Order Code</label>
                      <input type="text" class="form-control" placeholder="Order Code" />
                    </div>
                  </div>
                  <button class="btn btn-danger btn-sm w-100 mt-2">Cek Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div class="col-lg-9">
          <div class="card position-sticky">
            <div class="p-3 bg-light bg-opacity-10 d-md-flex justify-content-between">
              <div class="px-3 my-3 text-center">
                <div class="cart-item-label">Booking Code</div>
                <span class="text-xl font-weight-medium">....</span>
              </div>
              <div class="px-3 my-3 text-center">
                <div class="cart-item-label">Total Hour</div>
                <span class="text-xl font-weight-medium">...</span>
              </div>
              <div class="px-3 my-3 text-center">
                <div class="cart-item-label">Total Price</div>
                <span class="text-xl font-weight-medium">...</span>
              </div>
              <div class="px-3 my-3 text-center">
                <div class="cart-item-label">Customer</div>
                <span class="text-xl font-weight-medium">...</span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive p-3">
                  <table className="table table-hover mt-2" border={1}>
                    <thead>
                      <tr>
                        <th width={"1%"}>Id</th>
                        <th width={"10%"}>Start - Finish</th>
                        <th width={"10%"}>Status</th>
                        <th width={"10%"}>Price</th>
                        <th width={"10%"}>Court</th>
                        <th width={"9%"} className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <TableRows rows={rows} />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
