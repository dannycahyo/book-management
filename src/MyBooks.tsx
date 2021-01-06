import React, { useState } from "react";
import {
  List,
  Card,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  Input,
} from "antd";
import { BooksProps } from "./App";
import { FormLayout } from "antd/lib/form/Form";

type MyBooksProps = {
  books: BooksProps[];
  onDeleteBook: (id: string) => void;
};

const MyBooks = ({ books, onDeleteBook }: MyBooksProps) => {
  const { Meta } = Card;
  const { TextArea } = Input;

  // const [selectedBook, setSelectedBook] = useState<BooksProps | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [imageValue, setImageValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [writerValue, setWriterValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [formLayout, setFormLayout] = useState<FormLayout>("horizontal");

  const handleShowModal = (layout: FormLayout = "horizontal") => {
    setFormLayout(layout);
    setIsModalVisible(true);
    // setImageValue(selectedBook.image);
    // setTitleValue(selectedBook.title);
    // setWriterValue(selectedBook.writer);
    // setReasonValue(selectedBook.reason);
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

  const handleFinishEdit = () => {};

  const [form] = Form.useForm();

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

  return (
    <div style={{}}>
      <h1 className="site-layout-content">My Books</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={books.filter((book) => {
          return book.isBuyed === true;
          // return book.isBuyed;
        })}
        renderItem={(book) => (
          <List.Item>
            <Card
              style={{ height: 500 }}
              cover={
                <img style={{ height: 350 }} alt="GRIT" src={book.image} />
              }
            >
              {book.writer}
              <Meta title={book.title} description={book.reason} />
            </Card>
            <Button type="primary" danger onClick={() => onDeleteBook(book.id)}>
              Delete
            </Button>
            <Button
              style={{ marginLeft: 15 }}
              type="primary"
              onClick={() => handleShowModal(formLayout)}
            >
              Edit
            </Button>
          </List.Item>
        )}
      />
      <Modal
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
        >
          <Form.Item label="Image">
            <AntdInput value={imageValue} onChange={handleImageValueChange} />
          </Form.Item>
          <Form.Item label="Title">
            <AntdInput value={titleValue} onChange={handleTitleValueChange} />
          </Form.Item>
          <Form.Item label="Writer">
            <AntdInput value={writerValue} onChange={handleWriterValueChage} />
          </Form.Item>
          <Form.Item label="Reason">
            <TextArea value={reasonValue} onChange={handleReasonValueChange} />
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
