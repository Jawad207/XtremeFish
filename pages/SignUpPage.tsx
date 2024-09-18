"use client";
import nextConfig from "@/next.config.mjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Alert, Button, Card, Col, Nav, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signUp } from "@/shared/Api/auth";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const dispatch = useDispatch();

  let { basePath } = nextConfig;
  const router = useRouter();
  const loading = useSelector((state: any) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [err, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const RouteChange = () => {
    let path = "/dashboards/sales";
    router.push(path);
  };

  const onSubmit = async (data: any) => {
    const response = await signUp(data, dispatch);
    if (response.status == 200) {
      return RouteChange();
    } else {
      setError(response);
      reset();
    }
    return;
  };

  return (
    <Fragment>
      <div className="authentication-background">
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
                <Card className="custom-card my-4 bg-red-300 ">
                  <Tab.Content>
                    <Tab.Pane eventKey="nextjs" className="border-0">
                      <Card.Body className="p-5 py-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <p className="h4 mb-2 fw-semibold">Sign Up</p>
                          <p className="mb-4 text-muted fw-normal">
                            Join us by creating a free account !
                          </p>
                          <div className="row gy-3">
                            {err && <Alert variant="danger">{err}</Alert>}
                            <Col xl={12}>
                              <label
                                htmlFor="signin-username"
                                className="form-label text-default"
                              >
                                User Name
                              </label>
                              <input
                                type="text"
                                {...register("userName", {
                                  required: {
                                    value: true,
                                    message: "User Name is required",
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
                              </label>
                              <div className="position-relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  {...register("password", {
                                    required: {
                                      value: true,
                                      message: "Password is required",
                                    },
                                    minLength: {
                                      value: 8,
                                      message:
                                        "Password must be at least 8 characters long",
                                    },
                                    pattern: {
                                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                      message:
                                        "Password must include at least one uppercase letter and one symbol",
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
                                <div className="form-check items-center">
                                  <input
                                    className="form-check-input border"
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
                                placeholder="Sign Up"
                                value="Sign Up"
                              />
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-muted mt-3 mb-0">
                              Already have an account ?{" "}
                              <Link
                                scroll={false}
                                href="/"
                                className="text-primary"
                              >
                                Sign in
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
      </div>
    </Fragment>
  );
};

export default SignUp;
