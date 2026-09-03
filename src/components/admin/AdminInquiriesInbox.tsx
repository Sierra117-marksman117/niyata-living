'use client';

import React, { useState } from 'react';
import { useCustomer } from '@/lib/customerContext';
import { Mail, Compass, Clock, CheckCircle2, FileText, User } from 'lucide-react';

export function AdminInquiriesInbox() {
  const { state } = useCustomer();

  // Mock standard demo inquiries if customer hasn't submitted yet
  const defaultLeads = [
    {
      id: 'lead-101',
      clientCity: 'Bandra West, Mumbai',
      room: 'Living Room',
      dimensions: '14 × 18 ft (2 BHK)',
      style: 'Warm Mineral & Plaster',
      budget: '₹1,50,000 – ₹3,50,000',
      priorities: ['Space-conscious circulation', 'Solid teakwood durability'],
      date: 'Today, 2:15 PM',
      status: 'New Brief',
    },
    {
      id: 'lead-102',
      clientCity: 'Indiranagar, Bengaluru',
      room: 'Primary Bedroom',
      dimensions: '14 × 16 ft (3 BHK)',
      style: 'Restrained Architectural',
      budget: '₹75,000 – ₹1,50,000',
      priorities: ['Platform low profile', 'Indirect 2700K lighting'],
      date: 'Yesterday',
      status: 'Reviewed',
    },
    {
      id: 'lead-103',
      clientCity: 'Bodakdev, Ahmedabad',
      room: 'Courtyard Dining Suite',
      dimensions: '16 × 16 ft Villa',
      style: 'Earthy Teak & Terracotta',
      budget: '₹3,50,000+',
      priorities: ['Solid 6-seater trestle table', 'Heirloom mortise joinery'],
      date: '2 days ago',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-mineral-200">
        <h3 className="font-serif text-lg font-medium text-charcoal flex items-center gap-2">
          <Mail className="w-4 h-4 text-mineral-600" />
          <span>Consultation Leads & Inquiries Inbox</span>
        </h3>
        <span className="text-xs text-charcoal-muted">
          {defaultLeads.length + state.savedBriefs.length} Total Leads
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Real briefs submitted by current session */}
        {state.savedBriefs.map((brief) => (
          <div
            key={brief.id}
            className="p-5 bg-mineral-50 border-2 border-accent-cobalt/40 space-y-3 relative"
          >
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-accent-cobalt text-mineral-50">
              Live Session
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-charcoal-subtle font-mono">
                {brief.createdAt}
              </span>
              <h4 className="font-serif text-base font-semibold text-charcoal capitalize mt-0.5">
                {brief.roomType} Room Brief
              </h4>
            </div>

            <div className="text-xs text-charcoal-muted space-y-1">
              <p>
                <strong>Footprint:</strong> {brief.dimensionLengthFt} × {brief.dimensionWidthFt} ft
              </p>
              <p>
                <strong>Style:</strong> {brief.styleDirection}
              </p>
              <p>
                <strong>Budget:</strong> {brief.budgetRange}
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-charcoal-subtle uppercase block mb-1">
                  Priorities:
                </span>
                <p className="text-[11px] line-clamp-2">{brief.priorities.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Demo Leads */}
        {defaultLeads.map((lead) => (
          <div key={lead.id} className="p-5 bg-mineral-100 border border-mineral-300 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-charcoal-subtle font-mono">{lead.date}</span>
                <h4 className="font-serif text-base font-semibold text-charcoal mt-0.5">
                  {lead.room}
                </h4>
                <p className="text-xs text-charcoal-muted">{lead.clientCity}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-mineral-200 text-charcoal font-medium uppercase">
                {lead.status}
              </span>
            </div>

            <div className="text-xs text-charcoal-muted space-y-1 pt-2 border-t border-mineral-200">
              <p>
                <strong>Footprint:</strong> {lead.dimensions}
              </p>
              <p>
                <strong>Style:</strong> {lead.style}
              </p>
              <p>
                <strong>Budget:</strong> {lead.budget}
              </p>
              <div className="pt-1">
                <span className="text-[10px] text-charcoal-subtle uppercase block">Priorities:</span>
                <p className="text-[11px]">{lead.priorities.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
