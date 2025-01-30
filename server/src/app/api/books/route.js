import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Book from "@/models/Book";
import { authGuard } from "@/app/middleware/auth";

function addCorsHeaders(res) {
  res.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS"); // Allow only POST and OPTIONS methods
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  ); // Allow specific headers
  return res;
}

async function getBooksHandler(req) {
  try {
    await connectToDatabase();
    const books = await Book.find({});
    const response = NextResponse.json(books, { status: 200 });
    return addCorsHeaders(response); // Add CORS headers
  } catch (error) {
    const response = NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
    return addCorsHeaders(response); // Add CORS headers
  }
}

export const GET = authGuard(getBooksHandler);

async function postBookHandler(req) {
  try {
    console.log("Received request:", req.method);

    const bodyText = await req.text();
    if (!bodyText) {
      const response = NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
      return addCorsHeaders(response); // Add CORS headers
    }

    const data = JSON.parse(bodyText);
    console.log("Parsed data:", data);

    const { title, author, genre, publishedYear } = data;
    if (!title || !author) {
      const response = NextResponse.json(
        { error: "Title and Author are required" },
        { status: 422 }
      );
      return addCorsHeaders(response); // Add CORS headers
    }

    await connectToDatabase();
    const newBook = new Book({ title, author, genre, publishedYear });
    await newBook.save();

    const response = NextResponse.json(newBook, { status: 201 });
    return addCorsHeaders(response); // Add CORS headers
  } catch (error) {
    console.error("Error in POST /api/books:", error);
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
    return addCorsHeaders(response); // Add CORS headers
  }
}

export const POST = authGuard(postBookHandler);
