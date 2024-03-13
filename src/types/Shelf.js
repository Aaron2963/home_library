import { toDate } from "@/utils/date-function";
import CatalogController from "@/controllers/CatalogController";

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

  async getPayload() {
    const books = [];
    for (const isbn in this.books) {
      const book = await CatalogController.get(isbn);
      books.push({
        ...book.toJson(),
        quantity: this.books[isbn],
      });
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
