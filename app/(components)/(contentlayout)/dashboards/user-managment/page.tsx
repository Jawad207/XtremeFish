"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil, RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getPosts, deletePost } from "@/shared/Api/dashboard";
import Popup from "@/components/Popup";
import { getGlobalUser } from "@/shared/Api/auth";

function page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [descVal, setDescVal] = useState("");
  const [updateId, setUpdate] = useState("");
  const [postPopup, setPostPopup] = useState(true);
  const [newPost, setNewPost] = useState([]);
  const [val, setVal] = useState("");

  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state.dash);

  const getAllUser = async () => {
    await getGlobalUser(dispatch);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleOpenPopup = () => {
    setPostPopup(true);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const filterPosts = (postToDelete: any) => {
    deletePost({ id: postToDelete?._id }, dispatch);
  };

  const handleUpdate = (post: any) => {
    setVal(post?.title);
    setDescVal(post?.description);
    setUpdate(post?._id);
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
                  <button
                    className="title:rounded-md"
                    onClick={handleOpenPopup}
                    title={"Add News"}
                  >
                    <SquarePlus size={30} className="hover:text-blue-400" />
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
                  {posts?.length ? (
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Search Here"
                      aria-label=".form-control-sm example"
                    />
                  ) : null}
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {posts &&
                      posts?.length > 0 &&
                      posts?.map((post: any) => (
                        <tr key={post._id}>
                          <td>{post?.user?.userName}</td>
                          <td>{post && <span>{post?.title}</span>}</td>
                          <td>{post?.description}</td>
                          <td>
                            <div className="btn-list">
                              {moment(post?.createdAt).format(
                                "ddd, MMM DD, YYYY, hh:mm A"
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex py-2 justify-start gap-2 ">
                              <button
                                className="text-red-500 mr-2"
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
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav
                    aria-label="Page navigation"
                    className="pagination-style-4"
                  ></nav>
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