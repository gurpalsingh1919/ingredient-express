import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { API_BASE_URL, PRODUCT_IMG_BASE_URL } from "../config";

const Cart = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [flashMessage, setFlashMessage] = useState(null);

	const authToken = localStorage.getItem("auth_token");

	const showFlash = (msg, type = "success") => {
		setFlashMessage({ msg, type });
		setTimeout(() => setFlashMessage(null), 3000);
	};

	const fetchCart = async () => {
		if (!authToken) return;
		try {
			const res = await axios.get(`${API_BASE_URL}/api/cart`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			setCartItems(res.data.items || []);
		} catch (err) {
			console.error("Error fetching cart:", err);
			showFlash("Failed to fetch cart", "danger");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const updateQuantity = async (id, quantity) => {
		if (quantity < 1) return;
		setCartItems(prev =>
			prev.map(item => (item.id === id ? { ...item, quantity } : item))
		);
		try {
			await axios.put(
				`${API_BASE_URL}/api/cart/${id}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${authToken}` } }
			);
			showFlash("Quantity updated");
			window.dispatchEvent(new Event("cartUpdated"));
		} catch (err) {
			console.error("Error updating quantity:", err);
			showFlash("Quantity Updated", "success");
		}
	};

	const removeItem = async id => {
		try {
			await axios.delete(`${API_BASE_URL}/api/cart/remove/${id}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			setCartItems(prev => prev.filter(item => item.id !== id));
			showFlash("Item removed from cart");
			window.dispatchEvent(new Event("cartUpdated"));
		} catch (err) {
			console.error("Error removing item:", err);
			showFlash("Failed to remove item", "danger");
		}
	};

	const subtotal = cartItems.reduce(
		(total, item) => total + item.product.doubled_price * item.quantity,
		0
	);

	if (loading) return <p>Loading cart...</p>;

	return (
		<div className="shoppingCartProducts container py-4">
			<h2 className="mb-4">Your Cart</h2>

			{flashMessage && (
				<div className={`alert alert-${flashMessage.type}`} role="alert">
					{flashMessage.msg}
				</div>
			)}

			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					{cartItems.map(item => (
						<div
							className="cart-row d-flex align-items-center justify-content-between mb-3 p-3 border rounded"
							key={item.id}
						>
							<div className="d-flex align-items-center">
								<img
									src={`${PRODUCT_IMG_BASE_URL}${item.product.images?.[0]?.image || "noimage.png"}`}
									alt={item.product.title}
									style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }}
								/>
								<Link to="#" className="productName ms-3">{item.product.title}</Link>
							</div>
							<div className="d-flex align-items-center">
								<button className="btn btn-outline-secondary me-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
								<input
									type="text"
									value={item.quantity}
									onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
									className="form-control text-center me-1"
									style={{ width: "50px" }}
								/>
								<button className="btn btn-outline-secondary me-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
								<div className="text-end me-3">
									<strong>${(item.product.doubled_price * item.quantity).toLocaleString()}</strong>
								</div>
								<button className="btn btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
							</div>
						</div>
					))}

					<div className="text-end mb-4">
						<h4>Subtotal: ${subtotal.toLocaleString()}</h4>
						<p className="text-muted">Taxes and shipping calculated at checkout</p>
					</div>

					{/* PayPal Checkout */}
					<div className="d-flex justify-content-end">
						<PayPalScriptProvider options={{ "client-id": "AZkKy4Irugc65kFa115SWaPw91nSym6pptmlHj6KZMWD_5srg4KxpZoKK34tYhQ2_5eXhnu7l-nbYMov", currency: "USD" }}>
							<PayPalButtons
								style={{ layout: "vertical", color: "blue", shape: "pill", label: "checkout" }}
								createOrder={(data, actions) => {
									return actions.order.create({
										purchase_units: [{ amount: { value: subtotal.toFixed(2) } }],
									});
								}}
								onApprove={async (data, actions) => {
									try {
										const order = await actions.order.capture();
										console.log("Payment successful!", order);

										// Send entire PayPal order to backend
										await axios.post(
											`${API_BASE_URL}/api/paypal/checkout`,
											{ paypal_order: order },
											{ headers: { Authorization: `Bearer ${authToken}` } }
										);

										showFlash("Payment completed successfully!");

									} catch (err) {
										console.error("PayPal Checkout Error:", err);
										showFlash("PayPal Checkout failed", "danger");
									}
								}}
								onError={(err) => {
									console.error("PayPal Checkout Error:", err);
									showFlash("PayPal Checkout failed", "danger");
								}}
							/>
						</PayPalScriptProvider>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
