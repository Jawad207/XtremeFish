"use client";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useState } from "react";
import { Button, Col, Nav, Row, Tab, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "@/shared/Api/auth";
import moment from "moment";
import { FaSpinner } from "react-icons/fa";
import Success from "@/components/SuccessPop";

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(
    auth?.user?.subscription?.type ?? "Basic"
  );

  const updateSubscription = async (type: any, duration: any) => {
    let expireDate;
    let currentDate = new Date();

    expireDate = new Date(currentDate);

    expireDate.setMonth(currentDate.getMonth() + duration);
    const payload = {
      startDate: currentDate,
      expireDate,
      type,
      duration,
      active: true,
    };
    setLoading(type);
    const profile = await editProfile(
      { ...auth?.user, subscription: payload },
      dispatch
    );
    if (profile?.status == 200) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false)
      }, 2000);
      setLoading(null);
    }
  };

  const handleRedeemCode = ()=> {

  }

  return (
    <Fragment>
      <Success
        isOpen={open}
        title={"🎉 Congratulations!"}
        description={"Your subscription has been activated successfully. Enjoy exclusive features and benefits!"}
      />
      {/* Page Header */}
      <Seo title={"Subscription"} />
      <Pageheader
        Heading="Pricing"
        Pages={[
          { title: "Dashboard", active: true },
          { title: "Subscription", active: false },
        ]}
        v2={false}
      />
      {/* Page Header Close */}

      {/* Start:: row-1 */}
      <div className="row d-flex align-items-center justify-content-center mb-5">
        <Col lg={8} xl={4} xxl={4} md={8} sm={12} className="">
          <div
            className={`card custom-card pricing-card cursor-pointer ${
              selectedPlan == "Basic" ? "hover" : ""
            }`}
            onClick={() => setSelectedPlan("Basic")}
          >
            <div className="card-body p-5">
              <div className="text-center">
                <h4 className="fw-medium mb-1">Basic</h4>
                <span className="mb-1 text-muted d-block">
                  Essential features for a magical start
                </span>
                <h2 className="mb-0 fw-bold d-block text-gradient">
                  $35/
                  <span className="fs-12 text-default fw-medium ms-1">
                    Price Per Month
                  </span>
                </h2>
              </div>
              <hr className="border-top my-4" />
              <ul className="list-unstyled pricing-body">
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Unlimited Support
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Always Updated Links</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Database lookup
                    </span>
                    <span className="badge bg-light text-default rounded-pill border">
                      <i className="ri-flashlight-fill text-warning me-1"></i>
                      coming soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Subscriber rank</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Instant Support</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Url Shortner</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Mailer tool</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
              </ul>
              <hr className="border-top my-4" />

              <Button
                variant=""
                type="button"
                className="btn btn-lg btn-outline-primary d-grid w-100 btn-wave"
                onClick={() => updateSubscription("basic", 1)}
              >
                {loading == "basic" ? (
                  <span className="ms-4 me-4">
                    {" "}
                    <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                    Loading...
                  </span>
                ) : (
                  <span className="ms-4 me-4">Start Today</span>
                )}
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={8} xl={4} xxl={4} md={8} sm={12} className="">
          <div
            className={`card custom-card pricing-card cursor-pointer ${
              selectedPlan == "Pro" ? "hover" : ""
            }`}
            onClick={() => setSelectedPlan("Pro")}
          >
            <div className="card-body p-5">
              <div className="ribbon-2 ribbon-primary ribbon-right">
                Best Plan
              </div>
              <div className="text-center">
                <h4 className="fw-medium mb-1">Pro</h4>
                <span className="mb-1 text-muted d-block">
                  Next-level tools for advanced users
                </span>
                <h2 className="mb-0 fw-bold d-block text-gradient">
                  $80/
                  <span className="fs-12 text-default fw-medium ms-1">
                    Price for 3 months
                  </span>
                </h2>
              </div>
              <hr className="border-top my-4" />
              <ul className="list-unstyled pricing-body">
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Unlimited Support
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Always Updated Links</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Database lookup
                    </span>
                    <span className="badge bg-light text-default rounded-pill border">
                      <i className="ri-flashlight-fill text-warning me-1"></i>
                      coming soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Subscriber rank</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Instant Support</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Url Shortner</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Mailer tool</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
              </ul>
              <hr className="border-top my-4" />
              <Button
                variant=""
                type="button"
                className="btn btn-lg btn-primary-gradient d-grid w-100 btn-wave"
                onClick={() => updateSubscription("pro", 3)}
              >
                {loading == "pro" ? (
                  <span className="ms-4 me-4">
                    {" "}
                    <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                    Loading...
                  </span>
                ) : (
                  <span className="ms-4 me-4">Start Today</span>
                )}
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={8} xl={4} xxl={4} md={8} sm={12} className="">
          <div
            className={`card custom-card pricing-card cursor-pointer ${
              selectedPlan == "Premium" ? "hover" : ""
            }`}
            onClick={() => setSelectedPlan("Premium")}
          >
            <div className="card-body p-5">
              <div className="text-center">
                <h4 className="fw-medium mb-1">Premium</h4>
                <span className="mb-1 text-muted d-block">
                  Pinnacle excellence, VIP support.
                </span>
                <h2 className="mb-0 fw-bold d-block text-gradient">
                  $125/
                  <span className="fs-12 text-default fw-medium ms-1">
                    Price for 6 months
                  </span>
                </h2>
              </div>
              <hr className="border-top my-4" />
              <ul className="list-unstyled pricing-body">
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Unlimited Support
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Always Updated Links</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">
                      Database lookup
                    </span>
                    <span className="badge bg-light text-default rounded-pill border">
                      <i className="ri-flashlight-fill text-warning me-1"></i>
                      coming soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Subscriber rank</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto">Instant Support</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Url Shortner</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-xs svg-success">
                      <i className="ti ti-check text-success fs-18"></i>
                    </span>
                    <span className="ms-2 my-auto flex-fill">Mailer tool</span>
                    <span className="text-muted fs-12 fw-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
              </ul>
              <hr className="border-top my-4" />
              <Button
                variant=""
                type="button"
                className="btn btn-lg btn-outline-primary d-grid w-100 btn-wave"
                onClick={() => updateSubscription("premium", 6)}
              >
                {loading == "premium" ? (
                  <span className="ms-4 me-4">
                    {" "}
                    <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                    Loading...
                  </span>
                ) : (
                  <span className="ms-4 me-4">Start Today</span>
                )}
              </Button>
            </div>
          </div>
        </Col>
      </div>
      <div
        className="p-0 border-0"
      >
        <Card className="custom-card shadow-sm">
          <Card.Body className="p-4">
            <li className="list-group-item p-4 my-3">
              <span className="fw-bold fs-16 d-block mb-4">
                Redeem Your Code
              </span>
              <div className="row gy-3 align-items-center">
                <Col xl={8} lg={8} md={8} sm={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your redeem code"
                    id="redeemCode"
                  />
                </Col>
                <Col xl={4} lg={4} md={4} sm={12}>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => handleRedeemCode()}
                  >
                    Submit
                  </button>
                </Col>
              </div>
            </li>
            <div className="flex gap-2 py-2">
              <p>Your redeem code is:</p>
              <p>896757</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      {/* End:: row-1 */}

      {/* Start:: row-3 */}
      {/* <Row>
        <Col xl={12}>
          <Tab.Container defaultActiveKey="first">
            <div className="text-center my-5">
              <div className="tab-style-1 border p-1 bg-white shadow-sm rounded-pill d-inline-block">
                <Nav className="nav nav-pills">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="first"
                      type="button"
                      className="nav-link rounded-pill  fw-medium"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-monthly"
                    >
                      Monthly
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="second"
                      type="button"
                      className="nav-link rounded-pill fw-medium"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-yearly"
                    >
                      Yearly
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane
                eventKey="first"
                className="show  p-0 border-0"
                id="pills-monthly"
              >
                <div className="card shadow-none overflow-hidden border-0">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-bordered pricing-table mb-0">
                        <thead>
                          <tr>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <span className="avatar avatar-lg rounded bg-white-transparent fs-24">
                                    <i className="bx bx-headphone"></i>
                                  </span>
                                </div>
                                <div className="flex-grow-1 text-start">
                                  <p className="h5 mb-0 text-fixed-white">
                                    Contact Us!
                                  </p>
                                  <a
                                    href="#!"
                                    className="text-fixed-white op-8"
                                  >
                                    Start{" "}
                                    <i className="fe fe-chevrons-right ms-1 fs-14"></i>
                                  </a>
                                </div>
                              </div>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Newest
                              </p>
                              <p className="h5 mb-0 text-fixed-white">Free</p>
                              <p className="h3 text-fixed-white mb-0">
                                $0
                                <span className="fs-13 op-5 ms-1">/ month</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Popular
                              </p>
                              <p className="h5 mb-0 text-fixed-white">
                                Starter
                              </p>
                              <p className="h3 text-fixed-white mb-0">
                                $9
                                <span className="fs-13 op-5 ms-1">/ month</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-warning rounded fw-semibold mb-2">
                                Recommended
                              </p>
                              <p className="h5 mb-0 text-fixed-white">Pro</p>
                              <p className="h3 text-fixed-white mb-0">
                                $15
                                <span className="fs-13 op-5 ms-1">/ month</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Most Used
                              </p>
                              <p className="h5 mb-0 text-fixed-white">
                                Business
                              </p>
                              <p className="h3 text-fixed-white mb-0">
                                $29
                                <span className="fs-13 op-5 ms-1">/ month</span>
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border">
                            <td colSpan={5} className="pricing-feature fw-bold">
                              Site Features
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Drag and Drop Builder
                            </td>
                            <td>1</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              No of Pages
                            </td>
                            <td>1</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Customizable footer
                            </td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Responsive Design
                            </td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              SEO Optimization
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Social Media Management
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Custom Forms
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              E-commerce
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Content Management
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr className="border">
                            <td colSpan={5} className="pricing-feature fw-bold">
                              Functionality
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Search Functionality
                            </td>
                            <td>Upto 5</td>
                            <td>Upto 10</td>
                            <td>Upto 25</td>
                            <td>Unlimited</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Custom Forms
                            </td>
                            <td>3%</td>
                            <td>3%</td>
                            <td>3%</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Blogging Platform
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Analytics Integration
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Membership System
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Video Integration
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              <div>
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane
                eventKey="second"
                className="p-0 border-0"
                id="pills-yearly"
              >
                <div className="card shadow-none border-0 reveal">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-bordered pricing-table mb-0 table-hover">
                        <thead>
                          <tr>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <span className="avatar avatar-lg rounded bg-white-transparent fs-24">
                                    <i className="bx bx-headphone"></i>
                                  </span>
                                </div>
                                <div className="flex-grow-1 text-start">
                                  <p className="h5 mb-0 text-fixed-white">
                                    Contact Us!
                                  </p>
                                  <a
                                    href="#!"
                                    className="text-fixed-white op-8"
                                  >
                                    Start{" "}
                                    <i className="fe fe-chevrons-right ms-1 fs-14"></i>
                                  </a>
                                </div>
                              </div>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Newest
                              </p>
                              <p className="h5 mb-0 text-fixed-white">Free</p>
                              <p className="h3 text-fixed-white mb-0">
                                $19
                                <span className="fs-13 op-5 ms-1">/ year</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Popular
                              </p>
                              <p className="h5 mb-0 text-fixed-white">
                                Starter
                              </p>
                              <p className="h3 text-fixed-white mb-0">
                                $49
                                <span className="fs-13 op-5 ms-1">/ year</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white border-right border-white-1"
                            >
                              <p className="badge badge-lg bg-warning fs-white rounded fw-semibold mb-2">
                                Recommended
                              </p>
                              <p className="h5 mb-0 text-fixed-white">Pro</p>
                              <p className="h3 text-fixed-white mb-0">
                                $75
                                <span className="fs-13 op-5 ms-1">/ year</span>
                              </p>
                            </th>
                            <th
                              scope="row"
                              className="bg-primary text-fixed-white p-4"
                            >
                              <p className="badge badge-lg bg-white-transparent rounded fw-semibold mb-2">
                                Most Used
                              </p>
                              <p className="h5 mb-0 text-fixed-white">
                                Business
                              </p>
                              <p className="h3 text-fixed-white mb-0">
                                $99
                                <span className="fs-13 op-5 ms-1">/ year</span>
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border">
                            <td colSpan={5} className="pricing-feature fw-bold">
                              Site Features
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Drag and Drop Builder
                            </td>
                            <td>1</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              No of Pages
                            </td>
                            <td>1</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Customizable footer
                            </td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Responsive Design
                            </td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              SEO Optimization
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Social Media Management
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Custom Forms
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              E-commerce
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Content Management
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr className="border">
                            <td colSpan={5} className="pricing-feature fw-bold">
                              Functionality
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Search Functionality
                            </td>
                            <td>Upto 5</td>
                            <td>Upto 10</td>
                            <td>Upto 25</td>
                            <td>Unlimited</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Custom Forms
                            </td>
                            <td>3%</td>
                            <td>3%</td>
                            <td>3%</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Blogging Platform
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Analytics Integration
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Membership System
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td className="pricing-feature fw-semibold">
                              Video Integration
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <i className="fe fe-check-circle text-success"></i>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              <div className="d-grid">
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className="d-grid">
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className="d-grid">
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className="d-grid">
                                <a
                                  href="#!"
                                  className="btn btn-lg btn-w-lg btn-primary-gradient btn-wave"
                                >
                                  Get Started
                                  <i className="ti ti-arrow-narrow-right ms-1"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row> */}
      {/* End:: row-3 */}
    </Fragment>
  );
};

export default SubscriptionPage;
