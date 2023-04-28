export interface PriceAgreement {
    id : number,
    contractId : number,
    discountTypeId : number | null,
    approverId : number |null,
    priceAgreementStatusId : number,
    discountAmount : number | null,
    priceBillable : number | null,
    structuredMessage : string | null,
    paymentDate : string | null,
    comment : string | null 
}
