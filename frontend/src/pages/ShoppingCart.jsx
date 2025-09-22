// src/pages/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

const ShoppingCart = () => {

return (
<main>
	<section className="innerBanner">
      <div className="container">
         <h1>Shopping Cart</h1>
      </div>
   </section>
   <section className="contentContainer shoppingCart">
		<div className="container">
			<div className="row">
				<div className="col-md-10 m-auto">
					{/*<h1>Shopping Cart</h1>*/}
					 <Cart />
				</div>
			</div>
		</div>
   </section>
</main>
);
}
export default ShoppingCart;