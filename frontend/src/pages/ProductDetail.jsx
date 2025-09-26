import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config"; // import your dynamic base URL

function ProductDetail() {
   const { id } = useParams();
   const navigate = useNavigate();

   const [product, setProduct] = useState(null);
   const [sizes, setSizes] = useState([]);
   const [selectedSize, setSelectedSize] = useState("");
   const [quantity, setQuantity] = useState(1);

   // Fetch product details
   useEffect(() => {
      axios
         .get(`${API_BASE_URL}/api/products/${id}`)
         .then((res) => {
            if (res.data.status) {
               setProduct(res.data.product);
               setSizes(res.data.sizes);

               if (res.data.sizes.length > 0) {
                  setSelectedSize(res.data.sizes[0]);
               }
            }
         })
         .catch((err) => console.error("Error fetching product:", err));
   }, [id]);

   const handleChangeQty = (e) => {
      let val = parseInt(e.target.value);
      setQuantity(isNaN(val) || val < 1 ? 1 : val);
   };

   // Add to Cart Handler
   const handleAddToCart = () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
         Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "You must be logged in to add items to your cart.",
            showCancelButton: true,
            confirmButtonText: "Login Now",
            cancelButtonText: "Cancel",
         }).then((result) => {
            if (result.isConfirmed) navigate("/login");
         });
         return;
      }

      axios
         .post(
            `${API_BASE_URL}/api/cart/add`,
            {
               product_id: product.id,
               size: selectedSize,
               quantity: quantity,
            },
            { headers: { Authorization: `Bearer ${token}` } }
         )
         .then(() => {
            Swal.fire({
               icon: "success",
               title: "Added to Cart",
               text: `${product.title} (${selectedSize}) has been added to your cart.`,
               timer: 2000,
               showConfirmButton: false,
            });

            // Dispatch cart update event
            window.dispatchEvent(new Event("cartUpdated"));
         })
         .catch((err) => {
            console.error(err);
            Swal.fire({
               icon: "error",
               title: "Error",
               text: "Failed to add product to cart. Please try again.",
            });
         });
   };

   if (!product) return <p>Loading...</p>;

   return (
      <main>
         <section className="contentContainer productDetailOuter">
            <div className="container">
               <div className="row">
                  {/* Thumbnails */}
                  <div className="col-md-7 d-flex productDetailThumbOuter">
                     <div className="thumbs">
                        {product.images?.map((img, index) => (
                           <img
                              key={index}
                              src={`${API_BASE_URL}/img/products/${img.image}`}
                              alt={product.title}
                           />
                        ))}
                     </div>
                     <div className="main-image text-center w-100">
                        <img
                           id="mainImg"
                           src={
                              product.images?.length > 0
                                 ? `${API_BASE_URL}/img/products/${product.images[0].image}`
                                 : `${API_BASE_URL}/img/categories/noimage.png`
                           }
                           alt={product.title}
                        />
                     </div>
                  </div>

                  {/* Product Details */}
                  <div className="col-md-5">
                     <div className="productDetail">
                        <h1>{product.title}</h1>
                        <h4>${product.doubled_price}</h4>
                        <hr />

                        {sizes.length > 0 && (
                           <div className="productSizes">
                              <label>Size</label>
                              <select
                                 className="single-option-selector"
                                 value={selectedSize}
                                 onChange={(e) => setSelectedSize(e.target.value)}
                              >
                                 {sizes.map((size, idx) => (
                                    <option key={idx} value={size}>
                                       {size}
                                    </option>
                                 ))}
                              </select>
                           </div>
                        )}

                        <div className="productQuantity mt-3">
                           <label>Quantity</label>
                           <div className="d-flex align-items-center">
                              <button
                                 className="btn btn-outline-secondary"
                                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              >
                                 <i className="fa-solid fa-minus"></i>
                              </button>
                              <input
                                 type="text"
                                 className="form-control text-center mb-0"
                                 style={{ width: "78px" }}
                                 value={quantity}
                                 onChange={handleChangeQty}
                              />
                              <button
                                 className="btn btn-outline-secondary"
                                 onClick={() => setQuantity((q) => q + 1)}
                              >
                                 <i className="fa-solid fa-plus"></i>
                              </button>
                           </div>
                        </div>

                        <div className="mt-4">
                           <button className="btn btn-primary" onClick={handleAddToCart}>
                              <i className="fa-solid fa-cart-shopping me-2"></i>
                              Add to Cart
                           </button>
                        </div>

                        <hr />
                        <p>Call Us For More Details</p>
                        <hr />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Back link */}
         <section>
            <div className="container">
               <div className="row">
                  <div className="col-md-12 text-center">
                     <Link to="/products" className="h1 return-link">
                        <i className="fa-solid fa-arrow-left"></i> Back to Products
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}

export default ProductDetail;
