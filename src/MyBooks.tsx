import React, { useState } from "react";
import useFetchBook, { Book } from "./useFetchBook";
import {
  List,
  Card,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  Input,
  Typography,
} from "antd";
// import { BooksProps } from "./App";
import { FormLayout } from "antd/lib/form/Form";

// type MyBooksProps = {
//   books: BooksProps[];
//   onDeleteBook: (id: string) => void;
//   onFinish: (value: BooksProps) => void;
// };

const MyBooks = () => {
  const { books, editBook, deleteBook } = useFetchBook();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isOpenModalVisible, setIsOpenModalVisible] = useState<boolean>(false);

  const [imageValue, setImageValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [writerValue, setWriterValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  const [formLayout, setFormLayout] = useState<FormLayout>("horizontal");

  const handleSearchBook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleShowModal = (layout: FormLayout = "horizontal") => {
    setFormLayout(layout);
    setIsModalVisible(true);
    if (selectedBook) {
      setImageValue(selectedBook.image);
      setTitleValue(selectedBook.title);
      setWriterValue(selectedBook.writer);
      setReasonValue(selectedBook.reason);
      setPriceValue(selectedBook.price);
    }
  };

  const handleOkModal = () => {
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleImageValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageValue(event.target.value);
  };

  const handlePriceValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceValue(event.target.value);
  };

  const handleTitleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitleValue(event.target.value);
  };

  const handleWriterValueChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWriterValue(event.target.value);
  };

  const handleReasonValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReasonValue(event.target.value);
  };

  const handleShowOpenModal = (book: Book | null) => {
    setSelectedBook(book);
    setIsOpenModalVisible(true);
  };

  const handleShowOpenModalOk = () => {
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const handleShowOpenModalCancel = () => {
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const handleFinishEdit = () => {
    const editedBook = {
      title: titleValue,
      image: imageValue,
      isBuyed: true,
      price: priceValue,
      writer: writerValue,
      reason: reasonValue,
      _id: selectedBook?._id ?? "",
    };
    editBook(editedBook);
    setSelectedBook(editedBook);
    setIsModalVisible(false);
  };

  const handleDeleteBook = (_id: string) => {
    deleteBook({
      title: titleValue,
      image: imageValue,
      isBuyed: true,
      price: priceValue,
      writer: writerValue,
      reason: reasonValue,
      _id,
    });
    // onDeleteBook(id);
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const filteredBooks = books?.filter((book: Book) => {
    return (
      book.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) && book.isBuyed
    );
  });

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  const { TextArea } = Input;

  return (
    <div style={{}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ marginRight: 20 }}>My Books</h1>
        <AntdInput
          style={{ width: "50%" }}
          placeholder="Are You Looking For Some Books ?"
          allowClear
          size="large"
          onChange={handleSearchBook}
          value={searchValue}
        />
      </div>
      {filteredBooks?.length === 0 ? (
        <h1>Cannot Find Book</h1>
      ) : (
        <div>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={filteredBooks}
            renderItem={(book: Book) => (
              <List.Item>
                <Card
                  cover={
                    <img style={{ height: 350 }} alt="GRIT" src={book.image} />
                  }
                >
                  {book.title}
                </Card>
                <Button
                  type="primary"
                  onClick={() => handleShowOpenModal(book)}
                >
                  Open
                </Button>
              </List.Item>
            )}
          />
        </div>
      )}
      <Modal
        visible={isOpenModalVisible}
        onOk={handleShowOpenModalOk}
        onCancel={handleShowOpenModalCancel}
      >
        {selectedBook && (
          <>
            <img width={272} alt="logo" src={selectedBook.image} />
            <Typography.Title>{selectedBook.title}</Typography.Title>
            <Typography.Title>{selectedBook.writer}</Typography.Title>
            <Typography.Title>{selectedBook.price}</Typography.Title>
            <Typography.Paragraph>{selectedBook.reason}</Typography.Paragraph>
            <Button
              style={{ marginRight: 15 }}
              type="primary"
              onClick={() => handleShowModal(formLayout)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteBook(selectedBook._id)}
            >
              Delete
            </Button>
          </>
        )}
      </Modal>
      <Modal
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <Form {...formItemLayout} layout={formLayout}>
          <Form.Item label="Title" htmlFor="title">
            <AntdInput
              id="title"
              value={titleValue}
              allowClear
              onChange={handleTitleValueChange}
            />
          </Form.Item>
          <Form.Item label="Price" htmlFor="price">
            <AntdInput
              id="price"
              value={priceValue}
              allowClear
              onChange={handlePriceValueChange}
            />
          </Form.Item>
          <Form.Item label="Writer" htmlFor="writer">
            <AntdInput
              id="writer"
              value={writerValue}
              allowClear
              onChange={handleWriterValueChage}
            />
          </Form.Item>
          <Form.Item label="Image" htmlFor="image">
            <AntdInput
              id="image"
              value={imageValue}
              allowClear
              onChange={handleImageValueChange}
            />
          </Form.Item>
          <Form.Item label="Reason" htmlFor="reason">
            <TextArea
              id="reason"
              value={reasonValue}
              allowClear
              onChange={handleReasonValueChange}
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={handleFinishEdit}>
              Finish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyBooks;
