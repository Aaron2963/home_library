import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import Book from "@/types/Book";

const firebaseConfig = {
  apiKey: "AIzaSyCIVyCgqXs4jfL3eFf-ihS0BYgxeNWRsrU",
  authDomain: "home-library-2024.firebaseapp.com",
  projectId: "home-library-2024",
  storageBucket: "home-library-2024.appspot.com",
  messagingSenderId: "631504075255",
  appId: "1:631504075255:web:0674edcf396db1bf0556f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const router = useRouter();
onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push("/login");
  } else {
    console.log('userid: ', user.uid);
  }
})

async function getBook(isbn) {
  const d = doc(db, "books", isbn);
  const book = await getDoc(d);
  if (!book.exists) {
    console.log("No such document!");
    return null;
  }
  console.log("Document data:", book.data());
  return Book.fromJson(book.data());
}

export { db, auth, getBook };
