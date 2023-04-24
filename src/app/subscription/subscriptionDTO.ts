export interface SubscriptionDTO {
    contract:{
        id: number,
        contractDate: string,
        contractTypeId: number
    },
    productAgreement:{
        id: number,
        contractId: number,
        productDefinitionId: number

    },
    contractPersonInvolvement:{
        id: number,
        personId: number,
        contractId: number,
        roleId: number
    },
    priceAgreement:{
        id:number,
        contractId: number,
        discoutTypeId: number | null,
        approverId: number | null,
        priceAgreementStatusId: number,
        discountAmount: number | null,
        priceBillable: number,
        structuredMessage: string | null,
        paymentDate: string | null,
        comment: string |null
    }
}
