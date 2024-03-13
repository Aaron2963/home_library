import { db, auth } from "@/utils/db.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore/lite";
import Shelf from "@/types/Shelf";

export default class DepositController {
  static async getShelves() {
    const uid = auth.currentUser.uid;
    const col = collection(db, `deposit/${uid}/shelves`);
    const shelves = [];
    const snapshot = await getDocs(col);
    snapshot.forEach((doc) => {
      shelves.push(Shelf.fromJson(doc.data()));
    });
    shelves.sort((a, b) => b.modifiedAt - a.modifiedAt);
    return shelves;
  }

  static async getShelf(id) {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `deposit/${uid}/shelves`, id);
    const shelf = await getDoc(dc);
    if (!shelf.exists()) {
      throw new Error(`No such document: deposit/${uid}/shelves/${id}`);
    }
    return Shelf.fromJson(shelf.data());
  }
}
