import { test, expect } from '@playwright/test';
import {createDeliveryCalculator} from'./deliverycost.ts'; 

test('Normal Delivery Workload without Fragile', async ({ page }) => {
  const calc = createDeliveryCalculator();
  const result = calc(
  1,                // distance
  "small",          // size
  false,            // fragile
  "normal",         // workload
  [],               // options
  [10, 12]          // slot
);

const result2 = calc(
  10,                // distance
  "large",          // size
  true,            // fragile
  "high",         // workload
  [],               // options
  [8, 17]          // slot
);

expect(result.cost).toBe(400);
expect(result2.cost).toBe(840);
expect(result.totalDeliveries).toBe(1);
expect(result2.totalDeliveries).toBe(2);
})