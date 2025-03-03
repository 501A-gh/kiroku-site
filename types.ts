import { Timestamp } from "firebase/firestore";

export interface UserSettings {
  progressBar: number;
  defaultExpir: number;
  isPublic: boolean;
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
