"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_jsgqqtb"; // Replace with environment varibales later on deployment
    const templateID = "template_5fsocvq"; // Replace with environment varibales later on deployment
    const publicKey = "ODliIIToK3nyFsqod"; // Replace with environment varibales later on deployment

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(
        (response) => {
          console.log(
            "Email successfully sent!",
            response.status,
            response.text
          );
          toast.success("Nous avons reçu votre message avec succès!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error("Failed to send the email. Error:", error);
          toast.error(
            "Une erreur s'est produite. Veuillez recommencer plutard."
          );
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-secondary">
                Contact Us
              </h1>
              <p className="text-lg">
                Feel free to contact us! Submit your questions here, and we’ll
                get back to you as soon as possible.
              </p>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Send us a message
                  </h2>
                </CardContent>
              </Card>

              <form
                className="absolute w-full p-8 bg-white shadow-lg rounded-lg top-12 left-0 space-y-6"
                onSubmit={sendEmail}
              >
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-gray-800"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-gray-800"
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-gray-800"
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-gray-800"
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary-dark"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Extra spacing for mobile */}
      <div className="h-80 md:hidden"></div>

      {/* Contact details and social media icons */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-4 text-primary" />
                <p>+237 691 805 321</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-4 text-primary" />
                <p>contact@gndc.org</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-4 text-primary" />
                <p>BP 45 Maroua, Cameroun</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary hover:text-primary-dark">
                {/* Social media icons */}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <div className="h-64 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15686.172842329875!2d14.3226566!3d10.5951428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM1JzQ0LjUiTiAxNMKwMTknMjMuNiJF!5e0!3m2!1sen!2scm!4v1696264521879!5m2!1sen!2scm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
