"use client";
import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card, Col, Form, Nav, Row, Tab, Button } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";
import { editProfile } from "@/shared/Api/auth";
import Success from "@/components/SuccessPop";
import { storage } from "@/shared/Api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { userAgent } from "next/server";
const EditProfile = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showBtn2, setShowBtn2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const loading = useSelector((state: any) => state.auth.loading);
  const [error, setError] = useState("");
  const userData = useSelector((state: any) => state?.auth?.user);
  // console.log(userData)
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [setupKey, setSetupKey] = useState(null);
  const [showSetupKey, setShowSetupKey] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [profileImage, setProfileImage] = useState(
    userData?.profileImage ??
      "https://firebasestorage.googleapis.com/v0/b/xtremefish-9ceaf.appspot.com/o/images%2Favatar.png?alt=media&token=6b910478-6e58-4c73-8ea9-f4827f2eaa1b"
  );
  const [coverImage, setCoverImage] = useState(
    userData?.coverImage ??
      "https://firebasestorage.googleapis.com/v0/b/xtremefish-9ceaf.appspot.com/o/images%2Fcoveravatar.webp?alt=media&token=4e68f36e-5f29-453c-a333-f4c68452f9d3"
  );

  const [user, setUser] = useState<any>({
    userName: userData?.userName,
    password: "",
    email: userData?.email,
    bio: userData?.bio,
    country: userData?.location?.country,
    city: userData?.location?.city,
  });

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    status: "cover" | "profile"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create a storage reference
      const imageRef = ref(storage, `images/${file.name + v4()}`);

      try {
        // Upload the file to Firebase Storage
        await uploadBytes(imageRef, file);

        // Get the download URL
        const imageUrl = await getDownloadURL(imageRef);

        // Conditional logic based on status
        if (status === "cover") {
          setCoverImage(imageUrl); // Assuming you have a setCoverImage function
        } else {
          setProfileImage(imageUrl); // Assuming you have a setProfileImage function
        }
      } catch (error) {
        console.error("Error uploading the image:", error);
        // Handle the error (e.g., show a message to the user)
      }
    }
  };

  const handleUpdate = async (pass?: boolean) => {
    let boolError = false;
    if (pass) {
      if (password != confirmPassword || password == "") {
        setError("passwords doesn't match");
        boolError = true;
      }
    }
    if (!boolError) {
      const response = await editProfile(
        { ...user, password, profileImage, coverImage },
        dispatch
      );

      if (response?.status == 200) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    }
  };

  const handleVerificationTokenChange = (e:any) => {
    setVerificationToken(e.target.value);
  };

  const handleVerifyToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/google-auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationToken,
          secret: userData?.twoFactorSecret,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const profileResponse = await editProfile(
          { ...userData, is2FAEnabled: true },
          dispatch
        );
  
        if (profileResponse?.status === 200) {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            window.location.reload();
          }, 2000);
        } else {
          setError(profileResponse.message)
        }
      } else {
        const errorData = await response.json();
        setError(errorData?.message)
      }
    } catch (error:any) {
      setError(error)
    }
  };
  console.log("twoFactorSecret:   ",userData?.twoFactorSecret)
  console.log("is2FAEnabled:    ",userData?.is2FAEnabled)

  const handleGenerateQRCode = async () => {
    if (!user?.userName) {
      setError("Username is missing.");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:8080/google-auth/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:user?.userName }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }
      setShowBtn(false)
      setShowBtn2(true)
      const data = await response.json();
      setQrCodeUrl(data.qrCodeUrl);
      setSetupKey(data.secret);
      await editProfile({
        ...userData,
        twoFactorSecret:data.secret
      },dispatch)
    } catch (err:any) {
      setError(err.message || "Failed to generate QR code");
    }
  };


  const handleShowSetupKey = () => {
    setShowSetupKey(!showSetupKey); // Show the setup key
  };

  const handleDisable2FA = async()=>{
    const response = await editProfile({
      ...userData,
      is2FAEnabled:false,
    },dispatch)
    if(response?.status===200){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        window.location.reload()
      }, 2000);
    }
  }

  return (
    <Fragment>
      {/* Page Header */}
      <Seo title={"EditProfile"} />
      <Pageheader
        Heading="Settings"
        Pages={[
          { title: "Pages", active: true },
          { title: "Settings", active: false },
        ]}
      />
      <Success
        isOpen={open}
        title={"Profile Edited"}
        description={"Your profile has been updated"}
      />
      {openSuccess&&
        <Success
          title={"Enabled"}
          description={"You Two-Factor Authentication has been enabled"}
        />
      }
      {/* Page Header Close */}
      <Tab.Container defaultActiveKey="first">
        {/* Start:: row-1 */}
        <Row>
          <Col xl={12}>
            <Card className="custom-card profile-card">
              <div className="relative group flex justify-end items-end">
                <img
                  src={coverImage}
                  className="card-img-top max-h-[200px] object-cover"
                  alt="Cover Image"
                />
                <label className="absolute bottom-4 right-4 cursor-pointer">
                  <Camera className="text-blue-400 group-hover:block" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, setCoverImage, "cover")
                    }
                  />
                </label>
              </div>

              <Card.Body className="p-4 pb-0 position-relative">
                <span className="avatar avatar-xxl avatar-rounded bg-info online group">
                  <img
                    src={profileImage}
                    className="card-img-top"
                    alt="Cover Image"
                  />
                  <label className="absolute group flex justify-center cursor-pointer">
                    <Camera className="absolute hidden text-blue-400 group-hover:block" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(e, setProfileImage, "profile")
                      }
                    />
                  </label>
                </span>

                <div className="mt-4 mb-3 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                  <div>
                    <h5 className="fw-semibold mb-1">{user?.userName}</h5>
                    {/* <span className="d-block fw-medium text-muted mb-1">
                      Chief Executive Officer (C.E.O)
                    </span> */}
                    <p className="fs-12 mb-0 fw-medium text-muted">
                      {" "}
                      <span className="me-3">
                        <i className="ri-building-line me-1 align-middle"></i>
                        {user?.country}
                      </span>{" "}
                      <span>
                        <i className="ri-map-pin-line me-1 align-middle"></i>
                        {userData?.city}
                      </span>{" "}
                    </p>
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
                      Edit Profile
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
                      Change Password
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item role="presentation">
                    <Nav.Link
                      eventKey="third"
                      className=""
                      id="edit-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#edit-profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="edit-profile-tab-pane"
                      aria-selected="true"
                    >
                      Two-Factor Authentication
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={9}>
            <Tab.Content className="" id="profile-tabs">
              <Tab.Pane
                eventKey="first"
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
                              placeholder="User name"
                              onChange={(e) =>
                                setUser({ ...user, userName: e.target.value })
                              }
                              defaultValue={user?.userName}
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">Full name :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              disabled
                              className="form-control"
                              placeholder="Full name"
                              defaultValue={user?.userName}
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
                              disabled
                              className="form-control"
                              placeholder="email"
                              defaultValue={user?.email}
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
                              disabled
                              className="form-control"
                              placeholder="location"
                              defaultValue={[user?.city, user?.country]}
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
                              onChange={(e) =>
                                setUser({ ...user, bio: e.target.value })
                              }
                              rows={4}
                              defaultValue={user?.bio}
                            ></Form.Control>
                          </Col>
                        </div>
                      </li>
                    </ul>
                    <div className="flex justify-end mr-10 mb-10">
                      <div className="d-grid mt-4">
                        {loading ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-[200px] "
                            type="submit"
                            onClick={() => handleUpdate()}
                          >
                            {" "}
                            Update
                          </button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
                eventKey="second"
                className="p-0 border-0"
                id="change-password-tab-pane"
                role="tabpanel"
                aria-labelledby="change-password-tab"
                tabIndex={0}
              >
                <Card className="custom-card overflow-hidden">
                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-4">
                        <span className="fw-medium fs-15 d-block mb-3">
                          Password :
                        </span>
                        <div className="row gy-4 align-items-center">
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">New Password :</span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter new password"
                              defaultValue={password}
                              onChange={(e) => {
                                setError("");
                                setPassword(e.target.value);
                              }}
                            />
                          </Col>
                          <Col xl={3}>
                            <div className="lh-1">
                              <span className="fw-medium">
                                Confirm New Password :
                              </span>
                            </div>
                          </Col>
                          <Col xl={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Confirm new password"
                              defaultValue={confirmPassword}
                              onChange={(e) => {
                                setError("");
                                setConfirmPassword(e.target.value);
                              }}
                            />
                          </Col>
                        </div>
                      </li>
                    </ul>
                    {error && (
                      <p className="text-red-400 text-center text-[18px]">
                        {error}
                      </p>
                    )}
                    <div className="flex justify-end mr-10 mb-10">
                      <div className="d-grid mt-4">
                        {loading ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <FaSpinner className="spinner-border spinner-border-sm" />{" "}
                            Loading...
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary w-[200px] "
                            type="submit"
                            onClick={() => handleUpdate(true)}
                          >
                            {" "}
                            Change Password
                          </button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane
  eventKey="third"
  className="p-0 border-0"
  id="generate-qr-code-tab-pane"
  role="tabpanel"
  aria-labelledby="generate-qr-code-tab"
  tabIndex={0}
>
  <Card className="custom-card shadow-sm">
    <Card.Body className="p-4">
      {userData?.is2FAEnabled?(<div className="d-flex justify-content-center mt-4">
        <Button
          variant="primary"
          onClick={handleDisable2FA}
          className="w-auto mb-3"
        >
          Disable 2FA
        </Button>
      </div>):(<>
        <div className="text-center mb-4">
        {qrCodeUrl && !showSetupKey && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="rounded"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              margin: "0 auto", // Centering the QR code
            }}
          />
        )}
      </div>

      {/* Setup Key Section */}
      {showSetupKey && setupKey && (
        <div className="text-center mt-3">
          <Form.Control
            type="text"
            value={setupKey}
            readOnly
            className="text-center p-3"
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="primary"
          onClick={handleGenerateQRCode}
          className="w-auto mb-3" // Use w-auto to make the button smaller
          disabled={showBtn2}
        >
          Generate QR Code
        </Button>
      </div>
      
      <div className="d-flex justify-content-center">
        <Button
          disabled={showBtn}
          variant="outline-secondary"
          onClick={handleShowSetupKey}
          className="w-auto" // Use w-auto to make the button smaller
        >
          {showSetupKey ? "Show QR Code" : "Show Setup Key"}
        </Button>
      </div>

  {/* Verify Token Section */}
  <div className="verify-token-section">
      <form>
        <div className="mb-3">
          <label htmlFor="verificationToken">Enter Verification Token</label>
          <input
            type="text"
            id="verificationToken"
            className="form-control"
            value={verificationToken}
            onChange={handleVerificationTokenChange}
            placeholder="Enter the token received"
          />
        </div>
        {error && (
          <p className="text-danger text-center mb-4">{error}</p>
        )}
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success w-auto"
            onClick={handleVerifyToken}
          >
            Verify Token
          </button>
        </div>
      </form>
    </div>
      </>)}
    </Card.Body>
  </Card>
</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
};

export default EditProfile;
