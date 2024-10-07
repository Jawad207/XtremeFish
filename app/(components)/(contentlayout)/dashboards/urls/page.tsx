"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  deletePost,
} from "@/shared/Api/dashboard";
import Popup from "./Popup";

function page() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [urls, setUrls] = useState([
        {
            pageName:"Sales",
            URL:"http://localhost:3000/dashboards/sales"
        },
        {
            pageName:"Urls",
            URL:"http://localhost:3000/dashboards/urls"
        },
        {
            pageName:"Call Logs",
            URL:"http://localhost:3000/dashboards/call-logs"
        },
    ]);

    const [val, setVal] = useState("");
    const [descVal, setDescVal] = useState("");
    const [updateId, setUpdate] = useState("");
    const posts = useSelector((state: any) => state.dash.posts);
    const dispatch = useDispatch();

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
      };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const filterPosts = (postToDelete: any) => {
      deletePost({ id: postToDelete?._id }, dispatch);
    };

    const getAllPosts = async () => {
      await getPosts(dispatch);
    };

    useEffect(() => {
      getAllPosts();
    }, [])
    
  return (
    <Fragment>
      <Seo title={"urls"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>urls</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div className="flex justify-between gap-2">
                    <button 
                        className="title:rounded-md"
                        onClick={handleOpenPopup} 
                        title={"Add Url"}
                    >
                        <SquarePlus 
                          size={30} 
                          className="hover:text-blue-400"
                          />
                    </button>
                    <Popup
                      isOpen={isPopupOpen}
                      onClose={handleClosePopup}
                      urls={urls}
                      setUrls={setUrls}
                      val={val}
                      setVal={setVal}
                      descVal={descVal}
                      setDescVal={setDescVal}
                      updateId={updateId}
                      setUpdate={setUpdate}
                    />
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
                      <th>Page</th>
                      <th>URL</th>
                  </thead>
                  <tbody>
                    {urls?.length > 0 &&
                      urls.map((post: any) => (
                        <tr key={post._id}>
                            <td>
                                <p>{post.pageName}</p>
                            </td>
                            <td>
                                <a href={post.URL}>{post.URL}</a>
                            </td>
                            <td>
                            <button
                              className="text-red-500"
                              onClick={() => filterPosts(post)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex align-items-center">
                <div>{" "}
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
  );
}

export default page;
