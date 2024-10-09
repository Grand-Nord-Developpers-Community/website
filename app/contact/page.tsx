import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contactez-nous</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Envoyez-nous un message</h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                  <Input id="name" placeholder="Votre nom" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" type="email" placeholder="votre@email.com" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" placeholder="Votre message" className="mt-1" rows={4} />
                </div>
                <Button className="w-full text-white" asChild>
                    <Link href="/contact"> Envoyer</Link>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <MapPin className="h-6 w-6 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-sm text-gray-600">BP 45 Maroua, Cameroun</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Phone className="h-6 w-6 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-sm text-gray-600">+237 691805321</p>
                  <p className="text-sm text-gray-600">+237 672277579</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Mail className="h-6 w-6 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-gray-600">contact@gndc.org</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Notre localisation</h2>
        <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
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
    </div>
  );
};

export default ContactUs;