// src/pages/Home.jsx
//import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

return (
   <section className="contentContainer contentInfo text-center">
		<div className="container">
			<div className="row">
				<div className="col-xl-4 col-lg-5 col-md-6 col-sm-7 mx-auto">
					<h1 className="mb-2">Reset your password</h1>
					<p>We will send you an email to reset your password.</p>
					<div class="form-group mb-0">
						<input type="email" placeholder="E-mail Address" class="w-100" id="e-mail-address" aria-describedby="e-mail-address" />
						<input type="submit" className="min-width-auto mt-2 custom-btn1 custom-btn2 small-custom-btn3" id="" value="Submit" />
						<p>or <Link to="/login">Cancel</Link></p>
					</div>
				</div>
			</div>
		</div>
   </section>
);
}
export default ForgotPassword;