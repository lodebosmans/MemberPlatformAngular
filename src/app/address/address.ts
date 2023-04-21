export interface Address {
    id: number,
    name: string | null,
    street: string,
    number: string,
    box: string | null,
    postalCode: string,
    city: string,
    country: string,
    addressTypeId: number
}
