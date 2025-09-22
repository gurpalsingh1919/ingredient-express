// src/pages/MyAccount.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

const MyAccount = () => {
	const [key, setKey] = useState("tab1");
	const [user, setUser] = useState(null);
	const [orders, setOrders] = useState([]);

	// Load user + orders (mock now, API later)
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		setUser(storedUser);

		// Example mock orders, replace with API call
		setOrders([
			{ id: "ORD001", date: "09-01-2025", status: "Delivered", amount: "$1,200" },
			{ id: "ORD002", date: "25-05-2025", status: "Shipped", amount: "$3,499" },
			{ id: "ORD003", date: "10-08-2025", status: "Cancelled", amount: "$2,499" },
		]);
	}, []);

	// Safely split full name into first and last
	const fullName = user?.name || "";
	const nameParts = fullName.trim().split(" ");

	// First name is always the first word
	const firstName = nameParts[0] || "";

	// Last name is everything else joined back
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	return (
		<main>
			<section className="innerBanner">
				<div className="container">
					<h1>My Account</h1>
				</div>
			</section>

			<section className="contentContainer myAccount">
				<div className="container">
					{/* Edit Button */}
					<div className="row">
						<div className="col-md-12">
							<div className="d-flex align-items-center justify-content-end">
								<a href="#" className="editButton">Edit</a>
							</div>
						</div>
					</div>

					{/* Profile Section */}
					<div className="myProfile mt-2 pb-5">
						<div className="row">
							<div className="col-lg-3 col-md-4 text-center">
								<div className="userImage text-center m-auto position-relative">
									<img
										src={user?.avatar || "/images/user-image-02.jpg"}
										alt="User"
										className="rounded-circle img-fluid shadow"
									/>
									<a href="#" className="d-none">Edit</a>
								</div>
							</div>

							<div className="col-lg-9 col-md-8">
								<div className="userInformation pt-2">
									<div className="row">
										<div className="col-md-6">
											<div className="mb-2">
												<strong>First Name:</strong>
												<span className="ms-2">{firstName || ""}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-2">
												<strong>Last Name:</strong>
												<span className="ms-2">{lastName || ""}</span>
											</div>
										</div>
										<hr />
										<div className="col-md-6">
											<div className="mb-2">
												<strong>Phone:</strong>
												<span className="ms-2">{user?.phone || "N/A"}</span>
											</div>
										</div>
										<div className="col-md-6">
											<div className="mb-2">
												<strong>Email:</strong>
												<span className="ms-2">{user?.email}</span>
											</div>
										</div>
										<hr />
										<div className="col-md-12">
											<div className="mb-2">
												<strong>Address:</strong>
												<span className="ms-2">{user?.address || "N/A"}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs Section */}
					<div className="myAccountInformation mt-5">
						<div className="row">
							<div className="col-lg-12">
								<Tabs
									id="controlled-tabs"
									activeKey={key}
									onSelect={(k) => setKey(k)}
									className="mb-3"
								>
									{/* Order History Tab */}
									<Tab eventKey="tab1" title="Order History">
										<div className="row">
											<div className="col-md-12">
												<h4>Order History</h4>
												<div className="table-responsive">
													<table className="table table-bordered table-hover text-center align-middle">
														<thead className="table-dark">
															<tr>
																<th>Order ID</th>
																<th>Date</th>
																<th>Status</th>
																<th>Amount</th>
															</tr>
														</thead>
														<tbody>
															{orders.length > 0 ? (
																orders.map((order, idx) => (
																	<tr key={idx}>
																		<td>
																			<Link to={`/order-history/${order.id}`}>{order.id}</Link>
																		</td>
																		<td>{order.date}</td>
																		<td>{order.status}</td>
																		<td>{order.amount}</td>
																	</tr>
																))
															) : (
																<tr>
																	<td colSpan="4">No orders found</td>
																</tr>
															)}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</Tab>

									{/* Change Password Tab */}
									<Tab eventKey="tab2" title="Change Password">
										<div className="row">
											<div className="col-md-12">
												<h4>Change Password</h4>
												<div className="form-group mb-0">
													<label>Old Password</label>
													<input type="password" className="w-50" />
												</div>
												<div className="form-group mb-0">
													<label>New Password</label>
													<input type="password" className="w-50" />
												</div>
												<div className="form-group mb-0">
													<button className="custom-btn1 custom-btn2 small-custom-btn3">
														Submit
													</button>
												</div>
											</div>
										</div>
									</Tab>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default MyAccount;
