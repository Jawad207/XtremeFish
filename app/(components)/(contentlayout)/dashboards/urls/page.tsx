"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getUrls,
  deleteUrl,
} from "@/shared/Api/dashboard";
import Popup from "@/components/Popup";

function page() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const user = useSelector((state: any) => state.auth.user);
    const [descVal, setDescVal] = useState("");
    const [updateId, setUpdate] = useState("");
    const [urls, setUrls] = useState<any>();
    const Urls = useSelector((state: any) => state.dash.urls);
    const dispatch = useDispatch();

    console.log(Urls)

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
      };

      const handleUpdate = (post: any) => {
        setDescVal(post?.description);
        setUpdate(post?._id);
        handleOpenPopup();
      };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const filterUrls = (urlToDelete: any) => {
      deleteUrl({ id: urlToDelete?._id }, dispatch);
    };

    const getAllUrls = async () => {
      await getUrls(dispatch);
    };

    useEffect(() => {
      getAllUrls();
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
                      <th>URL</th>
                      <th>Date</th>
                      <th>Actions</th>
                  </thead>
                  <tbody>
                    {Urls?.length > 0 &&
                      Urls.map((url: any) => (
                        <tr key={url._id}>
                            <td>
                                <a href={url.description + `${user?._id}`} target="_blank">{url.description}</a>
                            </td>
                            <td>
                            <div className="btn-list">
                              {moment(url?.createdAt).format('ddd, MMM DD,YYYY')}
                            </div>
                            </td>
                            <td>
                            <button
                              title="Delete Url"
                              className="text-red-500"
                              onClick={() => filterUrls(url)}
                            >
                              <Trash2 size={14} />
                            </button>
                            <button
                              className="text-blue-500 ml-4"
                              onClick={() => handleUpdate(url)}
                            >
                              <Pencil size={14} />
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
