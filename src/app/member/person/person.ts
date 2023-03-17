import { Address } from "./address"

export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    gender: string,
    dateOfBirth: string,
    insuranceCompany: string,
    mobilePhone: string,
    emailAddress: string,
    identityNumber: string,
    privacyApproval: boolean,
    address: Address,
}
