import React, { useState } from "react";
import useFetchBook, { Book } from "./useFetchBook";
import {
  Input as AntdInput,
  Button,
  Modal,
  Form,
  List,
  InputNumber,
} from "antd";
import { FormLayout } from "antd/lib/form/Form";
// import { BooksProps } from "./App";
// import { nanoid } from "nanoid";

// type UpComingBooksProps = {
//   books: BooksProps[];
//   onSubmit: (value: BooksProps) => void;
//   onBuy: (id: string) => void;
// };

const UpComingBooks = () => {
  const { books } = useFetchBook();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>("");
  const [writerValue, setWriterValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<number>(0);
  const [imageValue, setImageValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [formLayout, setFormLayout] = useState<FormLayout>("horizontal");

  const handleShowModal = (layout: FormLayout = "horizontal") => {
    setFormLayout(layout);
    setIsModalVisible(true);
  };
  const handleCancelModal = () => {
    setIsModalVisible(false);
  };
  const handleOkModal = () => {
    setIsModalVisible(false);
  };
  const handleFormTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitleValue(event.target.value);
  };
  const handleFormWriterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWriterValue(event.target.value);
  };
  const handleFormPriceChange = (value: string | number | undefined) => {
    if (typeof value === "number") setPriceValue(value);
  };
  const handleFormImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageValue(event.target.value);
  };
  const handleFormReasonChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReasonValue(event.target.value);
  };
  const handleSubmitForm = () => {
    // onSubmit({
    //   title: titleValue,
    //   writer: writerValue,
    //   price: priceValue,
    //   image: imageValue,
    //   reason: reasonValue,
    //   isBuyed: false,
    //   id: nanoid(),
    // });
    setIsModalVisible(false);
  };

  const { TextArea } = AntdInput;

  // const [form] = Form.useForm();

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
          wrapperCol: { span: 14, offset: 20 },
        }
      : null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          fontSize: 15,
          color: "black",
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            display: "block",
            marginRight: 15,
          }}
        >
          Would You Like To Buy A Books ?
        </h1>
        <Button
          type="primary"
          onClick={() => {
            handleShowModal(formLayout);
          }}
        >
          Up Coming Books
        </Button>
      </div>
      <div
        style={{
          display: "block",
          marginTop: 30,
          marginBottom: 30,
          width: 800,
        }}
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 3,
          }}
          dataSource={books?.filter((book: Book) => {
            return !book.isBuyed;
            // return item.isBuyed === false
          })}
          renderItem={(book: Book) => (
            <List.Item
              actions={[book.price]}
              extra={<img width={200} alt="ListImage" src={book.image} />}
            >
              <List.Item.Meta
                title={book.title}
                description={book.writer}
                children={book.price}
              />
              {book.reason}
              {
                <Button
                  style={{ marginLeft: 15 }}
                  type="primary"
                  // onClick={() => onBuy(book._id)}
                >
                  Done
                </Button>
              }
            </List.Item>
          )}
        />
      </div>
      <div>
        <Modal
          title="Up Coming Books"
          visible={isModalVisible}
          onOk={handleOkModal}
          onCancel={handleCancelModal}
        >
          <Form layout={formLayout} {...formItemLayout}>
            <Form.Item label="Title" htmlFor="title">
              <AntdInput
                id="title"
                placeholder="Type The Title Of Your Books"
                allowClear
                onChange={handleFormTitleChange}
                value={titleValue}
              />
            </Form.Item>
            <Form.Item label="Writer" htmlFor="writer">
              <AntdInput
                id="writer"
                placeholder="Type The Writer"
                allowClear
                onChange={handleFormWriterChange}
                value={writerValue}
              />
            </Form.Item>
            <Form.Item label="Price" htmlFor="price">
              <InputNumber
                id="price"
                min={0}
                max={200}
                onChange={handleFormPriceChange}
                value={priceValue}
              />
            </Form.Item>
            <Form.Item label="Image" htmlFor="image">
              <AntdInput
                id="image"
                placeholder="Input Link Of The Image"
                allowClear
                onChange={handleFormImageChange}
                value={imageValue}
              />
            </Form.Item>
            <Form.Item label="Reason" htmlFor="reason">
              <TextArea
                id="reason"
                placeholder="Why you decide to buy the book ?"
                rows={4}
                allowClear
                onChange={handleFormReasonChange}
                value={reasonValue}
              />
            </Form.Item>
            <Form.Item>
              <Button
                {...buttonItemLayout}
                type="primary"
                htmlType="submit"
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UpComingBooks;
