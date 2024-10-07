"use client";
import { ProfileGallery, projectsdata } from "@/shared/data/profileData";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "lucide-react";

import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  ListGroup,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";
import { editProfile } from "@/shared/Api/auth";
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});
const Profile = () => {
  const components = {
    DropdownIndicator: null,
  };
  const createOption = (label: any) => ({
    label,
    value: label,
  });

  const [inputValue, setInputValue] = useState<any>("");
  const [newUserData, setNewUserData] = useState([]);
  const [bio, setBio] = useState<any>();
  const loading = useSelector((state: any) => state.auth.loading);
  const [value, setValue] = useState([
    createOption("Project Management"),
    createOption("Data Analysis"),
    createOption("Marketing Strategy"),
    createOption("Graphic Design"),
    createOption("Content Creation"),
    createOption("Market Research"),
    createOption("Client Relations"),
    createOption("Event Planning"),
    createOption("Budgeting and Finance"),
    createOption("Negotiation Skills"),
    createOption("Team Collaboration"),
    createOption("Adaptability"),
  ]);
 
  const userData = useSelector((state: any) => state?.auth);
  const user = userData.user;



  return (
    <Fragment>
      {/* Page Header */}
      <Seo title={"Profile"} />
      <Pageheader
        Heading="Profile"
        Pages={[
          { title: "Pages", active: true },
          { title: "Profile", active: false },
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
                        {user?.location?.country}
                      </span>{" "}
                      <span>
                        <i className="ri-map-pin-line me-1 align-middle"></i>
                        {user?.location?.city}
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
                      About
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item role="presentation">
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
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item> */}
                  {/* <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="third"
                      className=""
                      id="timeline-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#timeline-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="timeline-tab-pane"
                      aria-selected="false"
                    >
                      Timeline
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="fourth"
                      className=""
                      id="gallery-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#gallery-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="gallery-tab-pane"
                      aria-selected="false"
                    >
                      Gallery
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="fifth"
                      className=""
                      id="friends-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#friends-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="friends-tab-pane"
                      aria-selected="false"
                    >
                      Friends
                    </Nav.Link>
                  </Nav.Item> */}
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* End:: row-1 */}

        {/* Start:: row-2 */}
        <Row>
          <Col xl={9}>
            <Tab.Content className="" id="profile-tabs">
              <Tab.Pane
                eventKey="first"
                className="show p-0 border-0"
                id="profile-about-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-about-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          <span className="me-1">&#10024;</span>ABOUT ME :
                        </span>
                        <p className="text-muted mb-2">{user?.bio}</p>
                      </li>
                      {/* <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          SKILLS :
                        </span>
                        <div className="w-75">
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Project Management
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Data Analysis
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Marketing Strategy
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Graphic Design
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Content Creation
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Market Research
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Client Relations
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Event Planning
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Budgeting and Finance
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Negotiation Skills
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Team Collaboration
                            </span>
                          </Link>
                          <Link scroll={false} href="#!">
                            <span className="badge bg-light text-muted m-1 border">
                              Adaptability
                            </span>
                          </Link>
                        </div>
                      </li> */}
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          CONTACT INFORMATION :
                        </span>
                        <div className="text-muted">
                          <p className="mb-2">
                            <span className="avatar avatar-sm avatar-rounded text-primary">
                              <i className="ri-mail-line align-middle fs-15"></i>
                            </span>
                            <span className="fw-medium text-default">
                              Email :{" "}
                            </span>{" "}
                            {user?.email}
                          </p>
                          {/* <p className="mb-2">
                            <span className="avatar avatar-sm avatar-rounded text-secondary">
                              <i className="ri-phone-line align-middle fs-15"></i>
                            </span>
                            <span className="fw-medium text-default">
                              Phone :{" "}
                            </span>{" "}
                            +1 (555) 123-4567
                          </p>
                          <p className="mb-2">
                            <span className="avatar avatar-sm avatar-rounded text-success">
                              <i className="ri-map-pin-line align-middle fs-15"></i>
                            </span>
                            <span className="fw-medium text-default">
                              Website :{" "}
                            </span>{" "}
                            www.yourwebsite.com
                          </p> */}
                          <p className="mb-0">
                            <span className="avatar avatar-sm avatar-rounded text-orange">
                              <i className="ri-building-line align-middle fs-15"></i>
                            </span>
                            <span className="fw-medium text-default">
                              Location :{" "}
                            </span>{" "}
                            {user?.location?.city}, {user?.location?.country}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col xl={3}>
            <Card className="custom-card overflow-hidden">
              <Card.Header>
                <Card.Title>PERSONAL INFO</Card.Title>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup className="list-group list-group-flush">
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Name :</span>
                      <span className="text-muted">{user?.userName}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Email :</span>
                      <span className="text-muted text-[11px]">
                        {user?.email}
                      </span>
                    </div>
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Phone :</span>
                      <span className="text-muted">+1 (555) 123-4567</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Designation :</span>
                      <span className="text-muted">C.E.O</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Age :</span>
                      <span className="text-muted">30</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Experience :</span>
                      <span className="text-muted">12 Years</span>
                    </div>
                  </ListGroup.Item> */}
                </ListGroup>
              </Card.Body>
            </Card>
            
          </Col>
        </Row>

      </Tab.Container>
    </Fragment>
  );
};

export default Profile;
