import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/img/categories";

// helper to slugify category names for URLs
const slugify = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

const IngredientDetail = () => {
    const { slug } = useParams();
    const location = useLocation();
    const { id } = location.state || {}; // category id passed from link

    const [category, setCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (id) {
            axios
                .get(
                    `${BASE_URL.replace(
                        "/img/categories",
                        ""
                    )}/api/category/${id}`
                )
                .then((res) => {
                    if (res.data.status) {
                        setCategory(res.data.category);
                        setSubCategories(res.data.subcategories || []);
                    }
                })
                .catch((err) => console.error("Error fetching category:", err));
        }
    }, [id]);

    if (!category) return <p>Loading...</p>;

    // Group subcategories by sub_parent
    const grouped = subCategories.reduce((acc, sub) => {
        const parentKey = sub.sub_parent ? sub.sub_parent : "no_parent";
        if (!acc[parentKey]) acc[parentKey] = [];
        acc[parentKey].push(sub);
        return acc;
    }, {});

    return (
        <main>
            {/* Banner */}
            <section className="innerBanner">
                <div className="container">
                    <h1>{category.name}</h1>
                </div>
            </section>

            {/* Categories List */}
            <section className="contentContainer prodCatList">
                <div className="container">
                    <div className="row">
                        {/* Case 1: No sub-parent → directly under category name */}
                        {grouped["no_parent"] && (
                            <div className="col-12 mb-4">
                                {/* <h3>{category.name} </h3> */}
                                <div className="row">
                                    {grouped["no_parent"].map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="col-lg-3 col-md-4 col-sm-6 d-flex"
                                        >
                                            <Link
                                                to={`/ingredient/${slugify(sub.name)}`}
                                                state={{ id: sub.id }}
                                                className="productBox catBox"
                                            >
                                                <div className="productImage img-hover-zoom">
                                                    <img
                                                        className="imgResponsive"
                                                        src={`${BASE_URL}/${sub.image || "noimage.png"}`}
                                                        alt={sub.name}
                                                    />
                                                </div>
                                                <div className="productInfo">
                                                    <h5 className="productName">{sub.name}</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Case 2: Sub-parent exists → group under sub_parent heading */}
                        {Object.keys(grouped)
                            .filter((key) => key !== "no_parent")
                            .map((parentKey) => (
                                <div key={parentKey} className="col-12 mb-4">
                                    <h3 className="mb-4 text-center font-weight-bold text-dark">{parentKey}</h3>
                                    <div className="row">
                                        {grouped[parentKey].map((sub) => (
                                            <div
                                                key={sub.id}
                                                className="col-lg-3 col-md-4 col-sm-6 d-flex"
                                            >
                                                <Link
                                                    to={`/ingredient/${slugify(sub.name)}`}
                                                    state={{ id: sub.id }}
                                                    className="productBox catBox"
                                                >
                                                    <div className="productImage img-hover-zoom">
                                                        <img
                                                            className="imgResponsive"
                                                            src={`${BASE_URL}/${sub.image || "noimage.png"}`}
                                                            alt={sub.name}
                                                        />
                                                    </div>
                                                    <div className="productInfo">
                                                        <h5 className="productName">{sub.name}</h5>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default IngredientDetail;
