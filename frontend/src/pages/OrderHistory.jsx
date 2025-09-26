import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config"; // import dynamic base URL

const OrderHistory = () => {
	const { orderId } = useParams(); // get orderId from URL
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch order details
	const fetchOrder = async () => {
		const token = localStorage.getItem("auth_token");
		if (!token) {
			setLoading(false);
			return;
		}

		try {
			const res = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (res.data.success) {
				setOrder(res.data.order);
			} else {
				setOrder(null);
			}
		} catch (err) {
			console.error("Error fetching order:", err.response?.data || err.message);
			setOrder(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrder();
	}, [orderId]);

	if (loading) return <p>Loading order details...</p>;
	if (!order) return <p>Order not found.</p>;

	const orderItems = order.orderItems || order.order_items || [];
	const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

	return (
		<main>
			<section className="innerBanner">
				<div className="container">
					<h1>Order History</h1>
				</div>
			</section>

			<section className="contentContainer myAccount">
				<div className="container">
					<div className="row">
						<div className="col-md-12 mb-4">
							<Link to="/my-account" className="editButton">
								Back
							</Link>
						</div>
					</div>

					{/* Order Info */}
					<div className="myProfile mt-2">
						<div className="row">
							<div className="col-lg-12">
								<div className="orderInformation">
									<div className="row">
										<div className="col-md-6 mb-2">
											<strong>Order ID:</strong>
											<span className="ms-2">{order.id}</span>
										</div>
										<div className="col-md-6 mb-2">
											<strong>Order Date:</strong>
											<span className="ms-2">
												{new Date(order.created_at).toLocaleDateString()}
											</span>
										</div>
										<hr />
										<div className="col-md-6 mb-2">
											<strong>Order Cost:</strong>
											<span className="ms-2">${subtotal.toFixed(2)}</span>
										</div>
										<div className="col-md-6 mb-2">
											<strong>Order Status:</strong>
											<span className="ms-2">{order.payment_status}</span>
										</div>
										<hr />
										<div className="col-md-12 mb-2">
											<strong>Shipping Address:</strong>
											<span className="ms-2">{order.shipping_address || "N/A"}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Items Details */}
							<div className="col-lg-12 mt-5">
								<div className="orderItemsDetail">
									<h4>Items Details</h4>
									<div className="shoppingCartProducts">
										{orderItems.map((item) => (
											<div className="cart-row" key={item.id}>
												<div className="row align-items-center">
													<div className="col-md-8 col-sm-8">
														<div className="d-flex align-items-center">
															<div className="productImage">
																<img
																	src={
																		item.product?.image
																			? `${API_BASE_URL}/img/products/${item.product.image}`
																			: `${API_BASE_URL}/img/categories/noimage.png`
																	}
																	alt={item.product?.title || "Product"}
																	className="imgResponsive"
																/>
															</div>
															<span className="productName ms-2">
																{item.product?.title || "Product"}
															</span>
														</div>
													</div>
													<div className="col-md-4 col-sm-4">
														<div className="d-flex align-items-center justify-content-between">
															<div className="productQuantity">{item.quantity}</div>
															<div className="productPriceOuter d-flex">
																<div className="productPrice">
																	${(item.price * item.quantity).toFixed(2)}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}

										<div className="cart-row">
											<div className="row">
												<div className="col-md-12 text-end">
													<div className="totalPrice mb-2">
														Subtotal <span>${subtotal.toFixed(2)}</span>
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
		</main>
	);
};

export default OrderHistory;
