import { db } from "@/utils/db.js";
import {
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  collection,
  query,
  limit,
  orderBy,
  startAfter,
  getCountFromServer,
  where,
} from "firebase/firestore";
import Book from "@/types/Book";

export default class CatalogController {
  static async list(last, by = "title", condition = null) {
    const lim = 10,
      coll = collection(db, `books`);
    let q = null,
      cq = null;
    if (condition) {
      let wh = where(by, ">=", condition);
      if (["isbn10", "isbn13"].includes(by)) {
        wh = where(by, "==", condition);
      }
      q = query(coll, wh, orderBy(by), limit(lim), startAfter(last));
      cq = query(coll, wh);
    } else {
      q = query(coll, orderBy(by), limit(lim), startAfter(last));
      cq = query(coll);
    }
    const books = [];
    const countSnapshot = await getCountFromServer(cq);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      books.push(Book.fromJson(doc.data()));
    });
    return {
      total: countSnapshot.data().count,
      data: books,
    };
  }

  static async get(id) {
    const dc = doc(db, `books`, id);
    const book = await getDoc(dc);
    if (!book.exists()) {
      throw new Error(`No such document: books/${id}`);
    }
    return Book.fromJson(book.data());
  }

  static async getByISBN(isbn) {
    if (isbn.length !== 10 && isbn.length !== 13) {
      throw new Error(`Invalid ISBN: ${isbn}`);
    }
    const q = query(
      collection(db, `books`),
      where(`isbn${isbn.length}`, "==", isbn)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error(`No such document: books/${isbn}`);
    }
    const book = querySnapshot.docs[0];
    return Book.fromJson(book.data());
  }

  static async update(id, data) {
    const dc = doc(db, `books`, id);
    await updateDoc(dc, data);
    return true;
  }

  static async create(book) {
    const dc = await addDoc(collection(db, `books`), book.toJson());
    await CatalogController.update(dc.id, { id: dc.id });
    return dc.id;
  }

  static async remove(id) {
    const dc = doc(db, `books`, id);
    await deleteDoc(dc);
    return true;
  }
}
