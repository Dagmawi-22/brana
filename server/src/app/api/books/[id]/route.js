import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Book from "@/models/Book";

// GET a single book by ID
export async function GET(_, { params }) {
  try {
    await connectToDatabase();
    const book = await Book.findById(params.id);
    if (!book)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

// UPDATE a book
export async function PUT(req, { params }) {
  try {
    const updateData = await req.json();
    await connectToDatabase();
    const updatedBook = await Book.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });
    if (!updatedBook)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// DELETE a book
export async function DELETE(_, { params }) {
  try {
    await connectToDatabase();
    const deletedBook = await Book.findByIdAndDelete(params.id);
    if (!deletedBook)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
