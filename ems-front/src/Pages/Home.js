import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HomeTable from "../Components/HomeTable";
import { useNavigate } from "react-router-dom";
import { deleteContext, registerContext } from "../Components/ContextShare";
import { Alert } from "react-bootstrap";
import { getusers, removeUser } from "../services/allAPIs";

function Home() {
  // delete context
  const { deleteData, setdeleteData } = useContext(deleteContext);
  // state to hold search query
  const [searchkey, setsearchkey] = useState("");

  // state to hold all users
  const [allusers, setallusers] = useState([]);

  // function to call getusers api
  const getuserDetails = async () => {
    const api_response = await getusers(searchkey);
    setallusers(api_response.data);
  };

  // to get register context using useContext
  const { registerData, setregisterData } = useContext(registerContext);

  //can use Link to do it as well
  const navigate = useNavigate();

  //tp redirect to register page
  const addUser = () => {
    // window.location.replace("/register");
    navigate("/register");
  };

  const deleteUser = async (id) => {
    const res = await removeUser(id);
    if (res.status === 200) {
      setdeleteData(res.data);
      getuserDetails();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getuserDetails();
  }, [searchkey]);

  return (
    <>
      {registerData ? (
        <Alert variant="success" dismissible onClose={() => setregisterData("")}>
          {registerData.fname.toUpperCase()} Successfull Registered!
        </Alert>
      ) : (
        ""
      )}
      {deleteData ? (
        <Alert variant="danger" dismissible onClose={() => setdeleteData("")}>
          {deleteData.fname.toUpperCase()} Successfull Deleted!
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-5">
        <div className="first_div">
          {/* search, add button */}
          <div className="search_add d-flex justify-content-between">
            {/* search */}
            <div className="search col-md-4">
              <Form className="d-flex">
                <Form.Control type="text" placeholder="Search Employee Name" required onChange={(e) => setsearchkey(e.target.value)} />
                <Button className="ms-3" variant="success" onClick={getuserDetails}>
                  Search
                </Button>
              </Form>
            </div>
            {/* add btn */}
            <div className="add">
              <button className="btn btn-warning" onClick={addUser}>
                {" "}
                <i className="fa-solid fa-user-plus fa-fade me-1"></i>Add
              </button>
            </div>
          </div>
        </div>
        <div className="second_div">
          {/* table */}
          <HomeTable displayData={allusers} deleteUser={deleteUser} />
        </div>
      </div>
    </>
  );
}

export default Home;
