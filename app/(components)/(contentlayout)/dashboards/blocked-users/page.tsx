"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deleteIp, getIps } from "@/shared/Api/dashboard";
import Popup from "@/components/Popup";

function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ipPopup, setIpPopup] = useState(false);
  const [ipVal, setIpVal] = useState("");
  const Ips = useSelector((state: any) => state.dash.ips);
  // const User = useSelector((state: any) => state.dash);
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    setIpPopup(true);
  };

  console.log(Ips)
  // console.log(Ips[0].ip)

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const filterIps = (ipToDelete: any) => {
    deleteIp({ id: ipToDelete?._id }, dispatch);
  };

  const getAllIps = async () => {
    await getIps(dispatch);
  };

  useEffect(() => {
    getAllIps();
  }, []);

  return (
    <Fragment>
      <Seo title={"blocked-users"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Blocked Users</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div className="flex justify-between gap-2">
                  <button
                    className="title:rounded-md"
                    onClick={handleOpenPopup}
                    title={"Add IP"}
                  >
                    <SquarePlus size={30} className="hover:text-blue-400" />
                  </button>
                  <Popup
                    ipPopup={ipPopup}
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    ipVal={ipVal}
                    setIpVal={setIpVal}
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
                    <tr>
                      {/* <th>Blocker ID</th> */}
                      <th>IP Address</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Ips?.length &&
                      Ips?.map((item: any) => (
                        <tr key={item?._id}>
                          {/* <td>{item?.blockerId}</td> */}
                          {/* {item?.ip&&<td>{item?.ip}</td>} */}
                          <td>
                            <div className="btn-list">
                              {moment(item?.createdAt).format(
                                "ddd, MMM DD, YYYY"
                              )}
                            </div>
                          </td>
                          {/* <td> */}
                            {/* Example action buttons */}
                            <td>
                              <button
                                title="Delete IP"
                                className="text-red-500"
                                onClick={() => filterIps(item)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                            {/* <button
                              className="text-blue-500 ml-4"
                              onClick={() => handleUpdate(Ip)}
                            >
                              <Pencil size={14} />
                            </button> */}
                          {/* </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex align-items-center">
                <div>
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav aria-label="Page navigation" className="pagination-style-4"></nav>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Page;
