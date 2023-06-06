import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/base_url";

function HomeTable({ displayData, deleteUser }) {
  var test = [];
  return (
    <>
      <div className="container mt-5">
        <Row>
          <div className="col">
            <Card className="shadow">
              <Table responsive="sm" className="align-items-center">
                <thead>
                  <tr className="table-dark">
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length > 0 ? (
                    displayData.map((user, index) => (
                      <>
                        {" "}
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {user.fname} {user.lname}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>
                            {/* status */}
                            <Dropdown>
                              <Dropdown.Toggle variant={user.status === "Active" ? "success" : "danger"} id="dropdown-status">
                                {user.status}
                              </Dropdown.Toggle>
                            </Dropdown>
                          </td>
                          <td>
                            <img className="rounded-circle" src={`${BASE_URL}/uploads/${user.profile}`} alt="profile" fluid style={{ width: "50px" }} />
                          </td>
                          <td>
                            {/* actions */}
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <i className="fa-solid fa-ellipsis-vertical fa-beat"></i>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <Link style={{ textDecoration: "none" }} to={`/profile/${user._id}`}>
                                    <i className="fa-solid fa-eye text-primary"></i>
                                    <span className="fs-5  ms-1">View</span>
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Link style={{ textDecoration: "none" }} to={`/edit/${user._id}`}>
                                    <i className="fa-solid fa-pen text-success"></i>
                                    <span className="fs-5  ms-1">Edit</span>
                                  </Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteUser(user._id)}>
                                  <i className="fa-solid fa-trash text-danger"></i>
                                  <span className="fs-5  ms-1">Delete</span>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <tr className="text-center">
                      <h2 className="text-center">Nothing to Display</h2>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
}

export default HomeTable;
