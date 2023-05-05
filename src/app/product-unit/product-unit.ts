export interface ProductUnit {
  id: number;
  productId: number;
  date: string;
  comment: string;
  startTimeScheduled: string;
  endTimeScheduled: string;
  startTimeActual: string | null;
  endTimeActual: string | null;
  addressId: number;
  productUnitStatusId: number;
}
