import { PriceAgreement } from "../price-agreement/price-agreement";

export interface SubscriptionDTO {
  id: number;
  name: string;
  status: string | null;
  priceAgreementStatusId: number;
  priceAgreementId: number;
  personId: number | null;
  contractId: number | null;
  lastName: string | null;
  firstName: string |null;
  contractDate: string | null;
  priceAgreements: PriceAgreement[];

}
