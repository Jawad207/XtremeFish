"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Pagination } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Popup from "@/components/Popup";
import { deleteProfile, getGlobalUser } from "@/shared/Api/auth";

function page() {
  
  const dispatch = useDispatch();
  const allUsers = useSelector((state: any) => state.auth.allUsers);
  const allUsersCount = useSelector((state: any) => state.auth.allUsersCount);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updateId, setUpdate] = useState("");
  const [postPopup, setPostPopup] = useState(true);
  const [userValue, setUserValue] = useState({})
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const getAllUser = async (data: any) => {
    await getGlobalUser(data, dispatch);
  };

  useEffect(() => {
    getAllUser({ page: currentPage, limit: 10 });
  }, [currentPage]);

  const handleOpenPopup = () => {
    setPostPopup(true);
    setIsPopupOpen(true);
  };
  const handleClosePopup: any = () => {
    setIsPopupOpen(false);
  };

  const filterPosts = (postToDelete: any) => {
    deleteProfile({ id: postToDelete?._id }, dispatch);
  };

  const handleUpdate = (user: any) => {
    setUpdate(user?._id);
    setUserValue({userName: user?.userName, email: user?.email, password: ""});
    handleOpenPopup();
  };



  return (
    <Fragment>
      <Seo title={"user-management"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Users</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div className="flex justify-between gap-2">
                  <Popup
                    usermanagment={postPopup}
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    userValue={userValue}
                    setUserValue={setUserValue}
                    updateId={updateId}
                    setUpdate={setUpdate}
                  />
                  {/* {allUsers?.length ? (
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Search Here"
                      aria-label=".form-control-sm example"
                    />
                  ) : null} */}
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    {/* <th>Password</th> */}
                    <th>Date</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                  {allUsers &&
                    allUsers
                      ?.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((user: any) => (
                        <tr key={user._id}>
                          <td>
                            <img
                              src={
                                user?.profileImage ??
                                "https://firebasestorage.googleapis.com/v0/b/xtremefish-9ceaf.appspot.com/o/images%2Favatar.png?alt=media&token=6b910478-6e58-4c73-8ea9-f4827f2eaa1b"
                              }
                              alt="img"
                              className="avatar avatar-xs avatar-rounded mb-1"
                            />
                          </td>
                          <td>{user?.userName}</td>
                          <td>{user && <span>{user?.email}</span>}</td>
                          <td>
                            <div className="btn-list">
                              {moment(user?.timestamp).format("ddd, MMM DD, YYYY, hh:mm A")}
                            </div>
                          </td>
                          <td>
                            <div className="flex py-2 justify-start gap-2 ">
                              <button
                                className="text-red-500 mr-2"
                                onClick={() => filterPosts(user)}
                              >
                                <Trash2 size={14} />
                              </button>
                              <button
                                className="text-blue-500"
                                onClick={() => handleUpdate(user)}
                              >
                                <Pencil size={14} />
                              </button>
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
                  Showing {allUsersCount} Entries{" "}
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  >
                    <Pagination className="pagination mb-0">
                      <Pagination.Item
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                      >
                        Prev
                      </Pagination.Item>
                      {Array.from({
                        length: Math.ceil(allUsersCount / itemsPerPage),
                      }).map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={currentPage === index + 1}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Item
                        disabled={
                          currentPage ===
                          Math.ceil(allUsersCount / itemsPerPage)
                        }
                        onClick={() => paginate(currentPage + 1)}
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
}

export default page;
