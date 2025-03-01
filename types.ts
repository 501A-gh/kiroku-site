import { Timestamp } from "firebase/firestore";

export interface UserSettings {
  default: {
    progressBar: number;
    expirSection: number;
    defaultExpir: number;
  };
  public: boolean;
}

export interface FirestoreItem {
  name: string;
  description: string;
  datePurchased: Timestamp;
  expirationDate: Timestamp;
  category: string;
  finished: boolean;
}

export interface Item
  extends Omit<FirestoreItem, "datePurchased" | "expirationDate"> {
  datePurchased: Date;
  expirationDate: Date;
}
