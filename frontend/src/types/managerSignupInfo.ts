import { Residents } from "./residentInfo"

export type ManagerSignupInfo = {
    buldingName: string,
    numberUnits: number,
    residents: Array<Residents>,
    rent: number
  }