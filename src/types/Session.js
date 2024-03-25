import CatalogController from '@/controllers/CatalogController.js';

export default class Session {
  payload = []

  static fromJson(json) {
    const session = new Session();
    session.payload = json.payload ?? [];
    return session;
  }

  toJson() {
    return {
      payload: this.payload,
    };
  }

  async getBooks() {
    const books = []
    for (const isbn of this.payload) {
      const book = await CatalogController.getByISBN(isbn)
      books.push(book)
    }
    return books
  }
}