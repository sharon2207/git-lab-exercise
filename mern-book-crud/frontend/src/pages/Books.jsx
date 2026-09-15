import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import {
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "../services/api";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // GET BOOKS
    const loadBooks = async () => {
        try {
            setError("");
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    // CREATE / UPDATE
    const handleSave = async (bookData) => {
        try {
            setError("");
            setMessage("");

            if (selectedBook) {
                await updateBook(selectedBook._id, bookData);
                setMessage("Book updated successfully");
                setSelectedBook(null);
            } else {
                await createBook(bookData);
                setMessage("Book added successfully");
            }

            await loadBooks();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBook(id);
            setBooks((prev) => prev.filter((book) => book._id !== id));
            setMessage("Book deleted successfully");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Book Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Add, view, update and delete books stored in MongoDB Atlas
                    </p>
                </div>

                {/* SUCCESS MESSAGE */}
                {message && (
                    <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-5 flex justify-between items-center">
                        <span>{message}</span>
                        <button
                            onClick={() => setMessage("")}
                            className="text-green-700 font-bold hover:text-green-900"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5 flex justify-between items-center">
                        <span>{error}</span>
                        <button
                            onClick={() => setError("")}
                            className="text-red-700 font-bold hover:text-red-900"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* BOOK FORM */}
                <BookForm
                    selectedBook={selectedBook}
                    onSave={handleSave}
                    onCancel={() => setSelectedBook(null)}
                />

                {/* BOOK TABLE */}
                <BookTable
                    books={books}
                    onEdit={(book) => {
                        setSelectedBook(book);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default Books;