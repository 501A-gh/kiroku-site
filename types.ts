import { Timestamp } from "firebase/firestore";

export interface UserSettings {
  default: {
    daysToWarn: number;
    daysToAlert: number;
    daysToHighlight: number;
    daysTillExpiration: number;
  };
  public: boolean;
}

export interface Item {
  name: string;
  description: string;
  datePurchased: Timestamp;
  expirationDate: Timestamp;
  category: string;
}
