import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface NewNote {
  title: string;
  content: string;
  owner: string;
  shared: boolean;
  collaborators: string[];
}

export async function createNote(note: NewNote) {
  try {
    const notesRef = collection(db, "notes");
    const newNote = {
      ...note,
      lastModified: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(notesRef, newNote);
    return docRef.id;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}
