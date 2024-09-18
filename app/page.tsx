"use client";
import nextConfig from "@/next.config.mjs";
import { signIn } from "@/shared/Api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { Alert, Button, Card, Col, Nav, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [err, setError] = useState("");
  const [ipAddress, setIpAddress] = useState('');
  const [geoInfo, setgeoInfo] = useState({});

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state: any) => state.auth.loading);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const Login = (e: any) => {
    e.preventDefault();
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log(user);
    //     RouteChange();
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });
  };

  let { basePath } = nextConfig;
  const router = useRouter();
  const RouteChange = () => {
    let path = "/dashboards/sales";
    router.push(path);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const response = await signIn(data, dispatch);
    if (response.status == 200) {
      return RouteChange();
    } else {
      reset();
      setError(response);
    }
  };


  
  useEffect(() => {
    getVisitorIP();
    fetchIpInfo()
  }, []);
  
  const getVisitorIP = async ()=>{
    try {
      const response = await fetch('https://api.ipify.org')
      const data = await response.text();
      setIpAddress(data)
    } catch (error) {
      console.log(error)
    }
  };

  const fetchIpInfo =async () =>{
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`)
      const data = await response.json();
      setgeoInfo(data)
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Fragment>
      <html data-theme-mode="dark">
        <body className="authentication-background">
          <div className="container">
            <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
              <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
                <div className="my-5 d-flex justify-content-center">
                  <Link scroll={false} href="#!">
                    <img
                      src={`${
                        process.env.NODE_ENV === "production" ? basePath : ""
                      }/assets/images/brand-logos/desktop-dark.png`}
                      alt="logo"
                      className="desktop-dark"
                    />
                  </Link>
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="nextjs">
                  <Card className="custom-card my-4">
                    <Tab.Content>
                      <Tab.Pane eventKey="nextjs" className="border-0">
                        <Card.Body className="p-5 py-4">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="h4 mb-2 fw-semibold">Sign In</p>
                            <div className="row gy-3">
                              {err && <Alert variant="danger">{err}</Alert>}
                              <Col xl={12}>
                                <label
                                  htmlFor="signin-username"
                                  className="form-label text-default"
                                >
                                  Email
                                </label>
                                <input
                                  type="text"
                                  {...register("email", {
                                    required: {
                                      value: true,
                                      message: "Email is required",
                                    },
                                    pattern: {
                                      value:
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                      message: "This input is pattern only.",
                                    },
                                  })}
                                  className="form-control"
                                />
                                {errors.email && (
                                  <p className="mt-2 text-danger">
                                    {errors.email?.message}{" "}
                                  </p>
                                )}
                              </Col>
                              <Col xl={12} className="mb-2">
                                <label
                                  htmlFor="signin-password"
                                  className="form-label text-default d-block"
                                >
                                  Password
                                  <Link
                                    scroll={false}
                                    href="forget-password"
                                    className="float-end  link-danger op-5 fw-medium fs-12"
                                  >
                                    Forget password ?
                                  </Link>
                                </label>
                                <div className="position-relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                      required: {
                                        value: true,
                                        message: "Password is required",
                                      },
                                      maxLength: {
                                        value: 10,
                                        message:
                                          "This input must exceed 10 characters",
                                      },
                                    })}
                                    className="form-control"
                                  />
                                  <span
                                    className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                  >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                  </span>
                                </div>
                                {errors.password && (
                                  <p className="mt-2 text-danger">
                                    {errors.password?.message}
                                  </p>
                                )}
                                <div className="mt-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue=""
                                      id="defaultCheck1"
                                    />
                                    <label
                                      className="form-check-label text-muted fw-normal fs-12"
                                      htmlFor="defaultCheck1"
                                    >
                                      Remember password ?
                                    </label>
                                  </div>
                                </div>
                              </Col>
                            </div>
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
                                <input
                                  className="btn btn-primary"
                                  type="submit"
                                  placeholder="Sign In"
                                  value={"Sign In"}
                                />
                              )}
                            </div>
                            <div className="text-center">
                              <p className="text-muted mt-3 mb-0">
                                Dont have an account?{" "}
                                <Link
                                  scroll={false}
                                  href="/sign-up"
                                  className="text-primary"
                                >
                                  Sign Up
                                </Link>
                              </p>
                            </div>
                          </form>
                        </Card.Body>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card>
                </Tab.Container>
              </Col>
            </div>
          </div>
        </body>
      </html>
    </Fragment>
  );
}
