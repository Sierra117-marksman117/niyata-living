'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/config/brand';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { MapPin, Mail, Phone, Clock, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState('space-planning');
  const [preferredRoom, setPreferredRoom] = useState('living');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
          Showrooms & Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
          Showroom Studios & Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl leading-relaxed">
          Explore illustrative showroom locations across Mumbai, Bengaluru, and Ahmedabad or submit a reference consultation inquiry.
        </p>
      </div>

      {/* Showroom Studios Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
            Locations Preview
          </span>
          <h2 className="font-serif text-2xl font-medium text-charcoal mt-1">
            Studio Spaces (Illustrative)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRAND.studios.map((studio) => (
            <div
              key={studio.city}
              className="bg-mineral-100 border border-mineral-200 p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-charcoal-muted">
                  <span className="uppercase tracking-wider font-semibold text-[10px]">
                    {studio.type}
                  </span>
                  <span className="px-2 py-0.5 bg-mineral-200 text-charcoal-muted text-[10px]">
                    Preview Only
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {studio.city} Studio
                </h3>

                <p className="text-xs text-charcoal font-medium">
                  {studio.address}, {studio.neighbourhood}
                </p>

                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {studio.note}
                </p>
              </div>

              <div className="pt-4 border-t border-mineral-200 text-xs text-charcoal-subtle flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{BRAND.contact.enquiryHours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Enquiry Form Preview */}
      <div className="bg-mineral-100 border border-mineral-300 p-6 sm:p-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl font-medium text-charcoal">
              Enquiry & Space Planning Form
            </h2>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Experience the client inquiry flow. This reference form validates inputs client-side without storing or transmitting personal information.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-mineral-50 border border-mineral-300 space-y-4">
              <CheckCircle2 className="w-10 h-10 text-moss mx-auto stroke-[1.5]" />
              <h3 className="font-serif text-xl font-medium text-charcoal">
                Enquiry Preview Completed
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed max-w-md mx-auto">
                No data was transmitted or saved. In a production environment, this would forward your space parameters to the regional design consultant.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Reset Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="enquiry-type" className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-1.5">
                  Enquiry Type
                </label>
                <select
                  id="enquiry-type"
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full bg-mineral-50 border border-mineral-300 p-3 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                >
                  <option value="space-planning">Apartment Space-Planning & Layout</option>
                  <option value="custom-timber">Bespoke Hardwood Dimension Adjustment</option>
                  <option value="fabric-samples">Textile & Swatch Inquiries</option>
                  <option value="commercial">Architectural Trade Collaboration</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferred-room" className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-1.5">
                  Preferred Room Environment
                </label>
                <select
                  id="preferred-room"
                  value={preferredRoom}
                  onChange={(e) => setPreferredRoom(e.target.value)}
                  className="w-full bg-mineral-50 border border-mineral-300 p-3 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                >
                  <option value="living">Living Room (Modular Sofa & Tables)</option>
                  <option value="dining">Dining Suite (Trestle Table & Chairs)</option>
                  <option value="bedroom">Primary Bedroom (Platform Bed & Bench)</option>
                  <option value="study">Study / Library (Open Shelving)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message-box" className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-1.5">
                  Project Notes & Space Dimensions
                </label>
                <textarea
                  id="message-box"
                  rows={4}
                  required
                  placeholder="Share details about your room dimensions (e.g. 14 × 18 ft 2BHK living room), daylight exposure, or specific timber finish preferences..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-mineral-50 border border-mineral-300 p-3 text-xs text-charcoal focus:outline-none focus:border-charcoal leading-relaxed"
                />
              </div>

              <div className="p-3.5 bg-mineral-200/60 border border-mineral-300 text-xs text-charcoal-muted flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-mineral-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Interactive reference preview only. No personal contact details are requested or recorded.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Reference Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
