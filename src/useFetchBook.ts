import { useQuery, useMutation, useQueryClient } from "react-query";

export type Book = {
  _id: string;
  title: string;
  writer: string;
  price: string;
  image: string;
  reason: string;
  isBuyed: boolean;
};

export type NewBook = Omit<Book, "_id">;

const requestGetBooks = async () => {
  const res = await fetch("http://localhost:3000/book");
  return res.json();
};

const requestAddBooks = async (newBook: NewBook) => {
  const res = await fetch("http://localhost:3000/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });
  const books = await res.json();
  return books;
};

const requestEditBooks = async (editedBook: Book) => {
  const res = await fetch("http://localhost:3000/book/" + editedBook._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedBook),
  });
  const books = await res.json();
  return books;
};

const requestDeleteBook = async (deletedBook: Book) => {
  const res = await fetch("http://localhost:3000/book/" + deletedBook._id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const books = await res.json();
  return books;
};

export default function useFetchBook() {
  const queryClient = useQueryClient();

  const { data: books } = useQuery<Book[]>("books", requestGetBooks);

  const { mutate: addBook } = useMutation<Book, Error, NewBook>(
    requestAddBooks,
    {
      onSuccess: (newBook) => {
        queryClient.setQueryData<Book[]>("books", (currentBook) => [
          ...(currentBook ? currentBook : []),
          newBook,
        ]);
      },
    }
  );

  const { mutate: editBook } = useMutation<Book, Error, Book>(
    requestEditBooks,
    {
      onSuccess: (editedBook) => {
        queryClient.setQueryData<Book[]>("books", (currentBook) => {
          return (
            currentBook?.map((book) =>
              book._id === editedBook._id ? editedBook : book
            ) ?? []
          );
        });
      },
    }
  );

  const { mutate: deleteBook } = useMutation<Book, Error, Book>(
    requestDeleteBook,
    {
      onSuccess: (deletedBook) => {
        queryClient.setQueryData<Book[]>("books", (currentBook) => {
          return (
            currentBook?.filter((book) => {
              return book._id !== deletedBook._id;
            }) ?? []
          );
        });
      },
    }
  );

  return {
    books,
    addBook,
    editBook,
    deleteBook,
  };
}
