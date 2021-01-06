import React, { useState } from "react";
import {
  Input as AntdInput,
  Button,
  Modal,
  Form,
  List,
  InputNumber,
} from "antd";
import { FormProps } from "antd/lib/form/Form";
import { BooksProps } from "./App";
import { nanoid } from "nanoid";

type UpComingBooksProps = {
  books: BooksProps[];
  onSubmit: (value: BooksProps) => void;
  onBuy: (id: string) => void;
};

const UpComingBooks = ({ books, onSubmit, onBuy }: UpComingBooksProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>("");
  const [writerValue, setWriterValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string | number | undefined>(
    100
  );
  const [imageValue, setImageValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [form] = Form.useForm();

  const [formLayout, setFormLayout] = useState<FormProps["layout"]>();

  const handleShowModal = (layout: FormProps["layout"]) => {
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
    setPriceValue(value);
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
    onSubmit({
      title: titleValue,
      writer: writerValue,
      price: priceValue,
      image: imageValue,
      reason: reasonValue,
      isBuyed: false,
      id: nanoid(),
    });
    setIsModalVisible(false);
  };

  const { TextArea } = AntdInput;

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
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={books.filter((item) => {
            return item.isBuyed === false;
            // return !item.isBuyed;
          })}
          renderItem={(book) => (
            <List.Item
              key={book.title}
              actions={[book.price]}
              extra={<img width={200} alt="ListImage" src={book.image} />}
            >
              <List.Item.Meta
                title={<a href={book.image}>{book.title}</a>}
                description={book.writer}
                children={book.price}
              />
              {book.reason}
              {
                <Button
                  style={{ marginLeft: 15 }}
                  type="primary"
                  onClick={() => onBuy(book.id)}
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
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
          >
            <Form.Item label="Title">
              <AntdInput
                placeholder="Type The Title Of Your Books"
                allowClear
                onChange={handleFormTitleChange}
                value={titleValue}
              />
            </Form.Item>
            <Form.Item label="Writer">
              <AntdInput
                placeholder="Type The Writer"
                allowClear
                onChange={handleFormWriterChange}
                value={writerValue}
              />
            </Form.Item>
            <Form.Item label="Price">
              <InputNumber
                min={50}
                max={200}
                onChange={handleFormPriceChange}
              />
            </Form.Item>
            <Form.Item label="Image">
              <AntdInput
                placeholder="Input Link Of The Image"
                allowClear
                onChange={handleFormImageChange}
                value={imageValue}
              />
            </Form.Item>
            <Form.Item label="Reason">
              <TextArea
                rows={4}
                allowClear
                onChange={handleFormReasonChange}
                value={reasonValue}
              />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button
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
