import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";

export const admin = initializeApp({
  credential: cert(path.join(__dirname, "../../serviceAccountKey.json")),
  databaseURL: process.env.DBURL,
});

export const db = getFirestore();
