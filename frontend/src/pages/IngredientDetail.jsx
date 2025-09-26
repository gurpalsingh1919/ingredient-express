import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, CATEGORY_IMG_BASE_URL } from "../config";

// helper to slugify names for URLs
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
                .get(`${API_BASE_URL}/api/category/${id}`)
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

            {/* Subcategories List */}
            <section className="contentContainer prodCatList">
                <div className="container">
                    <div className="row">
                        {/* No sub-parent */}
                        {grouped["no_parent"] && (
                            <div className="col-12 mb-4">
                                <div className="row">
                                    {grouped["no_parent"].map((sub) => (
                                        <div key={sub.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
                                            <Link
                                                to={`/subcategory/${slugify(sub.name)}`}
                                                state={{ id: sub.id, name: sub.name }}
                                                className="productBox catBox"
                                            >
                                                <div className="productImage img-hover-zoom">
                                                    <img
                                                        className="imgResponsive"
                                                        src={`${CATEGORY_IMG_BASE_URL}/${sub.image || "noimage.png"}`}
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

                        {/* Sub-parent exists */}
                        {Object.keys(grouped)
                            .filter((key) => key !== "no_parent")
                            .map((parentKey) => (
                                <div key={parentKey} className="col-12 mb-4">
                                    <h3 className="mb-4 text-center font-weight-bold text-dark">{parentKey}</h3>
                                    <div className="row">
                                        {grouped[parentKey].map((sub) => (
                                            <div key={sub.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
                                                <Link
                                                    to={`/subcategory/${slugify(sub.name)}`}
                                                    state={{ id: sub.id, name: sub.name }}
                                                    className="productBox catBox"
                                                >
                                                    <div className="productImage img-hover-zoom">
                                                        <img
                                                            className="imgResponsive"
                                                            src={`${CATEGORY_IMG_BASE_URL}/${sub.image || "noimage.png"}`}
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
