'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCustomer } from '@/lib/customerContext';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/lib/formatters';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import {
  User,
  Heart,
  Home,
  FileText,
  Trash2,
  ShoppingBag,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function AccountPage() {
  const { state, removeWishlistItem, updateSpaceProfile } = useCustomer();
  const { addItem } = useCart();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(state.spaceProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSpaceProfile(profileForm);
    setIsEditingProfile(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-mineral-600" />
            <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
              Customer Space Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mt-1">
            My Apartment & Saved Pieces
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
            Manage your apartment room dimensions, review curated wishlist items, and access compiled design briefs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/collections"
            className="px-5 py-2.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Apartment Space Profile */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-mineral-100 border border-mineral-300 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-mineral-200">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-mineral-600" />
                <h2 className="font-serif text-lg font-medium text-charcoal">
                  Apartment Space Profile
                </h2>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs text-charcoal underline hover:text-charcoal-muted"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {savedSuccess && (
              <div className="p-3 bg-moss/10 border border-moss text-moss text-xs flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Space profile updated locally.</span>
              </div>
            )}

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="apt-type" className="font-semibold text-charcoal block mb-1">
                    Apartment Type
                  </label>
                  <input
                    id="apt-type"
                    type="text"
                    value={profileForm.apartmentType}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, apartmentType: e.target.value })
                    }
                    className="w-full bg-mineral-50 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="apt-city" className="font-semibold text-charcoal block mb-1">
                    City / Location
                  </label>
                  <input
                    id="apt-city"
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full bg-mineral-50 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="apt-len" className="font-semibold text-charcoal block mb-1">
                      Living Length (ft)
                    </label>
                    <input
                      id="apt-len"
                      type="number"
                      value={profileForm.livingRoomLengthFt}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          livingRoomLengthFt: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-mineral-50 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="apt-wid" className="font-semibold text-charcoal block mb-1">
                      Living Width (ft)
                    </label>
                    <input
                      id="apt-wid"
                      type="number"
                      value={profileForm.livingRoomWidthFt}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          livingRoomWidthFt: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-mineral-50 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="apt-notes" className="font-semibold text-charcoal block mb-1">
                    Architectural Notes
                  </label>
                  <textarea
                    id="apt-notes"
                    rows={2}
                    value={profileForm.notes}
                    onChange={(e) => setProfileForm({ ...profileForm, notes: e.target.value })}
                    className="w-full bg-mineral-50 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-charcoal text-mineral-50 hover:bg-charcoal-light uppercase tracking-wider text-xs font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileForm(state.spaceProfile);
                      setIsEditingProfile(false);
                    }}
                    className="px-4 py-2 border border-mineral-300 hover:bg-mineral-200 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs text-charcoal-muted">
                <div className="flex justify-between pb-1.5 border-b border-mineral-200">
                  <span>Layout Configuration:</span>
                  <span className="font-medium text-charcoal">{state.spaceProfile.apartmentType}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-mineral-200">
                  <span>City / Context:</span>
                  <span className="font-medium text-charcoal">{state.spaceProfile.city}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-mineral-200">
                  <span>Living Dimensions:</span>
                  <span className="font-medium text-charcoal">
                    {state.spaceProfile.livingRoomLengthFt} × {state.spaceProfile.livingRoomWidthFt} ft (
                    {state.spaceProfile.livingRoomLengthFt * state.spaceProfile.livingRoomWidthFt} sq ft)
                  </span>
                </div>
                <div>
                  <span className="text-charcoal-subtle block mb-1">Space Notes:</span>
                  <p className="p-3 bg-mineral-50 border border-mineral-200 text-[11px] italic">
                    {state.spaceProfile.notes}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Consultation Briefs Section */}
          <div className="bg-mineral-100 border border-mineral-300 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-mineral-200">
              <FileText className="w-4 h-4 text-mineral-600" />
              <h2 className="font-serif text-lg font-medium text-charcoal">
                Compiled Consultation Briefs ({state.savedBriefs.length})
              </h2>
            </div>

            {state.savedBriefs.length === 0 ? (
              <div className="py-6 text-center text-xs text-charcoal-muted space-y-2">
                <p>No space-planning briefs compiled yet.</p>
                <Link
                  href="/design-service"
                  className="inline-flex items-center gap-1 text-charcoal font-medium underline"
                >
                  <span>Launch Design Service Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {state.savedBriefs.map((brief) => (
                  <div key={brief.id} className="p-4 bg-mineral-50 border border-mineral-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-medium text-charcoal">
                      <span className="capitalize">{brief.roomType} Room</span>
                      <span className="text-[11px] text-charcoal-subtle">{brief.createdAt}</span>
                    </div>
                    <p className="text-charcoal-muted">
                      Dimensions: {brief.dimensionLengthFt} × {brief.dimensionWidthFt} ft
                    </p>
                    <p className="text-[11px] text-charcoal-subtle">
                      Priorities: {brief.priorities.slice(0, 2).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Wishlist Pieces */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-mineral-200">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Saved Pieces ({state.wishlist.length})
              </h2>
            </div>
            {state.wishlist.length > 0 && (
              <span className="text-xs text-charcoal-muted">Curated for your space</span>
            )}
          </div>

          {state.wishlist.length === 0 ? (
            <div className="p-16 text-center bg-mineral-100 border border-mineral-300 space-y-3">
              <Heart className="w-8 h-8 text-mineral-400 mx-auto stroke-[1.5]" />
              <h3 className="font-serif text-lg font-medium text-charcoal">
                Your Moodboard Is Empty
              </h3>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                Save pieces while exploring our catalogue to compare materials, footprints, and finishes.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider"
                >
                  Browse Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.wishlist.map((item) => (
                <div
                  key={item.slug}
                  className="bg-mineral-100 border border-mineral-200 p-4 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-mineral-200 overflow-hidden mb-3">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-medium">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base font-medium text-charcoal">
                          <Link href={`/products/${item.slug}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h4>
                        <p className="text-xs text-charcoal-subtle mt-0.5">{item.material}</p>
                      </div>
                      <button
                        onClick={() => removeWishlistItem(item.slug)}
                        className="p-1 text-charcoal-subtle hover:text-accent-vermilion"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-mineral-200 flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      {formatINR(item.priceINR)}
                    </span>
                    <button
                      onClick={() =>
                        addItem({
                          productSlug: item.slug,
                          productName: item.name,
                          category: item.category,
                          imageSrc: item.imageSrc,
                          unitPriceINR: item.priceINR,
                          quantity: 1,
                          selectedMaterial: item.material,
                        })
                      }
                      className="p-2 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs flex items-center gap-1.5 transition-colors"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium uppercase tracking-wider">Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
