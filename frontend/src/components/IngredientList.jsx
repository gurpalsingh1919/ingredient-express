import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/img/categories/";
const slugify = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((res) => {
                if (res.data.status) {
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    return (
        <>
            <div className="row">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
                            <Link
                                to={`/ingredient/${slugify(category.name)}`}
                                state={{ id: category.id }}
                                className="productBox catBox"
                            >
                                <div className="productImage img-hover-zoom">
                                    <img
                                        className="imgResponsive"
                                        src={`${BASE_URL}${category.image || "noimage.png"}`}
                                        alt={category.name}
                                    />

                                </div>
                                <div className="productInfo">
                                    <h5 className="productName">{category.name}</h5>
                                    {/* {category.price && (
                                        <div className="productPrice">From ${category.price}</div>
                                    )} */}
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No Ingredient found.</p>
                )}
            </div>
        </>
    );
};

export default CategoryList;
