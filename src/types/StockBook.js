import Book from "@/types//Book";

export default class StockBook extends Book {
  quantity = 0;

  static fromJson(json) {
    const b = new StockBook();
    const s = super.fromJson(json).toJson();
    for (const key in s) {
      b[key] = s[key];
    }
    b.quantity = json.quantity ?? 0;
    return b;
  }

  static fromBook(book, quantity = 0) {
    const b = new StockBook();
    const s = book.toJson();
    for (const key in s) {
      b[key] = s[key];
    }
    b.quantity = quantity;
    return b;
  }

  toJson() {
    return {
      ...super.toJson(),
      quantity: this.quantity,
    };
  }

  copy() {
    return StockBook.fromJson(this.toJson());
  }
}