import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { viewProfile } from "../services/allAPIs";
import { BASE_URL } from "../services/base_url";

function Profile() {
  const { id } = useParams();

  // state to hold user details
  const [user, setuser] = useState("");
  // function to get profile data
  const getData = async () => {
    const { data } = await viewProfile(id);
    setuser(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <Card className="shadow col-lg-6 max-auto">
          <Card.Body>
            <Row>
              <div className="col">
                <div className="profile_img d-flex justify-content-center">
                  <img className="rounded-circle border p-1" src={`${BASE_URL}/uploads/${user.profile}`} alt="profile" fluid width={"200px"} />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>
                {user.fname} {user.lname}
              </h3>
              <h5>
                <i className="fa-solid fa-envelope text-primary"></i>:- {user.email}
              </h5>
              <h5>
                <i className="fa-solid fa-mobile text-danger"></i>:- {user.mobile}
              </h5>
              <h5>
                <i className="fa-solid fa-venus-mars text-warning"></i>:- {user.gender}
              </h5>
              <h5>
                <i className="fa-solid fa-location-dot text-info"></i>:- {user.location}
              </h5>
              <h5>
                <i className="fa-solid fa-chart-line text-success"></i>:- {user.status}
              </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Profile;
