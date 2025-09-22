import React, { useState } from "react";
import axios from "axios";

function Contact() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "", // 👈 renamed to match "contact[body]"
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
         const res = await axios.post("http://127.0.0.1:8000/api/contact", formData);
         if (res.data.status) {
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" }); // reset
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
                              <div className="contact-us-main-container-inner">
                                 <div className="contact-us-main-container-inner-block">
                                    <div className="contact-us-main-container-inner-block1-img">
                                       <img src="//cdn.shopify.com/s/files/1/2379/1365/files/email-new_ea48f81c-8051-4293-b48a-b954af610d0b_large.png" alt="Email" />
                                    </div>
                                    <div className="contact-us-main-container-inner-block1-text">
                                       <strong>Email:</strong><br /><br />
                                    </div>
                                 </div>
                                 <div className="contact-us-main-container-inner-block">
                                    <div className="contact-us-main-container-inner-block2-img">
                                       <img src="//cdn.shopify.com/s/files/1/2379/1365/files/phone-new_large.png" alt="Phone" />
                                    </div>
                                    <div className="contact-us-main-container-inner-block2-text">
                                       <strong>Phone:</strong><br /><br />
                                    </div>
                                 </div>
                                 <div className="contact-us-main-container-inner-block">
                                    <div className="contact-us-main-container-inner-block3-img">
                                       <img src="//cdn.shopify.com/s/files/1/2379/1365/files/fax-new3_large.png" alt="Fax" />
                                    </div>
                                    <div className="contact-us-main-container-inner-block3-text">
                                       <strong>Fax:</strong><br /><br />
                                    </div>
                                 </div>
                                 <div className="contact-us-main-container-inner-block">
                                    <div className="contact-us-main-container-inner-block4-img">
                                       <img src="//cdn.shopify.com/s/files/1/2379/1365/files/home-new_large.png" alt="Location" />
                                    </div>
                                    <div className="contact-us-main-container-inner-block4-text">
                                       <strong>Location:</strong>
                                    </div>
                                 </div>
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
                                    <label htmlFor="ContactFormName" className="label-hidden">Name</label>
                                    <input
                                       type="text"
                                       id="ContactFormName"
                                       name="contact[name]"
                                       placeholder="Name"
                                       value={formData.name}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div className="col-md-6">
                                    <label htmlFor="ContactFormEmail" className="label-hidden">Email</label>
                                    <input
                                       type="email"
                                       id="ContactFormEmail"
                                       name="contact[email]"
                                       placeholder="Email"
                                       value={formData.email}
                                       onChange={handleChange}
                                       required
                                    />
                                 </div>
                                 <div className="col-md-12">
                                    <label htmlFor="ContactFormPhone" className="label-hidden">Phone Number</label>
                                    <input
                                       type="tel"
                                       id="ContactFormPhone"
                                       name="contact[phone]"
                                       placeholder="Phone Number"
                                       pattern="[0-9\-]*"
                                       value={formData.phone}
                                       onChange={handleChange}
                                    />
                                 </div>
                                 <div className="col-md-12">
                                    <label htmlFor="ContactFormMessage" className="label-hidden">Message</label>
                                    <textarea
                                       rows="10"
                                       id="ContactFormMessage"
                                       name="contact[message]"
                                       placeholder="Message"
                                       value={formData.body}   // 👈 fixed
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
