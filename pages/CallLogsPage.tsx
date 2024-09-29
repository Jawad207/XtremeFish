"use client";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment } from "react";
import { Button, Card, Col, Dropdown, Pagination, Row } from "react-bootstrap";

function CallLogsPage() {
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
                      <th scope="row" className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          aria-label="..."
                        />
                      </th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Otp</th>
                      <th>Browser</th>
                      <th>Country</th>
                      <th>State</th>
                      <th className="text-center">Total Sales</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="ps-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            aria-label="..."
                          />
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="avatar avatar-md">
                              <img
                                src={product.imageUrl}
                                alt={product.productName}
                              />
                            </span>
                            <div className="ms-2">
                              <p className="fw-semibold fs-13 mb-0 d-flex align-items-center">
                                <Link scroll={false} href="#!">
                                  {product.productName}
                                </Link>
                              </p>
                              <p className="fs-12 text-muted mb-0">
                                {product.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>
                          <span
                            className={`badge bg-${product.status.toLowerCase()}-transparent`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold fs-13">
                            {product.customerName}
                          </span>
                          <span className="d-block text-muted fs-12">
                            {product.customerEmail}
                          </span>
                        </td>
                        <td>{product.qty}</td>
                        <td>{product.dateOrdered}</td>
                        <td className="text-center">{product.totalSales}</td>
                        <td className="fw-semibold">{product.price}</td>
                        <td>
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
                        </td>
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
