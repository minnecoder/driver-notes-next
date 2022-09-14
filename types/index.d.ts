import { ObjectId } from "mongodb";

export interface Stop {
  _id: string;
  signers: string[];
  custName: string;
  address: string;
  suite: string;
  city: string;
  deliveryLocation: string;
  notes: string;
}
