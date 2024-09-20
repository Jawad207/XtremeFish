"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { getAlluserCount, getLoginAttempts } from "@/shared/Api/dashboard";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import * as Salesdata from "@/shared/data/dashboards/salesdata";
import DatePicker from "react-datepicker";
import Seo from "@/shared/layout-components/seo/seo";
import { useSelector } from "react-redux";
const Sales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth.user);
  const [allCounts, setAllcounts] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  const getAllusersCount = async () => {
    const allUser = await getAlluserCount(dispatch);
    setAllcounts(allUser);
  };
  const getAllLoginAttempts = async () => {
    const loginAttempt = await getLoginAttempts(auth?.user?._id, dispatch);
  };
  useEffect(() => {
    getAllusersCount();
  }, []);

  useEffect(() => {
    getAllLoginAttempts()
    setUserName(auth?.user?.userName);
  }, [auth]);
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    return lastDayOfMonth;
  });
  return (
    <Fragment>
      <Seo title={"Sales"} />
      {/*  Start::page-header */}
      <div className="d-flex align-items-center justify-content-between my-4 page-header-breadcrumb flex-wrap gap-2">
        <div>
          <p className="fw-medium fs-20 mb-0">{`Hello there, ${userName}`}</p>
          <p className="fs-13 text-muted mb-0">
            Let's make today a productive one!
          </p>
        </div>
      </div>
      {/*  End::page-header */}

      {/*  Start:: row-1 */}
      <Row>
        <Col xxl={3} xl={3} lg={6} md={6} sm={6} className="col-12">
          <Card className="custom-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <div>
                    <span className="d-block mb-2">Total users</span>
                    <h5 className="mb-4 fs-4">{allCounts}</h5>
                  </div>
                  <span className="text-success me-2 fw-medium d-inline-block">
                    <i className="ti ti-trending-up fs-5 align-middle me-1 d-inline-block"></i>
                    0.45%
                  </span>
                  <span className="text-muted">Since last month</span>
                </div>
                <div>
                  <div className="main-card-icon primary">
                    <div className="avatar avatar-lg bg-primary-transparent border border-primary border-opacity-10">
                      <div className="avatar avatar-sm svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={3} xl={3} lg={6} md={6} sm={6} className="col-12">
          <Card className="custom-card main-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <div>
                    <span className="d-block mb-2">Total Accounts</span>
                    <h5 className="mb-4 fs-4">$645</h5>
                  </div>
                  <span className="text-success me-2 fw-medium d-inline-block">
                    <i className="ti ti-trending-up fs-5 align-middle me-1 d-inline-block"></i>
                    0.18%
                  </span>
                  <span className="text-muted">than last month</span>
                </div>
                <div>
                  <div className="main-card-icon secondary">
                    <div className="avatar avatar-lg bg-secondary-transparent border border-secondary border-opacity-10">
                      <div className="avatar avatar-sm svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={3} xl={3} lg={6} md={6} sm={6} className="col-12">
          <Card className="custom-card main-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <div>
                    <span className="d-block mb-2">Subscription expiry</span>
                    <h5 className="mb-4 fs-4">3 months</h5>
                  </div>
                  <span className="text-success me-2 fw-medium d-inline-block">
                    <i className="ti ti-trending-up fs-5 align-middle me-1 d-inline-block"></i>
                    0.29%
                  </span>
                  <span className="text-muted">Since last month</span>
                </div>
                <div>
                  <div className="main-card-icon success">
                    <div className="avatar avatar-lg bg-success-transparent border border-success border-opacity-10">
                      <div className="avatar avatar-sm svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M200,168a48.05,48.05,0,0,1-48,48H136v16a8,8,0,0,1-16,0V216H104a48.05,48.05,0,0,1-48-48,8,8,0,0,1,16,0,32,32,0,0,0,32,32h48a32,32,0,0,0,0-64H112a48,48,0,0,1,0-96h8V24a8,8,0,0,1,16,0V40h8a48.05,48.05,0,0,1,48,48,8,8,0,0,1-16,0,32,32,0,0,0-32-32H112a32,32,0,0,0,0,64h40A48.05,48.05,0,0,1,200,168Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xxl={3} xl={3} lg={6} md={6} sm={6} className="col-12">
          <Card className="custom-card main-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <div>
                    <span className="d-block mb-2">Views</span>
                    <h5 className="mb-4 fs-4">4,678</h5>
                  </div>
                  <span className="text-danger me-2 fw-medium d-inline-block">
                    <i className="ti ti-trending-down fs-5 align-middle me-1 d-inline-block"></i>
                    0.05%
                  </span>
                  <span className="text-muted">Since last month</span>
                </div>
                <div>
                  <div className="main-card-icon orange">
                    <div className="avatar avatar-lg bg-orange-transparent border border-orange border-opacity-10">
                      <div className="avatar avatar-sm svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      {/*  End:: row-1 */}

      {/*  Start:: row-2 */}
      <Row>
        <Col xl={9}>
          <Card className="custom-card overflow-hidden sales-statistics-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Accounts Statistics</Card.Title>
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  href="#!"
                  className="p-2 fs-12 text-muted no-caret border-0 d-inline"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  Sort By{" "}
                  <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu role="menu">
                  <li>
                    <Dropdown.Item href="#!">This Week</Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#!">Last Week</Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#!">This Month</Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body className="position-relative p-0">
              <div id="sales-statistics">
                <ReactApexChart
                  options={Salesdata.Statistics1.options}
                  series={Salesdata.Statistics1.series}
                  type="area"
                  width={"100%"}
                  height={220}
                />
              </div>
              <div id="sales-statistics1">
                <ReactApexChart
                  options={Salesdata.Statistics2.options}
                  series={Salesdata.Statistics2.series}
                  type="line"
                  width={"100%"}
                  height={280}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>Reviews</Card.Title>
            </Card.Header>
            <Card.Body>
              <div id="top-categories">
                <ReactApexChart
                  options={Salesdata.Salescategories.options}
                  series={Salesdata.Salescategories.series}
                  type="radar"
                  width={"100%"}
                  height={280}
                />
              </div>
              <div className="row mt-0">
                <div className="col-6 border-end border-inline-end-dashed text-center">
                  <p className="text-muted mb-1 fs-12">This Month</p>
                  <h6 className="text-success">+74.83%</h6>
                </div>
                <div className="col-6 text-center">
                  <p className="text-muted mb-1 fs-12">Last Month</p>
                  <h6 className="text-primary">+56.90%</h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/*  End:: row-2 */}

      {/*  Start:: row-3 */}
      <Row>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>Posts</Card.Title>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled recent-activity-list">
                <li>
                  <div>
                    <h6 className="mb-1 fs-13">
                      John Doe
                      <span className="fs-11 text-muted float-end">
                        12:47PM
                      </span>
                    </h6>
                    <span className="d-block fs-13 text-muted fw-normal">
                      Updated profile picture
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <h6 className="mb-1 fs-13">
                      Jane Smith
                      <span className="fs-11 text-muted float-end">
                        10:22AM
                      </span>
                    </h6>
                    <span className="d-block fs-13 text-muted mb-1 fw-normal">
                      Posted a{" "}
                      <span className="text-warning fw-medium">new status</span>
                    </span>
                    <div className="p-2 rounded-1 bg-light fs-13">
                      Enjoying the weekend vibes &#127774;
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <h6 className="mb-1 fs-13">
                      Alice Johnson
                      <span className="fs-11 text-muted float-end">
                        11:45AM
                      </span>
                    </h6>
                    <span className="d-block fs-13 text-muted fw-normal">
                      Commented on a photo -{" "}
                      <span className="fw-medium text-success">
                        "Beautiful"
                      </span>
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <h6 className="mb-1 fs-13">
                      Charlie Brown
                      <span className="fs-11 text-muted float-end">
                        04:15PM
                      </span>
                    </h6>
                    <span className="d-block fs-13 text-muted fw-normal">
                      Shared an article
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <h6 className="mb-1 fs-13">
                      Bob Anderson
                      <span className="fs-11 text-muted float-end">
                        10:54AM
                      </span>
                    </h6>
                    <span className="d-block fs-13 text-muted fw-normal">
                      Liked a post from{" "}
                      <span className="badge bg-secondary-transparent">
                        John Doe
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Header className="justify-content-between">
              <Card.Title>RECENT LOGINS</Card.Title>
              <Link scroll={false} href="#!" className="fs-12 text-muted">
                {" "}
                View All<i className="ti ti-arrow-narrow-right ms-1"></i>{" "}
              </Link>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Payment Mode</th>
                      <th scope="col">Amount Paid</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          scroll={false}
                          href="#!"
                          className="fw-medium fs-13"
                        >
                          SPK-9ABC
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-start gap-2">
                          <div>
                            <span className="avatar avatar-sm bg-primary-transparent">
                              <i className="ri-paypal-line fs-18"></i>
                            </span>
                          </div>
                          <div>
                            <span className="d-block fw-medium mb-1">
                              Paypal ****2783
                            </span>
                            <span className="d-block fs-11 text-muted">
                              Online Transaction
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="d-block fw-medium mb-1">
                            $1,234.78
                          </span>
                          <span className="d-block fs-11 text-muted">
                            Nov 22,2024
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-primary">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          scroll={false}
                          href="#!"
                          className="fw-medium fs-13"
                        >
                          SPK-3SFW
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-start gap-2">
                          <div>
                            <span className="avatar avatar-sm bg-secondary-transparent">
                              <i className="ri-wallet-3-line fs-18"></i>
                            </span>
                          </div>
                          <div>
                            <span className="d-block fw-medium mb-1">
                              Digital Wallet
                            </span>
                            <span className="d-block fs-11 text-muted">
                              Online Transaction
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="d-block fw-medium mb-1">
                            $623.99
                          </span>
                          <span className="d-block fs-11 text-muted">
                            Nov 22,2024
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          scroll={false}
                          href="#!"
                          className="fw-medium fs-13"
                        >
                          SPK-6SKF
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-start gap-2">
                          <div>
                            <span className="avatar avatar-sm bg-success-transparent">
                              <i className="ri-mastercard-line fs-18"></i>
                            </span>
                          </div>
                          <div>
                            <span className="d-block fw-medium mb-1">
                              Mastro Card ****7893
                            </span>
                            <span className="d-block fs-11 text-muted">
                              Card Payment
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="d-block fw-medium mb-1">$1,324</span>
                          <span className="d-block fs-11 text-muted">
                            Nov 21,2024
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-success">Cancelled</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          scroll={false}
                          href="#!"
                          className="fw-medium fs-13"
                        >
                          SPK-3ESD
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-start gap-2">
                          <div>
                            <span className="avatar avatar-sm bg-orange-transparent">
                              <i className="ti ti-currency-dollar fs-18"></i>
                            </span>
                          </div>
                          <div>
                            <span className="d-block fw-medium mb-1">
                              Cash On Delivery
                            </span>
                            <span className="d-block fs-11 text-muted">
                              Pay On Delivery
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="d-block fw-medium mb-1">
                            $1,123.49
                          </span>
                          <span className="d-block fs-11 text-muted">
                            Nov 20,2024
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-orange">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-bottom-0 fs-13">
                        <Link
                          scroll={false}
                          href="#!"
                          className="fw-medium fs-13"
                        >
                          SPK-3KSE
                        </Link>
                      </td>
                      <td className="border-bottom-0">
                        <div className="d-flex align-items-start gap-2">
                          <div>
                            <span className="avatar avatar-sm bg-info-transparent">
                              <i className="ri-visa-line fs-18"></i>
                            </span>
                          </div>
                          <div>
                            <span className="d-block fw-medium mb-1">
                              Visa Card ****2563
                            </span>
                            <span className="d-block fs-11 text-muted">
                              Card Payment
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border-bottom-0">
                        <div>
                          <span className="d-block fw-medium mb-1">$1,289</span>
                          <span className="d-block fs-11 text-muted">
                            Nov 18,2024
                          </span>
                        </div>
                      </td>
                      <td className="border-bottom-0">
                        <span className="text-info">Cancelled</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>TOP COUNTRY SALES</Card.Title>
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  href="#!"
                  className="fs-12 text-muted p-2 no-caret border-0 d-inline"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  Sort By{" "}
                  <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu role="menu">
                  <li>
                    <Dropdown.Item href="#!">This Week</Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#!">Last Week</Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#!">This Month</Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0 top-country-sales">
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/us_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">
                        United States
                      </span>
                      <span className="d-block text-muted fs-11">
                        32,190 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-success fw-medium">
                        <i className="ti ti-arrow-narrow-up"></i>0.27%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $32,190
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/germany_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">Germany</span>
                      <span className="d-block text-muted fs-11">
                        8,798 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-success fw-medium">
                        <i className="ti ti-arrow-narrow-up"></i>0.12%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $29,234
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/mexico_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">Mexico</span>
                      <span className="d-block text-muted fs-11">
                        16,885 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-danger fw-medium">
                        <i className="ti ti-arrow-narrow-down"></i>0.75%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $26,166
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/uae_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">Uae</span>
                      <span className="d-block text-muted fs-11">
                        14,885 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-success fw-medium">
                        <i className="ti ti-arrow-narrow-up"></i>1.45%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $24,263
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/argentina_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">Argentina</span>
                      <span className="d-block text-muted fs-11">
                        17,578 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-success fw-medium">
                        <i className="ti ti-arrow-narrow-up"></i>0.36%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $23,897
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start flex-wrap gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm avatar-rounded text-default p-1 bg-light border">
                        <img
                          src="../../assets/images/flags/russia_flag.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex-fill lh-1">
                      <span className="fw-medium mb-2 d-block">Russia</span>
                      <span className="d-block text-muted fs-11">
                        10,118 Sales
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-10 text-danger fw-medium">
                        <i className="ti ti-arrow-narrow-down"></i>0.68%
                      </span>
                      <span className="text-default fs-13 fw-semibold ms-2">
                        $20,212
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      {/*  End:: row-3 */}

      {/*  Start:: row-4 */}
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>RECENT ORDERS</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    href="#!"
                    className="btn btn-primary btn-sm btn-wave waves-effect waves-light no-caret"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    Sort By
                    <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu role="menu">
                    <li>
                      <Dropdown.Item href="#!">New</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item href="#!">Popular</Dropdown.Item>
                    </li>
                    <li>
                      <Dropdown.Item href="#!">Relevant</Dropdown.Item>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
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
                          id="checkboxNoLabeljob1"
                          value=""
                          aria-label="..."
                        />
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col">Category</th>
                      <th scope="col">Status</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Date Ordered</th>
                      <th scope="col" className="text-center">
                        Total Sales
                      </th>
                      <th scope="col">Price</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob2"
                          value=""
                          aria-label="..."
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/1.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold fs-13 mb-0 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Flower Pot
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Accusam Brand
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>Furniture</td>
                      <td>
                        <span className="badge bg-primary-transparent">
                          Pending
                        </span>
                      </td>
                      <td>
                        <span className="d-block fw-semibold fs-13">
                          Mayor Kelly
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          mayorkelly213@gmail.com
                        </span>
                      </td>
                      <td>6</td>
                      <td>03 Sep 2024</td>
                      <td className="text-center">10</td>
                      <td className="fw-semibold">$15,000</td>
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
                    <tr>
                      <td className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob3"
                          value=""
                          aria-label="..."
                          defaultChecked
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/2.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold fs-13 mb-0 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Head Phones
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">
                              Vellintn Brand
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>Electronics</td>
                      <td>
                        <span className="badge bg-success-transparent">
                          Processing
                        </span>
                      </td>
                      <td>
                        <span className="d-block fw-semibold fs-13">
                          Andrew Garfield
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          andrewgarfield1994@gmail.com
                        </span>
                      </td>
                      <td>1</td>
                      <td>05 Oct 2024</td>
                      <td className="text-center">20</td>
                      <td className="fw-semibold">$25,000</td>
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
                    <tr>
                      <td className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob4"
                          value=""
                          aria-label="..."
                          defaultChecked
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/4.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold mb-0 fs-13 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Kiwi Fruit
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">Top Brand</p>
                          </div>
                        </div>
                      </td>
                      <td>Food</td>
                      <td>
                        <span className="badge bg-secondary-transparent">
                          Shipped
                        </span>
                      </td>
                      <td>
                        <span className="d-block fw-semibold fs-13">
                          Simon Cowel
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          simoncowel26@gmail.com
                        </span>
                      </td>
                      <td>2</td>
                      <td>13 Nov 2024</td>
                      <td className="text-center">27</td>
                      <td className="fw-semibold">$43,000</td>
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
                    <tr>
                      <td className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob5"
                          value=""
                          aria-label="..."
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/5.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold mb-0 fs-13 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Donut
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">Erat Brand</p>
                          </div>
                        </div>
                      </td>
                      <td>Food</td>
                      <td>
                        <span className="badge bg-warning-transparent">
                          On Hold
                        </span>
                      </td>
                      <td>
                        <span className="d-block fw-semibold fs-13">
                          Mirinda Hers
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          mirindahers@hotmail.com
                        </span>
                      </td>
                      <td>2</td>
                      <td>15 Dec 2024</td>
                      <td className="text-center">34</td>
                      <td className="fw-semibold">$10,000</td>
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
                    <tr>
                      <td className="ps-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob6"
                          value=""
                          aria-label="..."
                          defaultChecked
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/2.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold mb-0 fs-13 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Head Phones
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">Boalt Audio</p>
                          </div>
                        </div>
                      </td>
                      <td>Electronics</td>
                      <td>
                        <span className="badge bg-info-transparent">
                          Delivered
                        </span>
                      </td>
                      <td>
                        <span className="d-block fw-semibold fs-13">
                          Alicia Keys
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          aliciakeys@gmail.com
                        </span>
                      </td>
                      <td>1</td>
                      <td>28 Dec 2024</td>
                      <td className="text-center">77</td>
                      <td className="fw-semibold">$4,000</td>
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
                    <tr>
                      <td className="ps-4 border-bottom-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkboxNoLabeljob7"
                          value=""
                          aria-label="..."
                        />
                      </td>
                      <td className="border-bottom-0">
                        <div className="d-flex">
                          <span className="avatar avatar-md">
                            <img
                              src="../../assets/images/ecommerce/jpg/3.jpg"
                              className=""
                              alt="..."
                            />
                          </span>
                          <div className="ms-2">
                            <p className="fw-semibold mb-0 fs-13 d-flex align-items-center">
                              <Link scroll={false} href="#!">
                                Camera
                              </Link>
                            </p>
                            <p className="fs-12 text-muted mb-0">Analog.Comp</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-bottom-0">Electronics</td>
                      <td className="border-bottom-0">
                        <span className="badge bg-danger-transparent">
                          Cancelled
                        </span>
                      </td>
                      <td className="border-bottom-0">
                        <span className="d-block fw-semibold fs-13">
                          Jeremy Lewis
                        </span>
                        <span className="d-block text-muted fs-12 fw-normal">
                          jeremylewis2000@gmail.com
                        </span>
                      </td>
                      <td className="border-bottom-0">3</td>
                      <td className="border-bottom-0">15 Dec 2024</td>
                      <td className="border-bottom-0 text-center">19</td>
                      <td className="fw-semibold border-bottom-0">$16,000</td>
                      <td className="border-bottom-0">
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
      {/*  End:: row-4 */}
    </Fragment>
  );
};

export default Sales;
