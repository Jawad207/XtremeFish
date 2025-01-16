"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Pagination } from "react-bootstrap";
import Seo from "@/shared/layout-components/seo/seo";
import moment from "moment";

const RedeemCodePage = () => {
    const codes = 
    [
        {
            id:1,
            date:Date.now(),
            user:"imran1",
            code:63274,
        },
        {
            id:2,
            user:"imran1",
            code:63274,
        },
        {
            id:3,
            user:"imran1",
            code:63274,
        },
        {
            id:4,
            user:"imran1",
            code:63274,
        },
        {
            id:5,
            user:"imran1",
            code:63274,
        },
    ]
  return (
    <Fragment>
      <Seo title={"redeem-codes"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Redeem Codes</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <th>Username</th>
                    <th>Codes</th>
                    <th>Date</th>
                  </thead>
                  <tbody>
                    {codes?.length > 0 &&
                      codes?.map((code: any) => (
                        <tr key={code._id}>
                          <td>{code?.user}</td>
                          <td>{code?.code}</td>
                          <td>{moment(code?.date).format(
                              "ddd, MMM DD, YYYY, hh:mm A"
                            )}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex align-items-center">
                <div>
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  >
                  </nav>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default RedeemCodePage
