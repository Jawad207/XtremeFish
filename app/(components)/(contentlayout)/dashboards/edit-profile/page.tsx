"use client";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";
import { editProfile } from "@/shared/Api/auth";
const EditProfile = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const loading = useSelector((state: any) => state.auth.loading);
  const [error, setError] = useState("");
  const userData = useSelector((state: any) => state?.auth?.user);

  const [user, setUser] = useState<any>({
    userName: userData?.userName,
    password: "",
    email: userData?.email,
    bio: userData?.bio,
    country: userData?.location?.country,
    city: userData?.location?.city,
  });
  const handleUpdate = async (password?: boolean) => {
    if (password) {
      if (password != confirmPassword) {
        setError("passwords doesn't match");
      }
    }
    if (!error) await editProfile(user, dispatch);
  };

  return (
    <Fragment>
      {/* Page Header */}
      <Seo title={"EditProfile"} />
      <Pageheader
        Heading="Settings"
        Pages={[
          { title: "Pages", active: true },
          { title: "Settings", active: false },
        ]}
      />
      {/* Page Header Close */}
      <Tab.Container defaultActiveKey="first">
        {/* Start:: row-1 */}
        <Row>
          <Col xl={12}>
            <Card className="custom-card profile-card">
              <span className="group flex justify-end items-end">
                <img
                  src="../../assets/images/media/media-3.jpg"
                  className="card-img-top "
                  alt="..."
                />
                <button className="absolute group flex justify-center mx-4 mb-4">
                  <Camera className="absolute hidden text-blue-400 group-hover:block" />
                </button>
              </span>
              <Card.Body className="p-4 pb-0 position-relative">
                <span className="avatar avatar-xxl avatar-rounded bg-info online group">
                  <img src="../../assets/images/faces/team/7.png" alt="" />
                  <button className="absolute group flex justify-center">
                    <Camera className="absolute hidden text-blue-400 group-hover:block" />
                  </button>
                </span>
                <div className="mt-4 mb-3 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                  <div>
                    <h5 className="fw-semibold mb-1">{user?.userName}</h5>
                    {/* <span className="d-block fw-medium text-muted mb-1">
                      Chief Executive Officer (C.E.O)
                    </span> */}
                    <p className="fs-12 mb-0 fw-medium text-muted">
                      {" "}
                      <span className="me-3">
                        <i className="ri-building-line me-1 align-middle"></i>
                        {user?.country}
                      </span>{" "}
                      <span>
                        <i className="ri-map-pin-line me-1 align-middle"></i>
                        {userData?.city}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <Nav
                  className="nav nav-tabs mb-0 tab-style-8 scaleX"
                  id="myTab"
                  role="tablist"
                >
                  <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="first"
                      className=""
                      id="profile-about-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-about-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-about-tab-pane"
                      aria-selected="true"
                    >
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="second"
                      className=""
                      id="edit-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#edit-profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="edit-profile-tab-pane"
                      aria-selected="true"
                    >
                      Change Password
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={9}>
            <Tab.Content className="" id="profile-tabs">
              <Tab.Pane
                eventKey="first"
                className="p-0 border-0"
                id="edit-profile-tab-pane"
                role="tabpanel"
                aria-labelledby="edit-profile-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          PERSONAL INFO :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">User Name :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="User name"
                              onChange={(e) =>
                                setUser({ ...user, userName: e.target.value })
                              }
                              defaultValue={user?.userName}
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Full name :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              disabled
                              className="form-control"
                              placeholder="Full name"
                              defaultValue={user?.userName}
                            />
                          </Col>
                        </div>
                      </li>
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          CONTACT INFO :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Email :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="email"
                              disabled
                              className="form-control"
                              placeholder="email"
                              defaultValue={user?.email}
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Location :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              disabled
                              className="form-control"
                              placeholder="location"
                              defaultValue={[user?.city, user?.country]}
                            />
                          </Col>
                        </div>
                      </li>
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          ABOUT :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">
                                Biographical Info :
                              </span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              as="textarea"
                              className="form-control"
                              id="text-area"
                              onChange={(e) =>
                                setUser({ ...user, bio: e.target.value })
                              }
                              rows={4}
                              defaultValue={user?.bio}
                            ></Form.Control>
                          </Col>
                        </div>
                      </li>
                    </ul>
                    <div className="flex justify-end mr-10 mb-10">
                      <div className="d-grid mt-4">
                        {loading ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-[200px] "
                            type="submit"
                            onClick={() => handleUpdate()}
                          >
                            {" "}
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="second"
                className="p-0 border-0"
                id="change-password-tab-pane"
                role="tabpanel"
                aria-labelledby="change-password-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          Password :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">New Password :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter new password"
                              defaultValue={password}
                              onChange={(e) => {
                                setError("");
                                setPassword(e.target.value);
                              }}
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">
                                Confirm New Password :
                              </span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Confirm new password"
                              defaultValue={confirmPassword}
                              onChange={(e) => {
                                setError("");
                                setConfirmPassword(e.target.value);
                              }}
                            />
                          </Col>
                        </div>
                      </li>
                    </ul>
                    {error && (
                      <p className="text-red-400 text-center text-[18px]">
                        {error}
                      </p>
                    )}
                    <div className="flex justify-end mr-10 mb-10">
                      <div className="d-grid mt-4">
                        {loading ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-[200px] "
                            type="submit"
                            onClick={() => handleUpdate(true)}
                          >
                            {" "}
                            Change Password
                          </button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
};

export default EditProfile;