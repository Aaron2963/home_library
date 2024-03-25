import { db, auth } from "@/utils/db.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
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

  static async updateShelf(id, data) {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `deposit/${uid}/shelves`, id);
    await updateDoc(dc, data);
    return true;
  }

  static async createShelf(name) {
    const uid = auth.currentUser.uid;
    const col = collection(db, `deposit/${uid}/shelves`);
    const shelf = new Shelf();
    shelf.name = name;
    shelf.createdAt = Timestamp.now();
    shelf.modifiedAt = Timestamp.now();
    const dc = await addDoc(col, shelf.toJson());
    shelf.id = dc.id;
    await updateDoc(dc, { id: dc.id });
    return shelf;
  }

  static async deleteShelf(id) {
    const uid = auth.currentUser.uid;
    const dc = doc(db, `deposit/${uid}/shelves`, id);
    await deleteDoc(dc);
    return true;
  }

  static async addBooks(id, stockBooks) {
    const uid = auth.currentUser.uid;
    const sorted = {},
      data = {};
    for (const book of stockBooks) {
      const key = book.id;
      if (!sorted[key]) sorted[key] = 0;
      sorted[key] += book.quantity;
    }
    for (const id in sorted) {
      data[`books.${id}`] = increment(sorted[id]);
    }
    data.modifiedAt = Timestamp.now();
    await updateDoc(doc(db, `deposit/${uid}/shelves`, id), data);
    return true;
  }
}
