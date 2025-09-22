// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: ""
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://127.0.0.1:8000/api/register", {
				name: `${formData.first_name} ${formData.last_name}`, // combine first & last name
				email: formData.email,
				password: formData.password,
			});

			Swal.fire({
				icon: "success",
				title: "Registration Successful!",
				text: `Welcome, ${formData.first_name}! You can now login.`,
				confirmButtonText: "Login",
			}).then(() => {
				navigate("/login");
			});
		} catch (error) {
			console.error(error.response?.data || error.message);
			Swal.fire({
				icon: "error",
				title: "Registration Failed",
				text: "Please try again.",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<section className="contentContainer contentInfo text-center">
			<div className="container">
				<div className="row">
					<div className="col-xl-4 col-lg-5 col-md-6 col-sm-7 mx-auto">
						<h1 className="mb-4">Create Account</h1>
						<div className="form-group mb-0">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									placeholder="First Name"
									className="w-100"
									id="first_name"
									value={formData.first_name}
									onChange={handleChange}
									required
								/>
								<input
									type="text"
									placeholder="Last Name"
									className="w-100"
									id="last_name"
									value={formData.last_name}
									onChange={handleChange}
								/>
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
								<input
									type="submit"
									className="min-width-auto mt-2 custom-btn1 custom-btn2 small-custom-btn3"
									value="Create"
								/>
								<p>
									or <Link to="/login">Login</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Register;
