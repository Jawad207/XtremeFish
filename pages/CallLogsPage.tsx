'use client'
// import Seo from "@/shared/layout-components/seo/seo";
// import React, { Fragment, useEffect, useState } from "react";
// import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
// import { deleteAccounts, getAccounts } from "@/shared/Api/dashboard";
// import { useDispatch, useSelector } from "react-redux";
// import { Trash2 } from "lucide-react";
// import { FaTrash } from "react-icons/fa";
// import moment from "moment";

// function CallLogsPage() {
//   const dispatch = useDispatch();
//   const user = useSelector((state: any) => state.auth.user);
//   const accounts = useSelector((state: any) => state.dash.accounts);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalAccounts, setTotalAccounts] = useState(0);
//   const [limit] = useState(10);
//   const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchAccounts(currentPage);
//   }, [currentPage]);

//   const fetchAccounts = async (page: number) => {
//     const response = await getAccounts(user?._id, page, limit, dispatch);
//     setTotalAccounts(response?.totalAccounts);
//     setTotalPages(response?.totalPages); 
//   };

//   const handleDeleteAccount = async (account: any) => {
//     await deleteAccounts({ id: account?._id }, dispatch);
//     fetchAccounts(currentPage); // Refresh after deletion
//   };

//   const handleDeleteSelectedAccounts = async () => {
//     await Promise.all(
//       selectedAccounts.map((id) => deleteAccounts({ id }, dispatch))
//     );
//     setSelectedAccounts([]); // Clear selected accounts
//     fetchAccounts(currentPage); // Refresh after deletion
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const toggleSelectAccount = (accountId: string) => {
//     setSelectedAccounts((prevSelected) =>
//       prevSelected.includes(accountId)
//         ? prevSelected.filter((id) => id !== accountId)
//         : [...prevSelected, accountId]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedAccounts.length === accounts.length) {
//       setSelectedAccounts([]);
//     } else {
//       setSelectedAccounts(accounts.map((account: any) => account._id));
//     }
//   };

//   return (
//     <Fragment>
//       <Seo title={"Call-logs"} />
//       <Row>
//         <Col xl={12}>
//           <Card className="custom-card">
//             <Card.Header className="justify-content-between">
//               <Card.Title>View Your Logs</Card.Title>
//               <div className="d-flex flex-wrap gap-2">
//                 <div className="flex justify-between gap-2">
//                   <input
//                     className="form-control form-control-sm"
//                     type="text"
//                     placeholder="Search Here"
//                     aria-label=".form-control-sm example"
//                   />
//                   <div
//                     title="Delete selected logs"
//                     className="hover:text-red-500"
//                   >
//                     <Button
//                       className="btn-md bg-[#546dfe]"
//                       onClick={handleDeleteSelectedAccounts}
//                       disabled={selectedAccounts.length === 0}
//                     >
//                       <FaTrash size={14} className="hover:text-red-400" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <div className="table-responsive">
//                 <table className="table text-nowrap">
//                   <thead>
//                     <tr>
//                       <th>
//                         <input
//                           title="select all"
//                           className="mt-1"
//                           type="checkbox"
//                           checked={selectedAccounts.length === accounts.length}
//                           onChange={toggleSelectAll}
//                         />
//                       </th>
//                       <th>Email</th>
//                       <th>Password</th>
//                       <th>Otp</th>
//                       <th>Bank Pin</th>
//                       <th>Country Flag</th>
//                       <th>IP Address</th>
//                       <th>Date</th>
//                       {/* <th>Action</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {accounts?.length > 0 ?
//                       accounts.map((account: any) => (
//                         <tr key={account._id}>
//                           <td>
//                             <input
//                               type="checkbox"
//                               checked={selectedAccounts.includes(account._id)}
//                               onChange={() => toggleSelectAccount(account._id)}
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex">
//                               <div className="ms-2">
//                                 <p className="fs-12 text-muted mb-0">
//                                   {account.email}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           <td>{account.password}</td>
//                           <td>
//                             <span
//                               className={`badge bg-${account?.status?.toLowerCase()}-transparent`}
//                             >
//                               {account.otp}
//                             </span>
//                           </td>
//                           <td>
//                             <span className="fw-semibold fs-13">
//                               {account.bankPin}
//                             </span>
//                           </td>
//                           <td>
//                             <img
//                               src={`https://flagcdn.com/16x12/${account?.location?.countryCode.toLowerCase()}.png`}
//                               alt={account?.location?.country}
//                               width="16"
//                               height="12"
//                               title={`${account?.location?.country}, ${account?.location?.city}`}
//                             />
//                           </td>
//                           <td>{account?.location?.ipAddress}</td>
//                           <td>
//                             <div className="btn-list">
//                               {moment(account.createdAt).format(
//                                 "ddd, MMM DD, YYYY"
//                               )}
//                             </div>
//                           </td>
//                           {/* <td>
//                             <div className="btn-list">
//                               <Button
//                                 onClick={() => handleDeleteAccount(account)}
//                                 variant=""
//                                 className="btn btn-sm btn-icon text-red-500 btn-wave"
//                               >
//                                 <Trash2 size={14} />
//                               </Button>
//                             </div>
//                           </td> */}
//                         </tr>
//                       )) : <div>No Call Logs found</div>}
//                   </tbody>
//                 </table>
//               </div>
//             </Card.Body>
//             <Card.Footer>
//               <div className="d-flex align-items-center">
//                 <div>
//                   Showing {totalAccounts} Entries{" "}
//                   <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
//                 </div>
//                 <div className="ms-auto">
//                   <nav
//                     aria-label="Page navigation"
//                     className="pagination-style-4"
//                   >
//                     <Pagination className="pagination mb-0">
//                       <Pagination.Item
//                         disabled={currentPage === 1}
//                         onClick={() => handlePageChange(currentPage - 1)}
//                       >
//                         Prev
//                       </Pagination.Item>
//                       {[...Array(totalPages)].map((_, index) => (
//                         <Pagination.Item
//                           key={index}
//                           active={index + 1 === currentPage}
//                           onClick={() => handlePageChange(index + 1)}
//                         >
//                           {index + 1}
//                         </Pagination.Item>
//                       ))}
//                       <Pagination.Item
//                         disabled={currentPage === totalPages}
//                         onClick={() => handlePageChange(currentPage + 1)}
//                       >
//                         Next
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

import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { deleteAccounts, getAccounts } from "@/shared/Api/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { X, Check, Lock } from 'lucide-react';
import { FaTrash } from "react-icons/fa";
import moment from "moment";

function CallLogsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const accounts = useSelector((state: any) => state.dash.accounts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [limit] = useState(10);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [completedAccounts, setCompletedAccounts] = useState<string[]>([]); // New state for completed accounts
  const [InComplete, setInComplete] = useState<string[]>([]); // New state for completed accounts
  const [lock, setLock] = useState<string[]>([]); // New state for completed accounts
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAccounts(currentPage);
  }, [currentPage]);

  const fetchAccounts = async (page: number) => {
    const response = await getAccounts(user?._id, page, limit, dispatch);
    setTotalAccounts(response?.totalAccounts);
    setTotalPages(response?.totalPages); 
  };

  const handleCompleted = (accountId:any) => {
    setCompletedAccounts([...completedAccounts,...accountId])
    setSelectedAccounts([]);
  }
  
  const handleInComplete = (accountId:any) => {
    setInComplete([...InComplete,...accountId])
    setSelectedAccounts([]);
  }

  const handleLock = (accountId:any) => {
    setLock([...lock,...accountId])
    setSelectedAccounts([]);
  }

  const handleDeleteSelectedAccounts = async () => {
    await Promise.all(
      selectedAccounts.map((id) => deleteAccounts({ id }, dispatch))
    );
    setSelectedAccounts([]); // Clear selected accounts
    fetchAccounts(currentPage); // Refresh after deletion
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleSelectAccount = (accountId: string) => {
    setSelectedAccounts((prevSelected) =>
      prevSelected.includes(accountId)
        ? prevSelected.filter((id) => id !== accountId)
        : [...prevSelected, accountId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAccounts.length === accounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(accounts.map((account: any) => account._id));
    }
  };

  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>View Your Logs</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <div className="flex justify-between gap-2">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                  <div title="Mark selected as incomplete">
                    <Button
                      className="btn-md bg-[#546dfe]"
                      onClick={()=>{
                        handleInComplete(selectedAccounts);
                      }}
                      disabled={selectedAccounts.length === 0}
                    >
                      <X size={14} className="hover:text-red-400" />
                    </Button>
                  </div>
                  <div title="Mark selected as completed">
                    <Button
                      className="btn-md bg-[#546dfe]"
                      onClick={()=>{
                        handleCompleted(selectedAccounts);
                      }}
                      disabled={selectedAccounts.length === 0}
                    >
                      <Check size={14} className="hover:text-green-400" />
                    </Button>
                  </div>
                  <div title="Mark selected as completed">
                    <Button
                      className="btn-md bg-[#546dfe]"
                      onClick={()=>{
                        handleLock(selectedAccounts);
                      }}
                      disabled={selectedAccounts.length === 0}
                    >
                      <Lock size={14} className="hover:text-green-400" />
                    </Button>
                  </div>
                  <div title="Delete selected logs">
                    <Button
                      className="btn-md bg-[#546dfe]"
                      onClick={handleDeleteSelectedAccounts}
                      disabled={selectedAccounts.length === 0}
                    >
                      <FaTrash size={14} className="hover:text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <tr>
                      <th>
                        <input
                          title="select all"
                          className="mt-1"
                          type="checkbox"
                          checked={selectedAccounts.length === accounts.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Otp</th>
                      <th>Bank Pin</th>
                      <th>Country Flag</th>
                      <th>IP Address</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts?.length > 0 &&
                      accounts.map((account: any) => (
                        <tr
                          key={account._id}
                          style={{
                            color: completedAccounts.includes(account._id)
                              ? "green" // Light green for completed accounts
                              : InComplete.includes(account._id)
                              ? "red"
                              : lock.includes(account._id)
                              ? "purple"
                              : "white"
                          }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedAccounts.includes(account._id)}
                              onChange={() => toggleSelectAccount(account._id)}
                            />
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="ms-2">
                                <p 
                                  className="fs-12 mb-0">
                                  {account.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{account.password}</td>
                          <td>
                            <span
                              className={`bg-${account?.status?.toLowerCase()}-transparent`}
                            >
                              <p>{account.otp}</p>
                            </span>
                          </td>
                          <td>
                            <span className="fw-semibold fs-13">
                              {account.bankPin}
                            </span>
                          </td>
                          <td>
                            <img
                              src={`https://flagcdn.com/16x12/${account?.location?.countryCode.toLowerCase()}.png`}
                              alt={account?.location?.country}
                              width="16"
                              height="12"
                              title={`${account?.location?.country}, ${account?.location?.city}`}
                            />
                          </td>
                          <td>{account?.location?.ipAddress}</td>
                          <td>
                            <div className="btn-list">
                              {moment(account.createdAt).format(
                                "ddd, MMM DD, YYYY"
                              )}
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
                  Showing {totalAccounts} Entries{" "}
                  <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <nav aria-label="Page navigation" className="pagination-style-4">
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
