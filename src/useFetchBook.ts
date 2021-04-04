import { useQuery } from "react-query";

export type Book = {
  _id: string;
  title: string;
  writer: string;
  price: string;
  image: string;
  reason: string;
  isBuyed: boolean;
};

const requestGetBooks = async () => {
  const res = await fetch("http://localhost:3000/book");
  return res.json();
};

export default function useFetchBook() {
  const { data: books } = useQuery<Book[]>("books", requestGetBooks);

  return {
    books,
  };
}
