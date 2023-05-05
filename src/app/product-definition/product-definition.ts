export interface ProductDefinition {
  id: number;
  name: string;
  description: string;
  numberOfSessions: number;
  maxAmountMembers: number;
  startDate: string;
  endDate: string;
  price: number;
  dayOfWeek: string | null;
  numberOfGroups: number | null;
  parentProductDefinitionId: number | null;
  productDefinitionStatusId: number;
  productDefinitionFormatId: number;
  productDefinitionSportId: number;
  imageUrl: string | null;
  subscriptionOpening: string;
  subscriptionClosing: string;
}
