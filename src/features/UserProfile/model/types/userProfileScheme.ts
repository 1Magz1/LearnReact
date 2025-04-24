export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  KZT = 'KZT',
}

export interface UserProfile {
  'firstname': string,
  'lastname': string,
  'age': number,
  'currency': Currency,
  'country': string,
  'city': string,
  'username': string,
  'avatar': string,
}

export interface UserProfileScheme {
  data: UserProfile | null
}
