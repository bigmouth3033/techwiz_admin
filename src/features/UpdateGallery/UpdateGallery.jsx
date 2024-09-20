import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Upload, Input, Select, message, InputNumber, Radio } from "antd";
import axiosAdmin from "@/shared/api/axiosAdmin";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function UpdateGallery() {
  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const { Option } = Select;
  const [form] = Form.useForm();
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return Upload.LIST_IGNORE;
    }
    return false; // Prevent automatic upload
  };
  const quillRef = useRef();
  const [content, setContent] = useState("");
  const handleChangeDescription = (content, delta, source, editor) => {
    // Remove <p> tags around <img> elements
    const updatedContent = content.replace(/<p>(<img[^>]+>)<\/p>/g, "$1");
    setContent(updatedContent);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    // Thêm tùy chọn điều chỉnh font size
    [{ size: ["small", false, "large", "huge"] }],
  ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
  ];
  const [fileList, setFileList] = useState([]);
  const handleChangeUpLoadImage = (info) => {
    console.log(info);
    if (info.file.status === "removed") {
      message.info("File removed");
    } else {
      // setImage(...Image, info.file);
      message.success(`${info.file.name} file uploaded successfully.`);
    }

    setFileList(info.fileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const [listroom, setListroom] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosAdmin.get("RoomType");
        console.log(response.data.data);

        setListroom(response.data.data);
      } catch (error) {
      } finally {
      }
    };
    fetchdata();
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosAdmin.get("Gallery/GetById/" + parseInt(id));
        console.log(response.data.data);
        var oldData = response.data.data;
        form.setFieldsValue({
          id: oldData.id,
          roomtype: oldData.room_type_id,
          tone: oldData.color_tone,
          description: oldData.description,
          title: oldData.gallery_name,
        });
      } catch (error) {
      } finally {
      }
    };
    fetchdata();
  }, []);
  const handleCreate = async (value) => {
    const formData = new FormData();
    try {
      formData.append("id", value.id);
      formData.append("gallery_name", value.title.trim());
      formData.append("room_type_id", value.roomtype);
      formData.append("color_tone", value.tone);
      formData.append("description", value.description);
      if (fileList.length > 0) {
        fileList.forEach((element) => {
          formData.append("uploadImages", element.originFileObj);
        });
      }
    } catch (error) {
      message.error("Error :" + error);
      return;
    }
    try {
      const response = await axiosAdmin.put("Gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (window.confirm("Update Success.Back To List")) {
        navigate(`/list_gallery`);
      }
    } catch (error) {
      console.log(error);
      message.error("Create Error: " + error.response ? error.response.data.message : error);
    } finally {
    }
  };
  return (
    <>
      <div
        className="container my-5"
        style={{ height: "auto", width: "70%", marginLeft: "25%", marginTop: "2%" }}
      >
        <h1 className="mb-4">Update Gallery.</h1>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            style={{ height: "auto", width: "35%" }}
            label=" Title."
            name="title"
            rules={[{ required: true, message: "Please input your Title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tone." name="tone">
            <Radio.Group>
              <Radio value="light">Light.</Radio>
              <Radio value="dark">Dark.</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Room Type."
            name="roomtype"
            rules={[{ required: true, message: "Please input Room Type!" }]}
          >
            <Select style={{ width: "35%" }}>
              {listroom?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="box_description"
            label="Description."
            name="description"
            rules={[{ required: true, message: "Please input Description" }]}
          >
            <ReactQuill
              ref={quillRef}
              modules={{
                toolbar: toolbarOptions,
              }}
              formats={formats}
              value={content}
              onChange={handleChangeDescription}
              style={{ width: "100%", background: "white", height: "50vh" }}
              className="description"
            />
          </Form.Item>
          <br />
          <Form.Item label="Image (Max 5 File)." name="UploadImage">
            <Upload
              beforeUpload={beforeUpload}
              accept=".jpg,.jpeg,.png"
              listType="picture-card"
              showUploadList={{ showPreviewIcon: false }}
              onChange={handleChangeUpLoadImage}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Form.Item style={{ height: "auto", width: "35%" }} name="id">
              <Input hidden />
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
