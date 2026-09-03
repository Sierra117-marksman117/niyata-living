import React from 'react';
import { X } from 'lucide-react';

interface ActiveFilterPillsProps {
  category?: string;
  room?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilterPills({
  category,
  room,
  material,
  minPrice,
  maxPrice,
  onRemove,
  onClearAll,
}: ActiveFilterPillsProps) {
  const hasFilters = Boolean(category || room || material || minPrice || maxPrice);

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 pb-1" aria-label="Active filters">
      <span className="text-xs text-charcoal-muted uppercase tracking-wider font-medium mr-1">
        Active Filters:
      </span>

      {category && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mineral-200 text-charcoal text-xs border border-mineral-300">
          <span>Category: {category}</span>
          <button
            onClick={() => onRemove('category')}
            className="text-charcoal-muted hover:text-charcoal p-0.5"
            aria-label={`Remove category filter ${category}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {room && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mineral-200 text-charcoal text-xs border border-mineral-300">
          <span>Room: {room}</span>
          <button
            onClick={() => onRemove('room')}
            className="text-charcoal-muted hover:text-charcoal p-0.5"
            aria-label={`Remove room filter ${room}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {material && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mineral-200 text-charcoal text-xs border border-mineral-300">
          <span>Material: {material}</span>
          <button
            onClick={() => onRemove('material')}
            className="text-charcoal-muted hover:text-charcoal p-0.5"
            aria-label={`Remove material filter ${material}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {(minPrice !== undefined || maxPrice !== undefined) && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mineral-200 text-charcoal text-xs border border-mineral-300">
          <span>
            Price: {minPrice ? `₹${minPrice.toLocaleString('en-IN')}` : '₹0'} –{' '}
            {maxPrice ? `₹${maxPrice.toLocaleString('en-IN')}` : 'Any'}
          </span>
          <button
            onClick={() => {
              onRemove('minPrice');
              onRemove('maxPrice');
            }}
            className="text-charcoal-muted hover:text-charcoal p-0.5"
            aria-label="Remove price filter"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        onClick={onClearAll}
        className="text-xs text-charcoal-subtle hover:text-accent-vermilion underline ml-2 py-1"
      >
        Clear all
      </button>
    </div>
  );
}
