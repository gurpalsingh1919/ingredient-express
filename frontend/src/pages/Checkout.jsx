//import Cart from '../components/Cart';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {

const navigate = useNavigate(); 

return (
   <section className="contentContainer CheckoutForm">
		<div className="container">
			<div className="row">
				<div className="col-lg-7 col-md-6">
					<div className="deliveryInformation">
						<h4>Shipping Address</h4>
						<div className="row">
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="Company-name">Country</label>
									<select className="w-100">
										<option>Select Country</option>
										<option>India</option>
									</select>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group mb-0">
									<label for="first-name">First Name</label>
									<input type="text" className="w-100" id="first-name" placeholder="First Name" aria-describedby="first-name" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group mb-0">
									<label for="last-name">Last Name</label>
									<input type="text" className="w-100" id="last-name" placeholder="Last Name" aria-describedby="last-name" />
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="address">Address</label>
									<input type="text" className="w-100" id="address" placeholder="Address" aria-describedby="address" />
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="apartment">Apartment, suit, etc (Optional)</label>
									<input type="text" className="w-100" id="apartment" placeholder="Apartment, suit, etc (Optional)" aria-describedby="apartment" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="city">City</label>
									<input type="text" className="min-width-auto w-100" id="city" placeholder="City" aria-describedby="city" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="state">State</label>
									<input type="text" className="min-width-auto w-100" id="state" placeholder="State" aria-describedby="state" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="pin-code">Pin Code</label>
									<input type="text" className="min-width-auto w-100" id="pin-code" placeholder="Pin Code" aria-describedby="pin-code" />
								</div>
							</div>
						</div>
					</div>

					<div className="deliveryInformation">
						<h4 className="mt-4">Billing Address</h4>
						<div className="sameAddress">
							<div class="form-check ps-0 mb-2 d-flex align-items-center">
								<input class="min-width-auto w-auto min-height-auto m-0 me-2" id="exampleCheck1" type="checkbox" />
								<label class="form-check-label d-inline-block m-0" for="exampleCheck1">Same as Shipping address</label>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="Company-name">Country</label>
									<select className="w-100">
										<option>Select Country</option>
										<option>India</option>
									</select>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group mb-0">
									<label for="first-name">First Name</label>
									<input type="text" className="w-100" id="first-name" placeholder="First Name" aria-describedby="first-name" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group mb-0">
									<label for="last-name">Last Name</label>
									<input type="text" className="w-100" id="last-name" placeholder="Last Name" aria-describedby="last-name" />
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="address">Address</label>
									<input type="text" className="w-100" id="address" placeholder="Address" aria-describedby="address" />
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group mb-0">
									<label for="apartment">Apartment, suit, etc (Optional)</label>
									<input type="text" className="w-100" id="apartment" placeholder="Apartment, suit, etc (Optional)" aria-describedby="apartment" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="city">City</label>
									<input type="text" className="min-width-auto w-100" id="city" placeholder="City" aria-describedby="city" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="state">State</label>
									<input type="text" className="min-width-auto w-100" id="state" placeholder="State" aria-describedby="state" />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group mb-0">
									<label for="pin-code">Pin Code</label>
									<input type="text" className="min-width-auto w-100" id="pin-code" placeholder="Pin Code" aria-describedby="pin-code" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-5 col-md-6">
					 <div className="shoppingCartProducts checkoutCart">
						<div className="cart-row">
							<div className="row align-items-center">
								<div className="col-md-8 col-sm-8">
									<div className="d-flex align-items-center">
										<div className="productImage"><img src="/images/products/vanilla-sugar-02.jpg" alt="" className="imgResponsive" /></div>
										<Link href="#" className="productName ms-2">Vanilla Sugar</Link>
									</div>
								</div>
								<div className="col-md-4 col-sm-4">
									<div className="d-flex justify-content-between">
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
   </section>
);
}
export default Checkout;