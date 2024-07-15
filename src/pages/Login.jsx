import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import loginValidator from "../validators/loginValidator";
import { useNavigate, Link } from "react-router-dom";
import login from "../assets/images/login.svg";

const initialFormData = {
  email: "",
  password: "",
};

const initialFormError = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        // api request
        const response = await axios.post("/auth/signin", formData);
        const data = response.data;

        window.localStorage.setItem("blogData", JSON.stringify(data.data));

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/");
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
                      src={login}
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
                                Welcome back you&apos;ve been missed!
                              </h4>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="name@example.com"
                                  required
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
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                  required
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

                            <div className="col-12">
                              <div className="d-grid">
                                <input
                                  className="button"
                                  type="submit"
                                  value={`${loading ? "Loging..." : "Login"}`}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                              <Link to="/signup">Create new account</Link>
                              <Link
                                className="forgot-password"
                                to="/forgot-password"
                              >
                                Forgot Password
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

export default Login;
