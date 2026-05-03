import {PackageSize} from'./types.ts'; 
import {Workload} from './types.ts';
import {DeliveryOption} from'./types.ts'; 
import {DeliverySlot} from './types.ts';
const MIN_COST = 400;
// Distance cost
const getDistanceCost = (distance: number): number => {
  if (distance > 30) return 300;
  if (distance > 10) return 200;
  if (distance > 2) return 100;
  return 50;
};

// Size cost
const getSizeCost = (size: PackageSize): number =>
  size === "large" ? 200 : 100;

// Fragility
const getFragilityCost = (isFragile: boolean, distance: number): number => {
  if (isFragile && distance > 30) {
    throw new Error("Fragile packages cannot be delivered over 30 km");
  }
  return isFragile ? 300 : 0;
};

// Workload coefficient
const getWorkloadCoefficient = (workload: Workload): number => {
  switch (workload) {
    case "very_high":
      return 1.6;
    case "high":
      return 1.4;
    case "increased":
      return 1.2;
    default:
      return 1;
  }
};

// Options
const getOptionsCost = (options: DeliveryOption[]): number => {
  const prices: Record<DeliveryOption, number> = {
    insurance: 150,
    express: 200,
    weekend: 100,
  };

  return options.reduce((sum, opt) => sum + prices[opt], 0);
};

// Delivery slot
const getSlotCost = (slot: DeliverySlot): number => {
  const [start, end] = slot;

  if (start >= 22 || start < 8) {
    throw new Error("Delivery not allowed at night (22-8)");
  }

  if (start >= 18 && end <= 22) {
    return 120;
  }

  return 0;
};

export const createDeliveryCalculator = () => {
  let count = 0;

  return (
    distance: number,
    size: PackageSize,
    isFragile: boolean,
    workload: Workload,
    options: DeliveryOption[],
    slot: DeliverySlot
  ): { cost: number; totalDeliveries: number } => {
    count++;

    let cost =
      getDistanceCost(distance) +
      getSizeCost(size) +
      getFragilityCost(isFragile, distance) +
      getOptionsCost(options) +
      getSlotCost(slot);

    cost *= getWorkloadCoefficient(workload);

    if (cost < MIN_COST) cost = MIN_COST;

    return {
      cost,
      totalDeliveries: count,
    };
  };
};
