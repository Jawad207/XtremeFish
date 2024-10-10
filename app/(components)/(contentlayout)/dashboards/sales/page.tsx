"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import {
  getAlluserCount,
  getLoginAttempts,
  getPosts,
  deletePost,
  getAccounts,
} from "@/shared/Api/dashboard";
import moment from "moment";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import * as Salesdata from "@/shared/data/dashboards/salesdata";
import Seo from "@/shared/layout-components/seo/seo";
import { useSelector } from "react-redux";
import Popup from "../../../../../components/Popup";
import { SquarePlus, Trash2, Pencil } from "lucide-react";
import { Postpone } from "next/dist/server/app-render/dynamic-rendering";
const Sales = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth.user);
  const posts = useSelector((state: any) => state.dash.posts);
  const accountsCount = useSelector((state: any) => state.dash.totalAccounts);
  const [allCounts, setAllcounts] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [loginAttempt, setLoginAttempts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [val, setVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
  const loginAttemptData = useSelector((state: any) => state?.dash);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newPost, setNewPost] = useState([]);
  const [updateId, setUpdate] = useState("");
  const [postPopup, setPostPopup] = useState(false);

  useEffect(() => {
    fetchAccounts(1);
  }, []);

  // Fetch accounts with pagination
  const fetchAccounts = async (page: number) => {
    const response = await getAccounts(auth?._id, page, 10, dispatch);
  };

  const handleOpenPopup = () => {
    setPostPopup(true);
    setIsPopupOpen(true);
  };

  const filterPosts = (postToDelete: any) => {
    deletePost({ id: postToDelete?._id }, dispatch);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const results = loginAttempt?.filter((attempt: any) => {
      const userEmail = attempt?.userId?.email?.toLowerCase();
      const userName = attempt?.userId?.userName?.toLowerCase();
      return (
        userEmail?.includes(searchQuery?.toLowerCase()) ||
        userName?.includes(searchQuery?.toLowerCase())
      );
    });
    setFilteredAttempts(results);
  }, [searchQuery, loginAttempt]);

  const getAllusersCount = async () => {
    const allUser = await getAlluserCount(dispatch);
    setAllcounts(allUser ?? 0);
  };
  const getAllPosts = async () => {
    await getPosts(dispatch);
  };
  const getAllLoginAttempts = async () => {
    await getLoginAttempts(
      { id: auth?._id, page: currentPage, limit: recordsPerPage },
      dispatch
    );
  };
  useEffect(() => {
    getAllusersCount();
    getAllPosts();
  }, []);

  useEffect(() => {
    if (loginAttemptData?.loginAttempts?.length) {
      setTotalRecords(loginAttemptData?.loginAttempts?.length);
      setLoginAttempts(loginAttemptData?.loginAttempts);
      setFilteredAttempts(loginAttemptData?.loginAttempts);
      setTotalPages(loginAttemptData?.totalPages);
    }
  }, [loginAttemptData]);

  useEffect(() => {
    getAllLoginAttempts();
    setUserName(auth?.userName);
  }, [auth, currentPage]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleUpdate = (post: any) => {
    setVal(post?.title);
    setDescVal(post?.description);
    setUpdate(post?._id);
    handleOpenPopup();
  };

  const chartData = {
    series: [
      {
        name: "Accounts Registered",
        data: [25, 40],
      },
    ],
    // options: {
    //   chart: {
    //     type: "bar",
    //     height: 350,
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: "55%",
    //     },
    //   },
    //   xaxis: {
    //     categories: ["Last Month", "This Month"],
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    // },
    options: {
      chart: {
        height: 220,
        toolbar: {
          show: false,
        },
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          },
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ["rgba(12, 215, 177, 0.8)", "var(--primary07)"],
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
          width: 10,
          height: 4,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 5,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      },
      stroke: {
        curve: "smooth",
        width: [1, 1],
        lineCap: "round",
      },
      grid: {
        borderColor: "#edeef1",
        strokeDashArray: 2,
      },
      yaxis: {
        axisBorder: {
          show: false,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
          color: "rgba(119, 119, 142, 0.05)",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          show: false,
          formatter: function (y: any) {
            return y.toFixed(0) + "";
          },
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          show: false,
          rotate: -90,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Fragment>
      <Seo title={"SignIn"} />
      {/*  Start::page-header */}
      <div className="d-flex align-items-center justify-content-between my-4 page-header-breadcrumb flex-wrap gap-2">
        <div>
          <p className="fw-medium fs-20 mb-0">{`Hello there, ${userName}`}</p>
          <p className="fs-13 text-muted mb-0">
            Let's make today a productive one!
          </p>
        </div>
      </div>
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
                    <h5 className="mb-4 fs-4">{accountsCount}</h5>
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
      </Row>
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
                  options={Salesdata.Statistics2.options}
                  series={Salesdata.Statistics2.series}
                  type="line"
                  width={"100%"}
                  height={300}
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
      <Row>
        <Col xl={3}>
          <Card className="custom-card">
            <Card.Header className="flex justify-between">
              <Card.Title>Posts</Card.Title>
              <button
                title="Add Post"
                onClick={handleOpenPopup}
                className="p-1 hover:text-blue-400"
              >
                <SquarePlus />
              </button>
              <Popup
                postPopup={postPopup}
                isOpen={isPopupOpen}
                post={newPost}
                setPost={setNewPost}
                onClose={handleClosePopup}
                val={val}
                setVal={setVal}
                descVal={descVal}
                setDescVal={setDescVal}
                updateId={updateId}
                setUpdate={setUpdate}
              />
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled recent-activity-list">
                {posts && posts?.length
                  ? posts?.map((post: any, index: any) => {
                      return (
                        <li key={index}>
                          <div>
                            <h6 className="mb-1 fs-13">
                              <div className="flex justify-between">
                                <div>
                                  {post && <span>{post?.title}</span>}
                                  <div className="mt-2">
                                    {post?.description}
                                  </div>
                                </div>
                                <span className="fs-11 text-muted float-end ">
                                  <div className="w-14">
                                    {moment(post?.createdAt).format("hh:mm A")}
                                  </div>
                                  <div className="flex py-2 justify-end gap-2 ">
                                    <button
                                      className="text-red-500"
                                      onClick={() => filterPosts(post)}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                    <button
                                      className="text-blue-500"
                                      onClick={() => handleUpdate(post)}
                                    >
                                      <Pencil size={14} />
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </h6>
                            <span className="d-block fs-13 text-muted fw-normal"></span>
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>RECENT LOGINS</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                          id="checkboxNoLabeljob1"
                          value=""
                          aria-label="..."
                        />
                      </th>
                      <th scope="col">Email</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Description</th>
                      <th scope="col">Country</th>
                      <th scope="col">Country Code</th>
                      <th scope="col">Date</th>
                      <th scope="col" className="text-center">
                        region
                      </th>
                      <th scope="col">City</th>
                      <th scope="col">IpAddress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttempts &&
                      filteredAttempts?.length &&
                      filteredAttempts?.map((attempt: any) => (
                        <tr key={attempt._id}>
                          <td className="ps-4">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`checkboxNoLabeljob_${attempt._id}`}
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
                                    {attempt.userId?.email}{" "}
                                  </Link>
                                </p>
                                <p className="fs-12 text-muted mb-0">
                                  {attempt.location?.city},{" "}
                                  {attempt.location?.region}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{attempt.userId?.userName}</td>
                          <td>
                            <span
                              className={`badge ${
                                attempt?.status == "success"
                                  ? "bg-primary-transparent"
                                  : "bg-red-400"
                              }`}
                            >
                              {attempt.status}
                            </span>
                          </td>
                          <td>{attempt.description}</td>
                          <td>
                            <span className="d-block fw-semibold fs-13">
                              {attempt.location?.country}
                            </span>
                          </td>
                          <td>{attempt.location?.countryCode}</td>
                          <td>
                            {new Date(attempt.timestamp).toLocaleDateString()}
                          </td>
                          <td className="text-center">
                            {attempt.location?.region}
                          </td>
                          <td className="fw-semibold">
                            {attempt.location?.city}
                          </td>
                          <td className="fw-semibold">
                            {attempt.location?.ipAddress}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex align-items-center">
                <div>Showing {totalRecords} Entries</div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  >
                    <Pagination className="pagination mb-0">
                      <Pagination.Item
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </Pagination.Item>
                      {[...Array(totalPages).keys()].map((num) => (
                        <Pagination.Item
                          key={num + 1}
                          active={num + 1 === currentPage}
                          onClick={() => handlePageChange(num + 1)}
                        >
                          {num + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Item
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
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
};

export default Sales;
