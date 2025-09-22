// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/img/products/";

const Cart = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const authToken = localStorage.getItem("auth_token");

	// ✅ Fetch cart from backend
	const fetchCart = async () => {
		if (!authToken) return;
		try {
			const res = await axios.get("http://127.0.0.1:8000/api/cart", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			setCartItems(res.data.items || []);
		} catch (err) {
			console.error("Error fetching cart:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	// ✅ Update quantity (optimistic update)
	const updateQuantity = async (id, quantity) => {
		if (quantity < 1) return;

		// update in state immediately
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity } : item
			)
		);

		try {
			await axios.put(
				`http://127.0.0.1:8000/api/cart/${id}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${authToken}` } }
			);
			window.dispatchEvent(new Event("cartUpdated")); // update header
		} catch (err) {
			console.error("Error updating quantity:", err);
		}
	};

	// ✅ Remove item
	const removeItem = async (id) => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			setCartItems((prev) => prev.filter((item) => item.id !== id));
			window.dispatchEvent(new Event("cartUpdated"));
		} catch (err) {
			console.error("Error removing item:", err);
		}
	};

	// ✅ Calculate subtotal
	const subtotal = cartItems.reduce(
		(total, item) => total + item.product.doubled_price * item.quantity,
		0
	);

	if (loading) return <p>Loading cart...</p>;

	return (
		<div className="shoppingCartProducts">
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cartItems.map((item) => (
					<div className="cart-row" key={item.id}>
						<div className="row align-items-center">
							<div className="col-md-6">
								<div className="d-flex align-items-center">
									<div className="productImage">
										<img
											src={`${BASE_URL}${item.product.images?.[0]?.image || "noimage.png"}`}
											alt={item.product.title}
											style={{
												width: "80px",
												height: "80px",
												objectFit: "cover",
												borderRadius: "6px",
												border: "1px solid #ddd",
											}}
										/>
									</div>
									<Link to="#" className="productName ms-2">
										{item.product.title}
									</Link>
								</div>
							</div>
							<div className="col-md-6">
								<div className="d-flex justify-content-between align-items-center">
									{/* Quantity Controls */}
									<div className="productQuantity">
										<div className="d-flex align-items-center">
											<button
												className="btn btn-outline-secondary"
												onClick={() => updateQuantity(item.id, item.quantity - 1)}
											>
												<i className="fa-solid fa-minus"></i>
											</button>
											<input
												type="text"
												className="form-control text-center mb-0"
												style={{ width: "40px" }}
												value={item.quantity}
												onChange={(e) =>
													updateQuantity(item.id, parseInt(e.target.value) || 1)
												}
											/>
											<button
												className="btn btn-outline-secondary"
												onClick={() => updateQuantity(item.id, item.quantity + 1)}
											>
												<i className="fa-solid fa-plus"></i>
											</button>
										</div>
									</div>

									{/* Price + Remove */}
									<div className="productPriceOuter d-flex align-items-center">
										<div className="productPrice">
											${(item.product.doubled_price * item.quantity).toLocaleString()}
										</div>
										<button
											className="removeProduct btn btn-link text-danger ms-2"
											onClick={() => removeItem(item.id)}
										>
											<i className="fa-solid fa-xmark"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			)}

			{/* Subtotal Section */}
			{cartItems.length > 0 && (
				<div className="cart-row">
					<div className="row">
						<div className="col-md-12 text-end">
							<div className="totalPrice mb-2">
								Subtotal{" "}
								<span>
									${subtotal.toLocaleString()}
									<sup>00</sup>
								</span>
							</div>
							<p className="highlighted">
								<em>Taxes and shipping calculated at checkout</em>
							</p>
							<div className="btnOuter mt-5">
								<button
									className="btn min-width-auto custom-btn1 custom-btn2 small-custom-btn3 updateCart w-auto me-2"
									onClick={fetchCart}
								>
									Update cart
								</button>
								<button
									className="btn btn-primary min-width-auto custom-btn1 custom-btn2 small-custom-btn3 mt-0"
									onClick={() => navigate("/checkout")}
								>
									<i className="fas fa-shopping-cart me-2"></i>Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
