import type { ComponentType } from 'react';
import { LotDetailsPanel } from './LotDetailsPanel';
import { StreetTourPanel } from './StreetTourPanel';
import { NearbyAmenitiesPanel } from './NearbyAmenitiesPanel';

export { LotDetailsPanel } from './LotDetailsPanel';
export { StreetTourPanel } from './StreetTourPanel';
export { NearbyAmenitiesPanel } from './NearbyAmenitiesPanel';

export const PANEL_REGISTRY: Record<string, { id: string; label: string; component: ComponentType }> = {
  lotDetails: { id: 'lotDetails', label: 'Lot details', component: LotDetailsPanel },
  streetTour: { id: 'streetTour', label: 'Street tour', component: StreetTourPanel },
  amenities: { id: 'amenities', label: 'Nearby amenities', component: NearbyAmenitiesPanel },
};
