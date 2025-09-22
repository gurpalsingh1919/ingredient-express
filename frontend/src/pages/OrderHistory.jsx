// src/pages/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

const OrderHistory = () => {

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
				<div className="col-md-12">
					<div className="d-flex align-items-center justify-content-between mb-4">
						<Link to="/my-account" className="editButton">Back</Link>
					</div>
				</div>
			</div>
			<div className="myProfile mt-2">
				<div className="row">
					<div className="col-lg-12">
						<div className="orderInformation">
							<div className="row">
								<div className="col-md-6">
									<div className="mb-2">
									   <strong>Order ID:</strong><span className="ms-2">ORD001</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="mb-2">
									   <strong>Order Date:</strong><span className="ms-2">09-01-2025</span>
									</div>
								</div>
								<hr/>
								<div className="col-md-6">
									<div className="mb-2">
									   <strong>Order Cost:</strong><span className="ms-2">$4,436<sup>00</sup></span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="mb-2">
									   <strong>Order Status</strong><span className="ms-2">Delivered</span>
									</div>
								</div>
								<hr/>
								<div className="col-md-12">
									<div className="mb-2">
									   <strong>Shipping Address:</strong><span className="ms-2">123 Main Street, New Delhi, India</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="orderItemsDetail mt-5">
							<h4 className="">Items Details</h4>
							<div className="shoppingCartProducts">
								<div className="cart-row">
									<div className="row align-items-center">
										<div className="col-md-8 col-sm-8">
											<div className="d-flex align-items-center">
												<div className="productImage"><img src="/images/products/vanilla-sugar-02.jpg" alt="" className="imgResponsive" /></div>
												<Link href="#" className="productName ms-2">Vanilla Sugar</Link>
											</div>
										</div>
										<div className="col-md-4 col-sm-4">
											<div className="d-flex align-items-center justify-content-between">
												<div className="productQuantity">
							                  2
							               </div>
							               <div className="productPriceOuter d-flex">
							               	<div className="productPrice">$4,154.00</div>
							               </div>
						               </div>
										</div>
									</div>
								</div>
								<div className="cart-row">
									<div className="row align-items-center">
										<div className="col-md-8 col-sm-8">
											<div className="d-flex align-items-center">
												<div className="productImage"><img src="/images/products/phosphoric-acid-small.jpg" alt="" className="imgResponsive" /></div>
												<Link href="#" className="productName ms-2">Phosphoric Acid Small</Link>
											</div>
										</div>
										<div className="col-md-4 col-sm-4">
											<div className="d-flex justify-content-between">
												<div className="productQuantity">
							                  1
							               </div>
							               <div className="productPriceOuter d-flex">
							               	<div className="productPrice">$4,154.00</div>
							               </div>
						               </div>
										</div>
									</div>
								</div>
								<div className="cart-row">
									<div className="row">
										<div className="col-md-12 text-end">
											<div className="totalPrice mb-2">Subtotal <span>$4,436<sup>00</sup></span></div>
											<div className="btnOuter mt-4">
							               <button className="custom-btn1 custom-btn2 small-custom-btn3" id="" onClick={() => navigate("/order-history")}>
							               	<i className="fas fa-shopping-cart me-2"></i>checkout
							               </button>
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
}
export default OrderHistory;