"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { SquarePlus, Trash2, Pencil, RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getUrls, deleteUrl } from "@/shared/Api/dashboard";
import { getIps } from "@/shared/Api/dashboard";
import Popup from "@/components/Popup";

function page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ipBlock, setIpBlock] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

  const [descVal, setDescVal] = useState("");
  const [updateId, setUpdate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [urls, setUrls] = useState<any>();
  const Urls = useSelector((state: any) => state.dash.urls);
  const Ips = useSelector((state: any) => state.dash.ips);
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const filteredUrls = Urls.filter((url: any) =>
    url.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleUpdate = (post: any) => {
    setDescVal(post?.description);
    setUpdate(post?._id);
    setIpBlock(false);
    handleOpenPopup();
  };

  const handleClosePopup = () => {
    setIpBlock(false);
    setIsPopupOpen(false);
  };

  const filterUrls = (urlToDelete: any) => {
    deleteUrl({ id: urlToDelete?._id }, dispatch);
  };


    const getAllUrls = async () => {
      await getUrls(dispatch)
    };


  const goToRunEscape = (url:any) => {
    window.open(`${url+user?._id}`, "_blank");
  };

  const getAllIps = async () => {
    await getIps(dispatch);
  };
  useEffect(() => {
      getAllUrls();
      getAllIps();
  }, []);

  const handleClick = (e: any) => {
    if (Ips.length) {
      const userIp = user?.location?.ipAddress;
      const blockedIps = Ips.map((ip: any) => {
        return ip?.ip;
      });
      const isIncluded = blockedIps?.includes(userIp);
      if (isIncluded) {
        setIpBlock(!ipBlock);
        e.preventDefault();
        handleOpenPopup();
      }
    }
  };
  const Tooltip = ({ children, title }:any) => {
    const [visible, setVisible] = React.useState(false);
  
    return (
      <div 
        onMouseEnter={() => setVisible(true)} 
        onMouseLeave={() => setVisible(false)} 
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {children}
        {visible && (
          <div 
            style={{
              position: 'absolute',
              top: '55%',
              left: '130%',
              transform: 'translateX(-50%)',
              backgroundColor: 'black',
              color: 'white',
              padding: '2px 5px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              zIndex: 1,
              border:"1px solid white"
            }}
          >
            {title}
          </div>
        )}
      </div>
    );
  };
  
  // Function to copy text to the clipboard
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
                    <SquarePlus size={30} className="hover:text-blue-400" />
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
                    ipBlock={ipBlock}
                    setIpBlock={setIpBlock}
                  />
                  {Urls?.length ? (
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
                    <th>URL</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {Urls &&
                      Urls?.length > 0 &&
                      Urls?.map((url: any) => (
                        <tr key={url._id}>
                          <td>
                            <img
                              src={
                                user?.profileImage ??
                                "https://firebasestorage.googleapis.com/v0/b/xtremefish-9ceaf.appspot.com/o/images%2Favatar.png?alt=media&token=6b910478-6e58-4c73-8ea9-f4827f2eaa1b"
                              }
                              alt="img"
                              className="avatar avatar-xs avatar-rounded mb-1"
                            />
                            <a
                              className="ml-2"
                              onClick={(e) => {
                                handleClick(e);
                              }}
                              href={url.description + `${user?._id}`}
                              target="_blank"
                            >
                              {url.description}
                            </a>
                          </td>
                          <td>
                            <div className="btn-list">
                              {moment(url?.createdAt).format(
                                "ddd, MMM DD, YYYY, hh:mm A"
                              )}
                            </div>
                          </td>
                          <td>
                          <Tooltip title="click">
                            <Button onClick={()=>{goToRunEscape(url.description)}}>
                              <RotateCcw size={16} className="font-bold" />
                            </Button>
                          </Tooltip>
                            {/* <button
                              className="text-blue-500 ml-4"
                              onClick={() => filterUrls(url)}
                              >
                                <Trash2 size={14} />
                            </button> */}
                          </td>
                          {/* <td>
                          <button onClick={playSound}>Play Sound</button>
                          </td> */}
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
