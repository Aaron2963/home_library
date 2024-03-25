import { toDate, toTimestamp } from "@/utils/date-function";
import CatalogController from "@/controllers/CatalogController";
import StockBook from "./StockBook";

export default class Shelf {
  id = "";
  name = "";
  createdAt = 0;
  modifiedAt = 0;
  books = {};

  static fromJson(json) {
    const shelf = new Shelf();
    shelf.id = json.id ?? "";
    shelf.name = json.name ?? "未命名";
    shelf.createdAt = json.createdAt ?? 0;
    shelf.modifiedAt = json.modifiedAt ?? 0;
    shelf.books = json.books ?? {};
    return shelf;
  }

  get createDate() {
    return toDate(this.createdAt);
  }

  get modifyDate() {
    return toDate(this.modifiedAt);
  }

  set createDate(value) {
    this.createdAt = toTimestamp(value);
  }

  set modifyDate(value) {
    this.modifiedAt = toTimestamp(value);
  }

  async getPayload() {
    const books = [];
    for (const id in this.books) {
      const book = await CatalogController.get(id);
      books.push(StockBook.fromBook(book, this.books[id]));
    }
    return books;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      books: this.books,
    };
  }
}
