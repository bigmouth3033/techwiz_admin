import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Form, Upload, Input, Select, message, InputNumber, Radio } from "antd";
import { Link } from "react-router-dom";
import axiosAdmin from "@/shared/api/axiosAdmin";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  margin: 1rem;
  padding: 2rem;
  background-color: white;
`;

export default function GalleryList() {
  const [resultvalue, setresultvalue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setstartPage] = useState(1);
  const [data, setData] = useState([]);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = resultvalue.slice(firstIndex, lastIndex);
  const pages = Math.ceil(resultvalue.length / recordsPerPage);

  var numbers = Array.from({ length: Math.min(5, pages) }, (_, i) => startPage + i);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage - 1 < startPage) {
        setstartPage(startPage - 1);
      }
    }
  };
  const NextPage = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 >= startPage + 5) {
        setstartPage(startPage + 1);
      }
    }
  };

  const firstpage = () => {
    setstartPage(1);
    setCurrentPage(1);
  };
  const lastpage = () => {
    setCurrentPage(pages);
    if (pages >= 5) {
      setstartPage(pages - 4);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosAdmin.get("Gallery/GetAll");
        console.log(response.data.data);
        console.log(response.data.data);
        const dataresponse = response.data.data;
        setresultvalue(dataresponse);
        setData(dataresponse);
        form.setFieldsValue({
          Status: "",
          tone: "",
          Name: "",
        });
      } catch (error) {
      } finally {
      }
    };
    fetchdata();
  }, []);
  const [loading, setLoading] = useState(false);
  const ChangeStatus = async (index) => {
    try {
      const response = await axiosAdmin.get("Gallery/ChangeStatus/" + index);
      resultvalue.forEach((e) => {
        if (e.id === index) {
          e.status = !e.status;
        }
      });
      setLoading(!loading);
      message.success("Change Status Success!");
    } catch (error) {
      message.error("Error: ", error);
    } finally {
    }
  };
  const [form] = Form.useForm();
  const handleSearch = async () => {
    const formvalue = form.getFieldsValue();

    var result = data.filter((e) => {
      const searchTerm = formvalue.Name.toLowerCase();
      return (
        e.gallery_name?.toLowerCase().includes(searchTerm) ||
        e.room_type.name?.toLowerCase().includes(searchTerm)
        //  ||
        // e.category.name.toLowerCase().includes(searchTerm) ||
        // (e.subcategory &&
        //   e.subcategory.name.toLowerCase().includes(searchTerm)) ||
        // (e.segment && e.segment.name.toLowerCase().includes(searchTerm))
      );
    });
    if (formvalue.Status !== "") {
      result = result.filter((e) => e.status === formvalue.Status);
    }
    if (formvalue.tone !== "") {
      result = result.filter((e) => e.color_tone === formvalue.tone);
    }

    console.log(result);
    setresultvalue(result);
    setCurrentPage(1);
    setstartPage(1);

    // const response = await axios.get(
    //   APILink() + "Product/Search/" + searchvalue,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // setData(response.data.data);
  };
  return (
    <Container>
      <div className="container" style={{ marginTop: "3%" }}>
        <h2>List Gallery.</h2>
        <div>
          <Form layout="vertical" form={form} onFinish={handleSearch}>
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label="Search." className="Search" name="Name" style={{ width: "50%" }}>
                <Input
                  placeholder="Enter here"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="Status" name="Status">
                <Radio.Group onChange={handleSearch}>
                  <Radio value="">All.</Radio>
                  <Radio value={true}>Online.</Radio>
                  <Radio value={false}>Disable.</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Tone Color" name="tone">
                <Radio.Group onChange={handleSearch}>
                  <Radio value="">All.</Radio>
                  <Radio value="light">Light.</Radio>
                  <Radio value="dark">Dark.</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div>
          <Table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>View</th>
                <th>Room Type</th>
                <th>Tone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((item, index) => (
                <tr key={index} style={{ height: "100%", backgroundColor: "yellow" }}>
                  <td>{item.gallery_name}</td>
                  <td>{item.view_count != null ? item.view_count : 0}</td>
                  <td>{item.room_type.name}</td>
                  <td>{item.color_tone.toUpperCase()}</td>
                  <td>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        height: "100%",
                        gridTemplateRows: "1fr",
                        width: "70%",
                      }}
                    >
                      <Button
                        className={`btn ${item.status === true ? "btn-success" : "btn-danger"} `}
                        onClick={() => ChangeStatus(item.id)}
                      >
                        {item.status === true ? "Online" : "Disable"}
                      </Button>

                      <Button>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/update_gallery?id=${item.id}`}
                        >
                          Update
                        </Link>
                      </Button>
                    </div>
                  </td>
                  {/* <td>
            {item.status !== undefined
              ? item.status === true
                ? "Active"
                : "Disable"
              : item.Status
              ? "Active"
              : "Disable"}
          </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <Link href="#" className="page-link" onClick={firstpage}>
                  First Page.
                </Link>
              </li>
              <li className="page-item">
                <Link href="#" className="page-link" onClick={prePage}>
                  Prev
                </Link>
              </li>
              {numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                  <Link href="#" className="page-link" onClick={() => changeCurrentPage(n)}>
                    {n}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link href="#" className="page-link" onClick={NextPage}>
                  Next
                </Link>
              </li>
              <li className="page-item">
                <Link href="#" className="page-link" onClick={lastpage}>
                  Last Page.
                </Link>
              </li>
              <li className="page-item">
                <p className="page-link">{currentPage + "/" + pages}</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Container>
  );
}
