import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		try {
			const res = await axios.post(`${API_BASE_URL}/api/login`, {
				email: formData.email,
				password: formData.password,
			});

			if (res.data.token) {
				localStorage.setItem("auth_token", res.data.token);
				localStorage.setItem("user", JSON.stringify(res.data.user));

				Swal.fire({
					icon: "success",
					title: "Login Successful!",
					text: `Welcome back, ${res.data.user.name || "User"} 👋`,
					timer: 2000,
					showConfirmButton: false,
				});

				navigate("/");
			}
		} catch (err) {
			if (err.response?.data?.errors) {
				setErrors(Object.values(err.response.data.errors).flat());
			} else if (err.response?.data?.message) {
				setErrors([err.response.data.message]);
			} else {
				setErrors(["Something went wrong."]);
			}
		}
	};

	return (
		<main>
			<section className="innerBanner">
				<div className="container">
					<h1>Login</h1>
				</div>
			</section>

			<section className="contentContainer contentInfo text-center">
				<div className="container">
					<div className="row">
						<div className="col-xl-4 col-lg-5 col-md-6 col-sm-7 mx-auto">
							{errors.length > 0 && (
								<div className="note form-error mb-3">
									<ul className="disc mb-0">
										{errors.map((err, i) => (
											<li key={i}>{err}</li>
										))}
									</ul>
								</div>
							)}

							<div className="form-group mb-0">
								<form onSubmit={handleSubmit}>
									<input
										type="email"
										placeholder="E-mail Address"
										className="w-100"
										id="email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
									<input
										type="password"
										placeholder="Password"
										className="w-100"
										id="password"
										value={formData.password}
										onChange={handleChange}
										required
									/>

									<p className="mb-3">
										<Link to="/forgot-password">Forgot your password?</Link>
									</p>

									<button
										type="submit"
										className="custom-btn1 custom-btn2 small-custom-btn3 mt-0 mb-3"
									>
										Sign In
									</button>

									<p>
										or <Link to="/">Return to Store</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Login;
