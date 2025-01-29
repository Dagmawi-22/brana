import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";

// GET all books
export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find({});
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

// POST a new book
export async function POST(req) {
  try {
    console.log("Received request:", req.method);

    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    // Read request body safely
    const bodyText = await req.text(); // Get raw text input
    if (!bodyText) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const data = JSON.parse(bodyText); // Convert text to JSON
    console.log("Parsed data:", data);

    const { title, author, genre, publishedYear } = data;
    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and Author are required" },
        { status: 422 }
      );
    }

    await connectToDatabase();
    const newBook = new Book({ title, author, genre, publishedYear });
    await newBook.save();

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/books:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
