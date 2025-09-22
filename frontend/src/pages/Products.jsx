// src/pages/Products.jsx
//import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

function Products() {
   
   return (
   <main>
      <section className="innerBanner">
         <div className="container">
            <h1>Products</h1>
         </div>
      </section>
      <section className="contentContainer prodCatList">
         <div className="container">
            <ProductList />
         </div>
      </section>  
   </main>
   );
}
export default Products;