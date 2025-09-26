import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // ✅ import dynamic API base URL

function Contact() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
   });

   const [loading, setLoading] = useState(false);
   const [status, setStatus] = useState("");

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name.replace("contact[", "").replace("]", "")]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("");
      setLoading(true);

      try {
         const res = await axios.post(`${API_BASE_URL}/api/contact`, formData); // ✅ dynamic API
         if (res.data.status) {
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
         }
      } catch (err) {
         if (err.response && err.response.data.errors) {
            const errors = Object.values(err.response.data.errors).flat().join(" ");
            setStatus(errors);
         } else {
            setStatus("Something went wrong.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <main>
         {/* Banner */}
         <section className="innerBanner">
            <div className="container">
               <h1>Contact Us</h1>
            </div>
         </section>

         <section className="contentContainer contentPages">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">

                     {/* Contact info icons */}
                     <div className="content-block">
                        <div className="rte">
                           <div className="contact-us-main-container">
                              {/* Email */}
                              <div className="contact-us-main-container-inner-block">
                                 <img src="//cdn.shopify.com/s/files/1/2379/1365/files/email-new_ea48f81c-8051-4293-b48a-b954af610d0b_large.png" alt="Email" />
                                 <strong>Email:</strong>
                              </div>
                              {/* Phone */}
                              <div className="contact-us-main-container-inner-block">
                                 <img src="//cdn.shopify.com/s/files/1/2379/1365/files/phone-new_large.png" alt="Phone" />
                                 <strong>Phone:</strong>
                              </div>
                              {/* Fax */}
                              <div className="contact-us-main-container-inner-block">
                                 <img src="//cdn.shopify.com/s/files/1/2379/1365/files/fax-new3_large.png" alt="Fax" />
                                 <strong>Fax:</strong>
                              </div>
                              {/* Location */}
                              <div className="contact-us-main-container-inner-block">
                                 <img src="//cdn.shopify.com/s/files/1/2379/1365/files/home-new_large.png" alt="Location" />
                                 <strong>Location:</strong>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Contact Form */}
                     <div className="content-block">
                        <div className="contact-form form-vertical">
                           <form onSubmit={handleSubmit} className="contact-form">
                              <div className="row">
                                 <div className="col-md-6">
                                    <input
                                       type="text"
                                       name="contact[name]"
                                       placeholder="Name"
                                       value={formData.name}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div className="col-md-6">
                                    <input
                                       type="email"
                                       name="contact[email]"
                                       placeholder="Email"
                                       value={formData.email}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div className="col-md-12">
                                    <input
                                       type="tel"
                                       name="contact[phone]"
                                       placeholder="Phone Number"
                                       pattern="[0-9\-]*"
                                       value={formData.phone}
                                       onChange={handleChange}
                                    />
                                 </div>
                                 <div className="col-md-12">
                                    <textarea
                                       rows="10"
                                       name="contact[message]"
                                       placeholder="Message"
                                       value={formData.message} // ✅ corrected from body
                                       onChange={handleChange}
                                       required
                                    ></textarea>
                                 </div>
                                 <div className="col-md-12">
                                    <input
                                       type="submit"
                                       className="custom-btn1 custom-btn2"
                                       value={loading ? "Sending..." : "Send"}
                                       disabled={loading}
                                    />
                                 </div>
                              </div>
                              {status && <p style={{ marginTop: "10px" }}>{status}</p>}
                           </form>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}

export default Contact;
