import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null); 

  // Fetch books from Firestore
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    setBooks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Function to add or update a book
  const handleSaveBook = async () => {
    if (!title || !author) return;

    if (editingBookId) {
      // Update existing book
      const bookRef = doc(db, "books", editingBookId);
      await updateDoc(bookRef, { title, author });
      setEditingBookId(null);
    } else {
      // Add new book
      await addDoc(collection(db, "books"), { title, author });
    }

    setTitle(""); // Clear input fields
    setAuthor("");
    fetchBooks(); // Refresh book list
  };

  // Function to edit a book
  const handleEditBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditingBookId(book.id);
  };

  // Function to delete a book
  const handleDeleteBook = async (bookId) => {
    await deleteDoc(doc(db, "books", bookId));
    fetchBooks(); // Refresh book list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>John's Book List</Text>

      {/* Input Fields */}
      <Text style={styles.label}>Book Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter book title" />

      <Text style={styles.label}>Author Name</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} placeholder="Enter author name" />

      {/* Add/Update Book Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleSaveBook}>
        <Text style={styles.addButtonText}>{editingBookId ? "Update Book" : "Add Book"}</Text>
      </TouchableOpacity>

      {/* Display Book List */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditBook(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBook(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffdab9" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 ,marginTop: "60"},
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 8, backgroundColor: "#fff" },
  addButton: { marginTop: 20, padding: 15, backgroundColor: "#da70d6", alignItems: "center", borderRadius: 8 ,marginBottom: 
    20
  },
  addButtonText: { color: "white", fontSize: 18 },
  bookItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, marginTop: 10, backgroundColor: "white", borderRadius: 5 },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { fontSize: 16 },
  buttonContainer: { flexDirection: "row" },
  editButton: { backgroundColor: "#6b8e23", padding: 8, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: "#ff4500", padding: 8, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 14 },
});
