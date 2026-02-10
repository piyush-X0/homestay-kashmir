import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p>contact@homestaykashmir.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p>+91 923 456 7890</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p>Srinagar, Kashmir - 190001</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26372.027385856!2d74.79!3d34.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzQ4LjAiTiA3NMKwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1635835626789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;