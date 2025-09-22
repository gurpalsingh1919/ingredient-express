// src/pages/Products.jsx
//import Layout from '../components/Layout';
import IngredientList from '../components/IngredientList';

function Ingredients() {
   
   return (
   <main>
      <section className="innerBanner">
         <div className="container">
            <h1>Ingredients</h1>
         </div>
      </section>
      <section className="contentContainer prodCatList">
         <div className="container">
            <IngredientList />
         </div>
      </section>  
   </main>
   );
}
export default Ingredients;