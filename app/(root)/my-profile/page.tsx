import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { borrowRecords, books } from "@/database/schema";
import { eq, and } from "drizzle-orm";

const page = async () => {
  const session = await auth();

  const userId = session?.user?.id;
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      and(
        eq(borrowRecords.userId, userId!),
        eq(borrowRecords.status, "BORROWED")
      )
    );

  const booksOnly = borrowedBooks.map((record) => record.books);

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mt-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={booksOnly} />
    </>
  );
};

export default page;
