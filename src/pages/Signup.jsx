import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import signupValidator from "../validators/signupValidator";
import { Link } from "react-router-dom";
import signup from "../assets/images/signup.svg";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialFormError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = signupValidator({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const requestBody = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const response = await axios.post("/auth/signup", requestBody);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };
  return (
    <div>
      <section className=" p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0 form-bg">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src={signup}
                      alt="logo"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <h4 className="text-center">
                                Welcome to{" "}
                                <strong
                                  style={{
                                    fontFamily: "cursive",
                                    color: "#fff",
                                  }}
                                >
                                  Pulse Post!
                                </strong>
                                <br />
                                <p style={{ fontWeight: 100 }}>
                                  Signup to continue using
                                </p>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="row gy-3 overflow-hidden">
                            {/* Name field */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  placeholder="Jhon Doe"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                                {formError.name && (
                                  <p className="error">{formError.name}</p>
                                )}
                                <label htmlFor="name" className="form-label">
                                  Name
                                </label>
                              </div>
                            </div>
                            {/* Email field set */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  type="text"
                                  name="email"
                                  placeholder="doe@gmail.com"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                                {formError.email && (
                                  <p className="error">{formError.email}</p>
                                )}
                                <label htmlFor="email" className="form-label">
                                  Email
                                </label>
                              </div>
                            </div>
                            {/* Password Field set */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  placeholder="***********"
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                                {formError.password && (
                                  <p className="error">{formError.password}</p>
                                )}
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  Password
                                </label>
                              </div>
                            </div>
                            {/* Comfirm Password Field set */}
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="***********"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                />
                                {formError.confirmPassword && (
                                  <p className="error">
                                    {formError.confirmPassword}
                                  </p>
                                )}
                                <label
                                  htmlFor="confirm-password"
                                  className="form-label"
                                >
                                  Confirm Password
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="d-grid">
                                <input
                                  className="button"
                                  type="submit"
                                  value={`${loading ? "Saving..." : "Signup"}`}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                              <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                              >
                                Already have an Account?
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
