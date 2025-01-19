"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate();

    const record = await db
      .insert(borrowRecords)
      .values({ userId, bookId, dueDate, status: "BORROWED" })
      .returning(); // Ensures we fetch the inserted record details

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    // Return the cleaned-up record to avoid circular references
    return {
      success: true,
      data: record.map((r) => ({
        id: r.id,
        userId: r.userId,
        bookId: r.bookId,
        dueDate: r.dueDate,
        status: r.status,
      })),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
