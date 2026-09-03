'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Ruler,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Layers,
  Home,
} from 'lucide-react';
import { useCustomer } from '@/lib/customerContext';

interface BriefState {
  roomType: string;
  dimensionLengthFt: string;
  dimensionWidthFt: string;
  styleDirection: string;
  budgetRange: string;
  priorities: string[];
}

const ROOM_OPTIONS = [
  { id: 'living', label: 'Urban Living Room (1/2/3 BHK)', desc: 'Low-profile seating, coffee & side tables, circulation' },
  { id: 'dining', label: 'Dining Space / Suite', desc: 'Solid hardwood tables, spindle seating & credenza' },
  { id: 'bedroom', label: 'Primary Bedroom Sanctuary', desc: 'Platform beds, transitional benches & bedside tables' },
  { id: 'study', label: 'Study & Remote Work Corner', desc: 'Modular open shelving, reading lounge chairs & task light' },
  { id: 'full-apartment', label: 'Complete Apartment Cohesion', desc: 'Harmonized timber finishes across living, dining & rest zones' },
];

const STYLE_OPTIONS = [
  { id: 'mineral-warm', label: 'Warm Mineral & Plaster', desc: 'Lime-wash walls, terrazzo, light oatmeal linens, calm sunlight' },
  { id: 'teak-earth', label: 'Earthy Teak & Terracotta', desc: 'Exposed brick accents, seasoned Indian hardwoods, baked clay tones' },
  { id: 'restrained-minimal', label: 'Restrained Architectural', desc: 'High-contrast charcoal accents, Kota stone, pure functional geometry' },
];

const BUDGET_OPTIONS = [
  { id: 'budget-1', label: '₹75,000 – ₹1,50,000', desc: 'Focus on 1 or 2 key anchor pieces (e.g. modular sofa or dining set)' },
  { id: 'budget-2', label: '₹1,50,000 – ₹3,50,000', desc: 'Complete single room curation with complementary lighting & storage' },
  { id: 'budget-3', label: '₹3,50,000+', desc: 'Multi-room architectural suite with custom configurations' },
];

const PRIORITY_OPTIONS = [
  'Space-conscious circulation for compact apartments',
  'Under-furniture clearance for vacuum & mop access',
  'Solid regional hardwood durability & heirloom joinery',
  'Breathable natural textiles resistant to tropical humidity',
  'Modular reconfigurability for moving between homes',
  'Indirect warm lighting (2700K) ambiance',
];

export function ConsultationForm() {
  const { saveBriefRecord } = useCustomer();
  const [step, setStep] = useState<number>(1);
  const [brief, setBrief] = useState<BriefState>({
    roomType: 'living',
    dimensionLengthFt: '16',
    dimensionWidthFt: '14',
    styleDirection: 'mineral-warm',
    budgetRange: 'budget-2',
    priorities: [
      'Space-conscious circulation for compact apartments',
      'Solid regional hardwood durability & heirloom joinery',
    ],
  });

  const [validationError, setValidationError] = useState<string>('');

  const handleNextStep = () => {
    setValidationError('');

    // Step 2 dimension validation
    if (step === 2) {
      const len = parseFloat(brief.dimensionLengthFt);
      const wid = parseFloat(brief.dimensionWidthFt);
      if (isNaN(len) || len <= 0 || isNaN(wid) || wid <= 0) {
        setValidationError('Please enter realistic, positive room dimensions in feet.');
        return;
      }
      if (len > 100 || wid > 100) {
        setValidationError('Dimensions exceed typical residential apartment scale. Please enter values up to 100 ft.');
        return;
      }
    }

    if (step === 5) {
      saveBriefRecord({
        roomType: brief.roomType,
        dimensionLengthFt: brief.dimensionLengthFt,
        dimensionWidthFt: brief.dimensionWidthFt,
        styleDirection: brief.styleDirection,
        budgetRange: brief.budgetRange,
        priorities: brief.priorities,
      });
    }

    setStep((s) => Math.min(6, s + 1));
  };

  const handlePrevStep = () => {
    setValidationError('');
    setStep((s) => Math.max(1, s - 1));
  };

  const togglePriority = (item: string) => {
    setBrief((prev) => {
      const exists = prev.priorities.includes(item);
      if (exists) {
        return { ...prev, priorities: prev.priorities.filter((p) => p !== item) };
      }
      return { ...prev, priorities: [...prev.priorities, item] };
    });
  };

  const resetForm = () => {
    setStep(1);
    setValidationError('');
    setBrief({
      roomType: 'living',
      dimensionLengthFt: '16',
      dimensionWidthFt: '14',
      styleDirection: 'mineral-warm',
      budgetRange: 'budget-2',
      priorities: [
        'Space-conscious circulation for compact apartments',
        'Solid regional hardwood durability & heirloom joinery',
      ],
    });
  };

  const currentRoom = ROOM_OPTIONS.find((r) => r.id === brief.roomType);
  const currentStyle = STYLE_OPTIONS.find((s) => s.id === brief.styleDirection);
  const currentBudget = BUDGET_OPTIONS.find((b) => b.id === brief.budgetRange);

  return (
    <div className="bg-mineral-100 border border-mineral-300 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-charcoal-muted uppercase tracking-widest mb-2 font-medium">
          <span>Step {step} of 5</span>
          <span>{step === 6 ? 'Brief Preview Complete' : 'Consultation Wizard'}</span>
        </div>
        <div className="h-1.5 w-full bg-mineral-200 overflow-hidden">
          <div
            className="h-full bg-charcoal transition-all duration-300 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Notice */}
      {validationError && (
        <div className="mb-6 p-3.5 bg-terracotta-light/10 border border-terracotta-light text-terracotta-dark text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Step 1: Room Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-subtle font-semibold block mb-1">
              Space Planning
            </span>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              Which room are you furnishing?
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Every Niyata piece is proportioned for the architectural scale of urban Indian homes.
            </p>
          </div>

          <div className="space-y-2.5">
            {ROOM_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBrief({ ...brief, roomType: opt.id })}
                className={`w-full p-4 text-left border transition-all text-xs flex items-start justify-between ${
                  brief.roomType === opt.id
                    ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                    : 'border-mineral-300 bg-mineral-50/60 hover:bg-mineral-50'
                }`}
              >
                <div>
                  <span className="font-semibold text-charcoal text-sm block">{opt.label}</span>
                  <span className="text-charcoal-muted text-xs block mt-0.5">{opt.desc}</span>
                </div>
                {brief.roomType === opt.id && (
                  <CheckCircle2 className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Dimensions */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-subtle font-semibold block mb-1">
              Floor Plan Proportions
            </span>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              What are the approximate dimensions?
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Used to calculate walking paths, door clearances, and appropriate furniture footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-mineral-50 border border-mineral-300 space-y-2">
              <label htmlFor="dim-len" className="text-xs font-semibold text-charcoal block">
                Room Length (Feet)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="dim-len"
                  type="number"
                  min="4"
                  max="100"
                  step="0.5"
                  value={brief.dimensionLengthFt}
                  onChange={(e) => setBrief({ ...brief, dimensionLengthFt: e.target.value })}
                  className="w-full bg-mineral-100 border border-mineral-300 p-2.5 text-sm font-medium text-charcoal focus:outline-none focus:border-charcoal"
                />
                <span className="text-xs text-charcoal-subtle">ft</span>
              </div>
            </div>

            <div className="p-4 bg-mineral-50 border border-mineral-300 space-y-2">
              <label htmlFor="dim-wid" className="text-xs font-semibold text-charcoal block">
                Room Width (Feet)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="dim-wid"
                  type="number"
                  min="4"
                  max="100"
                  step="0.5"
                  value={brief.dimensionWidthFt}
                  onChange={(e) => setBrief({ ...brief, dimensionWidthFt: e.target.value })}
                  className="w-full bg-mineral-100 border border-mineral-300 p-2.5 text-sm font-medium text-charcoal focus:outline-none focus:border-charcoal"
                />
                <span className="text-xs text-charcoal-subtle">ft</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-mineral-200/60 border border-mineral-300 text-xs text-charcoal-muted space-y-1">
            <div className="flex justify-between">
              <span>Approximate Area:</span>
              <strong className="text-charcoal font-mono">
                {parseFloat(brief.dimensionLengthFt || '0') * parseFloat(brief.dimensionWidthFt || '0')}{' '}
                sq ft
              </strong>
            </div>
            <p className="text-[11px] text-charcoal-subtle">
              We recommend maintaining at least 32 inches of primary circulation space in living zones.
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Style Direction */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-subtle font-semibold block mb-1">
              Material Atmosphere
            </span>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              Choose your aesthetic direction
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Select the material resonance that best complements your home architecture.
            </p>
          </div>

          <div className="space-y-2.5">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBrief({ ...brief, styleDirection: opt.id })}
                className={`w-full p-4 text-left border transition-all text-xs flex items-start justify-between ${
                  brief.styleDirection === opt.id
                    ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                    : 'border-mineral-300 bg-mineral-50/60 hover:bg-mineral-50'
                }`}
              >
                <div>
                  <span className="font-semibold text-charcoal text-sm block">{opt.label}</span>
                  <span className="text-charcoal-muted text-xs block mt-0.5">{opt.desc}</span>
                </div>
                {brief.styleDirection === opt.id && (
                  <CheckCircle2 className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Budget Range */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-subtle font-semibold block mb-1">
              Investment Scale
            </span>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              Select your intended investment range
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Illustrative allocation to assist in prioritizing pieces and custom configurations.
            </p>
          </div>

          <div className="space-y-2.5">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBrief({ ...brief, budgetRange: opt.id })}
                className={`w-full p-4 text-left border transition-all text-xs flex items-start justify-between ${
                  brief.budgetRange === opt.id
                    ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                    : 'border-mineral-300 bg-mineral-50/60 hover:bg-mineral-50'
                }`}
              >
                <div>
                  <span className="font-semibold text-charcoal text-sm block">{opt.label}</span>
                  <span className="text-charcoal-muted text-xs block mt-0.5">{opt.desc}</span>
                </div>
                {brief.budgetRange === opt.id && (
                  <CheckCircle2 className="w-5 h-5 text-charcoal flex-shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Priorities */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-subtle font-semibold block mb-1">
              Design Priorities
            </span>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              What matters most for your home?
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
              Select all functional aspects that apply to your lifestyle and space constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRIORITY_OPTIONS.map((p) => {
              const selected = brief.priorities.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePriority(p)}
                  className={`p-3.5 text-left border text-xs transition-all flex items-start justify-between ${
                    selected
                      ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                      : 'border-mineral-300 bg-mineral-50/60 hover:bg-mineral-50 text-charcoal-muted'
                  }`}
                >
                  <span className={selected ? 'font-semibold text-charcoal' : ''}>{p}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-charcoal flex-shrink-0 ml-2 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 6: Completed Brief Preview */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-mineral-200 text-charcoal rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-charcoal">
              Design Consultation Brief Compiled
            </h2>
            <p className="text-xs text-charcoal-muted mt-1 max-w-md mx-auto leading-relaxed">
              Your customized interior space-planning brief has been generated for review.
            </p>
          </div>

          {/* Mandatory Safety Disclosure Box */}
          <div className="p-4 bg-mineral-200 border border-mineral-300 text-xs text-charcoal-muted space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-charcoal">
              <ShieldAlert className="w-4 h-4 text-mineral-600 flex-shrink-0" />
              <span>Design-Service Preview Notice</span>
            </div>
            <p className="leading-relaxed">
              Design-service preview — no consultation request is transmitted or stored. This demonstrates how a bespoke interior consultation inquiry works within the Niyata reference architecture without capturing user data.
            </p>
          </div>

          {/* Compiled Brief Summary Table */}
          <div className="bg-mineral-50 border border-mineral-200 p-6 space-y-4 text-xs">
            <h3 className="font-serif text-base font-medium text-charcoal pb-2 border-b border-mineral-200">
              Consultation Space Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-charcoal-subtle uppercase text-[10px] block">Selected Room:</span>
                <span className="font-medium text-charcoal text-sm">{currentRoom?.label}</span>
              </div>

              <div>
                <span className="text-charcoal-subtle uppercase text-[10px] block">Room Dimensions:</span>
                <span className="font-medium text-charcoal text-sm">
                  {brief.dimensionLengthFt} × {brief.dimensionWidthFt} ft (
                  {parseFloat(brief.dimensionLengthFt || '0') * parseFloat(brief.dimensionWidthFt || '0')} sq ft)
                </span>
              </div>

              <div>
                <span className="text-charcoal-subtle uppercase text-[10px] block">Aesthetic Direction:</span>
                <span className="font-medium text-charcoal text-sm">{currentStyle?.label}</span>
              </div>

              <div>
                <span className="text-charcoal-subtle uppercase text-[10px] block">Budget Allocation:</span>
                <span className="font-medium text-charcoal text-sm">{currentBudget?.label}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-mineral-200">
              <span className="text-charcoal-subtle uppercase text-[10px] block mb-1">
                Specified Priorities ({brief.priorities.length}):
              </span>
              <ul className="space-y-1 list-disc list-inside text-charcoal-muted">
                {brief.priorities.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={resetForm}
              className="py-3 px-6 border border-mineral-300 text-charcoal text-xs font-medium uppercase tracking-wider hover:bg-mineral-200 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Brief</span>
            </button>
            <Link
              href="/rooms"
              className="flex-1 py-3 px-6 bg-charcoal text-mineral-50 text-xs font-medium uppercase tracking-wider hover:bg-charcoal-light flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore Matching Urban Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Steps 1 to 5) */}
      {step < 6 && (
        <div className="flex items-center justify-between pt-8 border-t border-mineral-200 mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-2 px-5 py-2.5 border border-mineral-300 text-xs font-medium text-charcoal uppercase tracking-wider hover:bg-mineral-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-3 bg-charcoal text-mineral-50 text-xs font-medium uppercase tracking-wider hover:bg-charcoal-light transition-colors"
          >
            <span>{step === 5 ? 'Review Brief' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
