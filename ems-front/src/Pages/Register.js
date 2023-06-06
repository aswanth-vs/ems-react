import React, { useState, useEffect, useContext } from "react";
import { Card, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { empRegister } from "../services/allAPIs";
import { useNavigate } from "react-router-dom";
import { registerContext } from "../Components/ContextShare";

function Register() {
  // error message
  // const [errorMsg, seterrorMsg] = useState("");

  // to get context
  const { registerData, setregisterData } = useContext(registerContext);
  //setting up use navigate hook
  const navigate = useNavigate();

  //dropdown options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //state to hold user input data
  const [userData, setuserData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  //hold state for status
  const [status, setstatus] = useState("Active");

  //to hold image
  const [image, setimage] = useState("");

  //to hold profile picture
  const [preview, setpreview] = useState("");

  //to update userData
  const userDetails = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  //update status
  const updateStatus = (e) => {
    setstatus(e.value);
  };

  //update image
  const updateImage = (e) => {
    setimage(e.target.files[0]);
  };

  //register submission
  const handleSubmit = async (e) => {
    //prevent click event to stop page reload
    e.preventDefault();
    //get user data
    const { fname, lname, email, mobile, gender, location } = userData;
    if (fname == "") {
      toast.error("First Name Required !");
    } else if (lname == "") {
      toast.error("Last Name Required  !");
    } else if (email == "") {
      toast.error("Email Required  !");
    } else if (mobile == "") {
      toast.error("Mobile Number Required !");
    } else if (gender == "") {
      toast.error("Select a Gender !");
    } else if (image == "") {
      toast.error("Upload a Profile Picture !");
    } else if (location == "") {
      toast.error("Location Required !");
    } else {
      //make register api call

      //header config
      const headerConfig = {
        "Content-Type": "multipart/form-data",
      };

      //body-form data
      const data = new FormData();
      data.append("user_profile", image);
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("location", location);
      console.log(data);

      // api call
      const response = await empRegister(data, headerConfig);
      console.log(response);
      if (response.status === 200) {
        //resetting all fields
        setuserData({ ...userData, fname: "", lname: "", email: "", mobile: "", gender: "", location: "" });
        setstatus("");
        setimage("");
        setregisterData(response.data);
        //navigate to home page
        navigate("/");
      } else if (response.status === 401) {
        toast.error("An Error Occurred!");
      } else {
        toast.error(response.response.data);
      }
    }
  };
  useEffect(() => {
    //update profile pic
    if (image) {
      setpreview(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Register Employee Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="text-center mb-3">
            <img className="rounded-circle border p-1" src={preview ? preview : "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"} alt="profile" fluid width={"100px"} />
          </div>
          <Form>
            <Row>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="First Name" name="fname" value={userData.fname} onChange={userDetails}></Form.Control>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Last Name" name="lname" value={userData.lname} onChange={userDetails}></Form.Control>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Email Address" name="email" value={userData.email} onChange={userDetails}></Form.Control>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control required type="text" placeholder="Mobile Number" name="mobile" value={userData.mobile} onChange={userDetails}></Form.Control>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Check type={"radio"} label={"Male"} name={"gender"} value={"Male"} onChange={userDetails}></Form.Check>
                <Form.Check type={"radio"} label={"Female"} name={"gender"} value={"Female"} onChange={userDetails}></Form.Check>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Select Employee Status</Form.Label>
                <Select className="text-dark" options={options} onChange={updateStatus} defaultInputValue={status} />
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Choose Profile Picture</Form.Label>
                <Form.Control required type="file" name="user_profile" onChange={updateImage}></Form.Control>
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label>Employee Location</Form.Label>
                <Form.Control required type="text" placeholder="Location" name="location" value={userData.location} onChange={userDetails}></Form.Control>
              </Form.Group>
              {/* submit */}
              <Button className="btn btn-info mt-3" onClick={handleSubmit}>
                Submit
              </Button>
              <ToastContainer position="top-center" />
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Register;
