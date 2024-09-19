"use client";
import { ProfileGallery, projectsdata } from "@/shared/data/profileData";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useState } from "react";
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
  const handleKeyDown = (event: any) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };
  const [isSearchable] = useState(true);
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
              <img
                src="../../assets/images/media/media-3.jpg"
                className="card-img-top"
                alt="..."
              />
              <Card.Body className="p-4 pb-0 position-relative">
                <span className="avatar avatar-xxl avatar-rounded bg-info online">
                  <img src="../../assets/images/faces/team/7.png" alt="" />
                </span>
                <div className="mt-4 mb-3 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                  <div>
                    <h5 className="fw-semibold mb-1">Leo Phillips</h5>
                    <span className="d-block fw-medium text-muted mb-1">
                      Chief Executive Officer (C.E.O)
                    </span>
                    <p className="fs-12 mb-0 fw-medium text-muted">
                      {" "}
                      <span className="me-3">
                        <i className="ri-building-line me-1 align-middle"></i>
                        Georgia
                      </span>{" "}
                      <span>
                        <i className="ri-map-pin-line me-1 align-middle"></i>
                        Washington D.C
                      </span>{" "}
                    </p>
                  </div>
                  <div className="d-flex mb-0 flex-wrap gap-4">
                    <div className="p-3 bg-light rounded d-flex align-items-center border gap-3">
                      <div className="main-card-icon primary">
                        <div className="avatar avatar-lg bg-primary-transparent border border-primary border-opacity-10">
                          <div className="avatar avatar-sm svg-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 256"
                            >
                              <rect width="256" height="256" fill="none" />
                              <path
                                d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z"
                                opacity="0.2"
                              />
                              <line
                                x1="112"
                                y1="112"
                                x2="144"
                                y2="112"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <rect
                                x="32"
                                y="64"
                                width="192"
                                height="144"
                                rx="8"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <path
                                d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <path
                                d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="fw-semibold fs-20 mb-0">113</p>
                        <p className="mb-0 fs-12 text-muted fw-medium">
                          Projects
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-light rounded d-flex align-items-center border gap-3">
                      <div className="main-card-icon secondary">
                        <div className="avatar avatar-lg bg-secondary-transparent border border-secondary border-opacity-10">
                          <div className="avatar avatar-sm svg-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 256"
                            >
                              <rect width="256" height="256" fill="none" />
                              <circle cx="84" cy="108" r="52" opacity="0.2" />
                              <path
                                d="M10.23,200a88,88,0,0,1,147.54,0"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <path
                                d="M172,160a87.93,87.93,0,0,1,73.77,40"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <circle
                                cx="84"
                                cy="108"
                                r="52"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <path
                                d="M152.69,59.7A52,52,0,1,1,172,160"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="fw-semibold fs-20 mb-0">12.2k</p>
                        <p className="mb-0 fs-12 text-muted fw-medium">
                          Followers
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-light rounded d-flex align-items-center border gap-2">
                      <div className="main-card-icon success">
                        <div className="avatar avatar-lg bg-success-transparent border border-success border-opacity-10">
                          <div className="avatar avatar-sm svg-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 256"
                            >
                              <rect width="256" height="256" fill="none" />
                              <path
                                d="M208,40H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40ZM57.78,216A72,72,0,0,1,128,160a40,40,0,1,1,40-40,40,40,0,0,1-40,40,72,72,0,0,1,70.22,56Z"
                                opacity="0.2"
                              />
                              <circle
                                cx="128"
                                cy="120"
                                r="40"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <rect
                                x="40"
                                y="40"
                                width="176"
                                height="176"
                                rx="8"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                              <path
                                d="M57.78,216a72,72,0,0,1,140.44,0"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="fw-semibold fs-20 mb-0">128</p>
                        <p className="mb-0 fs-12 text-muted fw-medium">
                          Following
                        </p>
                      </div>
                    </div>
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
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item role="presentation">
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
                  </Nav.Item>
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
                        <p className="text-muted mb-2">
                          Hey there! I'm [Your Name], a passionate [Your
                          Profession/Interest] based in [Your Location]. With a
                          love for [Your Hobbies/Interests], I find joy in
                          exploring the beauty of [Your Industry/Field]. Whether
                          it's [Specific Skills or Expertise], I'm always eager
                          to learn and grow.
                        </p>
                        <p className="text-muted mb-0">
                          I specialize in [Your Specialization/Area of
                          Expertise], bringing creativity and innovation to
                          every project. From [Key Achievements] to [Notable
                          Experiences], my journey has been a thrilling ride,
                          and I'm excited to share it with you.
                        </p>
                      </li>
                      <li className="list-group-item p-4">
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
                      </li>
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
                            your.email@example.com
                          </p>
                          <p className="mb-2">
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
                          </p>
                          <p className="mb-0">
                            <span className="avatar avatar-sm avatar-rounded text-orange">
                              <i className="ri-building-line align-middle fs-15"></i>
                            </span>
                            <span className="fw-medium text-default">
                              Location :{" "}
                            </span>{" "}
                            City, Country
                          </p>
                        </div>
                      </li>
                      {/* <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          SOCIAL MEDIA :
                        </span>
                        <div className="d-flex align-items-center gap-5 flex-wrap">
                          <div className="d-flex align-items-center gap-3">
                            <div>
                              <span className="avatar avatar-md bg-primary-transparent">
                                <i className="ri-github-fill fs-4"></i>
                              </span>
                            </div>
                            <div>
                              <span className="d-block fw-medium">Github</span>
                              <span className="text-muted fw-medium">
                                github.com/spruko
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <div>
                              <span className="avatar avatar-md bg-secondary-transparent">
                                <i className="ri-twitter-x-fill fs-4"></i>
                              </span>
                            </div>
                            <div>
                              <span className="d-block fw-medium">Twitter</span>
                              <span className="text-muted fw-medium">
                                twitter.com/spruko.me
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <div>
                              <span className="avatar avatar-md bg-success-transparent">
                                <i className="ri-linkedin-box-fill fs-4"></i>
                              </span>
                            </div>
                            <div>
                              <span className="d-block fw-medium">
                                Linkedin
                              </span>
                              <span className="text-muted fw-medium">
                                linkedin.com/in/spruko
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <div>
                              <span className="avatar avatar-md bg-orange-transparent">
                                <i className="ri-briefcase-2-fill fs-4"></i>
                              </span>
                            </div>
                            <div>
                              <span className="d-block fw-medium">
                                My Portfolio
                              </span>
                              <span className="text-muted fw-medium">
                                spruko.com/
                              </span>
                            </div>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="second"
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
                              placeholder="Placeholder"
                              defaultValue="Leo Phillips"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">First Name :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="Leo"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Last Name :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="Phillips"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Designation :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="Chief Executive Officer (C.E.O)"
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
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="your.email@example.com"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Phone :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="+1 (555) 123-4567"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Website :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="www.yourwebsite.com"
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
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="City, Country"
                            />
                          </Col>
                        </div>
                      </li>
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          SOCIAL INFO :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Github :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="github.com/spruko"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Twitter :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="twitter.com/spruko.me"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Linkedin :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="linkedin.com/in/spruko"
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Portfolio :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Placeholder"
                              defaultValue="spruko.com/"
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
                              rows={4}
                              defaultValue="Hey there! I'm [Your Name], a passionate [Your Profession/Interest] based in [Your Location]. With a love for [Your Hobbies/Interests], I find joy in exploring the beauty of [Your Industry/Field]. Whether it's [Specific Skills or Expertise], I'm always eager to learn and grow.
                                                        I specialize in [Your Specialization/Area of Expertise], bringing creativity and innovation to every project. From [Key Achievements] to [Notable Experiences], my journey has been a thrilling ride, and I'm excited to share it with you."
                            ></Form.Control>
                          </Col>
                        </div>
                      </li>
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          SKILLS :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">skills :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <CreatableSelect
                              components={components}
                              classNamePrefix="react-select"
                              inputValue={inputValue}
                              isClearable
                              isMulti
                              menuIsOpen={false}
                              onChange={(newValue: any) => {
                                // Ensure newValue is an array (or empty array) of objects
                                if (Array.isArray(newValue)) {
                                  setValue(newValue);
                                } else {
                                  // Handle the case when newValue is not an array
                                  setValue([]);
                                }
                              }}
                              onInputChange={(newValue: any) =>
                                setInputValue(newValue)
                              }
                              onKeyDown={handleKeyDown}
                              placeholder="Type something and press enter..."
                              value={value}
                            />
                          </Col>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="third"
                className="p-0 border-0"
                id="timeline-tab-pane"
                role="tabpanel"
                aria-labelledby="timeline-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body className="p-4">
                    <ul className="list-unstyled profile-timeline">
                      <li>
                        <div>
                          <span className="avatar avatar-sm bg-primary-transparent avatar-rounded profile-timeline-avatar">
                            E
                          </span>
                          <p className="mb-2">
                            <span className="fw-semibold">
                              Started a new adventure!
                            </span>{" "}
                            &#127757; Excited to explore new opportunities and
                            make memories..
                            <span className="float-end fs-11 text-muted">
                              24,Dec 2024 - 14:34
                            </span>
                          </p>
                          <p className="profile-activity-media mb-0">
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-17.jpg"
                                alt=""
                              />
                            </Link>
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-18.jpg"
                                alt=""
                              />
                            </Link>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                            <img
                              src="../../assets/images/faces/11.jpg"
                              alt=""
                            />
                          </span>
                          <p className="mb-2">
                            Achieved a personal milestone today! &#127942;{" "}
                            <span className="text-primary fw-medium text-decoration-underline">
                              #Hard work pays off
                            </span>
                            .
                            <span className="float-end fs-11 text-muted">
                              18,Dec 2024 - 12:16
                            </span>
                          </p>
                          <p className="text-muted mb-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repudiandae, repellendus rem rerum excepturi
                            aperiam ipsam temporibus inventore ullam tempora
                            eligendi libero sequi dignissimos cumque, et a sint
                            tenetur consequatur omnis!
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                            <img src="../../assets/images/faces/4.jpg" alt="" />
                          </span>
                          <p className="text-muted mb-2">
                            <span className="text-default">
                              Attended an inspiring webinar on [topic]. Learning
                              never stops! &#128218;
                            </span>
                            .
                            <span className="float-end fs-11 text-muted">
                              21,Dec 2024 - 15:32
                            </span>
                          </p>
                          <p className="profile-activity-media mb-0">
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/file-manager/3.png"
                                alt=""
                              />
                            </Link>
                            <span className="fs-11 text-muted">432.87KB</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span className="avatar avatar-sm bg-success-transparent avatar-rounded profile-timeline-avatar">
                            P
                          </span>
                          <p className="text-muted mb-2">
                            <span className="text-default">
                              Shared a delicious recipe I tried out. Cooking
                              experiments are always fun! &#127858;
                            </span>
                            .
                            <span className="float-end fs-11 text-muted">
                              28,Dec 2024 - 18:46
                            </span>
                          </p>
                          <p className="profile-activity-media mb-2">
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-75.jpg"
                                alt=""
                              />
                            </Link>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                            <img src="../../assets/images/faces/5.jpg" alt="" />
                          </span>
                          <p className="text-muted mb-1">
                            <span className="text-default">
                              Enjoyed a weekend getaway to{" "}
                              <span className="fw-semibold text-secondary text-decoration-underline">
                                #Africa
                              </span>
                              . Nature therapy at its best!
                            </span>
                            .
                            <span className="float-end fs-11 text-muted">
                              11,Dec 2024 - 11:18
                            </span>
                          </p>
                          <p className="text-muted">
                            you are already feeling the tense atmosphere of the
                            video playing in the background
                          </p>
                          <p className="profile-activity-media mb-0">
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-59.jpg"
                                className="m-1"
                                alt=""
                              />
                            </Link>
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-60.jpg"
                                className="m-1"
                                alt=""
                              />
                            </Link>
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-61.jpg"
                                className="m-1"
                                alt=""
                              />
                            </Link>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                            <img
                              src="../../assets/images/media/media-39.jpg"
                              alt=""
                            />
                          </span>
                          <p className="mb-1">
                            Celebrated a friend's birthday with a surprise
                            party! &#127881;
                            <span className="float-end fs-11 text-muted">
                              24,Dec 2024 - 14:34
                            </span>
                          </p>
                          <p className="profile-activity-media mb-0">
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-26.jpg"
                                alt=""
                              />
                            </Link>
                            <Link scroll={false} href="#!">
                              <img
                                src="../../assets/images/media/media-29.jpg"
                                alt=""
                              />
                            </Link>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="fourth"
                className="p-0 border-0"
                id="gallery-tab-pane"
                role="tabpanel"
                aria-labelledby="gallery-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body>
                    <ProfileGallery />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="fifth"
                className="p-0 border-0"
                id="friends-tab-pane"
                role="tabpanel"
                aria-labelledby="friends-tab"
                tabIndex={0}
              >
                <Card className="custom-card">
                  <Card.Body>
                    <Row>
                      {projectsdata.map((idx) => (
                        <Col
                          xxl={4}
                          xl={4}
                          lg={6}
                          md={6}
                          sm={12}
                          className=""
                          key={Math.random()}
                        >
                          <Card className="custom-card shadow-none border">
                            <Card.Body className="p-4">
                              <div className="text-center">
                                <span className="avatar avatar-xl avatar-rounded">
                                  <img src={idx.src} alt="" />
                                </span>
                                <div className="mt-2">
                                  <p className="mb-0 fw-semibold">{idx.name}</p>
                                  <p className="fs-12 op-7 mb-1 text-muted">
                                    {idx.mail}
                                  </p>
                                  <span
                                    className={`badge bg-${idx.color}-transparent`}
                                  >
                                    {idx.role}
                                  </span>
                                </div>
                              </div>
                            </Card.Body>
                            <Card.Footer className="text-center">
                              <div className="d-flex gap-2 flex-wrap justify-content-center">
                                <div className="btn-list">
                                  <Button
                                    variant=""
                                    className="btn btn-sm btn-light btn-wave"
                                  >
                                    Block
                                  </Button>
                                  <Button
                                    variant=""
                                    className="btn btn-sm btn-primary btn-wave me-0"
                                  >
                                    Unfollow
                                  </Button>
                                </div>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant=""
                                    aria-label="anchor"
                                    className="btn btn-secondary btn-icon btn-sm btn-wave no-caret"
                                    href="#!"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i className="ri-more-2-fill"></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu role="menu">
                                    <li>
                                      <Dropdown.Item href="#!">
                                        Message
                                      </Dropdown.Item>
                                    </li>
                                    <li>
                                      <Dropdown.Item href="#!">
                                        Edit
                                      </Dropdown.Item>
                                    </li>
                                    <li>
                                      <Dropdown.Item href="#!">
                                        View
                                      </Dropdown.Item>
                                    </li>
                                    <li>
                                      <Dropdown.Item href="#!">
                                        Delete
                                      </Dropdown.Item>
                                    </li>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                      <Col xl={12}>
                        <div className="text-center">
                          <Button
                            variant=""
                            className="btn btn-primary-light btn-wave"
                          >
                            Show All
                          </Button>
                        </div>
                      </Col>
                    </Row>
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
                      <span className="text-muted">Leo Phillips</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span className="fw-medium me-2">Email :</span>
                      <span className="text-muted">your.email@example.com</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
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
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="custom-card overflow-hidden">
              <Card.Header className="justify-content-between">
                <Card.Title>FOLLOWERS</Card.Title>
                <Link scroll={false} href="#!" className="fs-12 text-muted">
                  {" "}
                  View All<i className="ti ti-arrow-narrow-right ms-1"></i>{" "}
                </Link>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup className="list-group list-group-flush">
                  <ListGroup.Item>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded">
                          <img src="../../assets/images/faces/1.jpg" alt="" />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="fw-medium">Amelia Turner</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-icon btn-primary-light">
                          {" "}
                          <i className="ri-add-line lh-1 align-middle"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded">
                          <img src="../../assets/images/faces/14.jpg" alt="" />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="fw-medium">Henry Morgan</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-icon btn-primary-light">
                          {" "}
                          <i className="ri-add-line lh-1 align-middle"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded">
                          <img src="../../assets/images/faces/3.jpg" alt="" />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="fw-medium">Aurora Reed</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-icon btn-primary-light">
                          {" "}
                          <i className="ri-add-line lh-1 align-middle"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded">
                          <img src="../../assets/images/faces/10.jpg" alt="" />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="fw-medium">Leo Phillips</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-icon btn-primary-light">
                          {" "}
                          <i className="ri-add-line lh-1 align-middle"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded">
                          <img src="../../assets/images/faces/5.jpg" alt="" />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="fw-medium">Ava Taylor</span>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-icon btn-primary-light">
                          {" "}
                          <i className="ri-add-line lh-1 align-middle"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* End:: row-2 */}
      </Tab.Container>
    </Fragment>
  );
};

export default Profile;
