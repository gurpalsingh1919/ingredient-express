import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../config";

const MyAccount = () => {
	const [key, setKey] = useState("tab1");
	const [user, setUser] = useState(null);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchOrders = async () => {
		const authToken = localStorage.getItem("auth_token");
		if (!authToken) {
			setLoading(false);
			return;
		}
		try {
			const res = await axios.get(`${API_BASE_URL}/api/orders`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			if (res.data.success) {
				setOrders(res.data.orders || []);
			}
		} catch (err) {
			console.error("Error fetching orders:", err.response?.data || err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		setUser(storedUser);
		fetchOrders();
	}, []);

	const fullName = user?.name || "";
	const nameParts = fullName.trim().split(" ");
	const firstName = nameParts[0] || "";
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
												{loading ? (
													<p>Loading orders...</p>
												) : orders.length > 0 ? (
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
																{orders.map((order) => (
																	<tr key={order.id}>
																		<td>
																			<Link to={`/order-history/${order.id}`}>
																				{order.id}
																			</Link>
																		</td>
																		<td>
																			{new Date(order.created_at).toLocaleDateString()}
																		</td>
																		<td>{order.payment_status}</td>
																		<td>
																			$
																			{(order.orderItems || order.order_items || []).reduce(
																				(sum, item) => sum + item.quantity * item.price,
																				0
																			).toFixed(2)}
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												) : (
													<div className="alert alert-info">No orders found.</div>
												)}
											</div>
										</div>
									</Tab>

									{/* Change Password Tab */}
									<Tab eventKey="tab2" title="Change Password">
										<div className="row">
											<div className="col-md-12">
												<h4>Change Password</h4>
												<div className="form-group mb-2">
													<label>Old Password</label>
													<input type="password" className="w-50 form-control" />
												</div>
												<div className="form-group mb-2">
													<label>New Password</label>
													<input type="password" className="w-50 form-control" />
												</div>
												<button className="custom-btn1 custom-btn2 small-custom-btn3 mt-2">
													Submit
												</button>
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
