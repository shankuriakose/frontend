import React, { useState, useEffect } from "react";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    designation: "",
    organisation: "",
    email: "",
    areas_of_interest: "",
    picture: null,
    picturePreview: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AxiosInstance.get(`profiles/${id}/`);
        setProfileData({
          ...response.data,
          picture: response.data.picture,
        });

        if (response.data.picture) {
          const baseUrl = "https://shankuriakose.pythonanywhere.com";
          const imageUrl = `${baseUrl}${response.data.picture}`;
          setProfileData((prevData) => ({
            ...prevData,
            picturePreview: imageUrl,
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data: ", error.message);
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="left">
        <img
          src={profileData.picturePreview || ""}
          alt={profileData.name}
          width="100"
        />
        <h4>{profileData.name}</h4>
        <p>{profileData.email}</p>
        <div className="data" style={{ paddingTop: "50px" }}>
          <h4>About</h4>
          <p>{profileData.about}</p>
        </div>
      </div>
      <div className="right">
        <div className="info">
          <h3>About</h3>
          <div className="info_data">
            <div className="data">
              <h4>Organisation</h4>
              <p>{profileData.organisation}</p>
            </div>
            <div className="data">
              <h4>Designation</h4>
              <p>{profileData.designation}</p>
            </div>
          </div>
        </div>

        <div className="projects">
          <h3>Areas of Interest</h3>
          <div className="projects_data">
            <div className="data">
              <h4>{profileData.areas_of_interest}</h4>
              {/* <p>{profileData.areas_of_interest}</p> */}
            </div>
          </div>
        </div>

        <div className="social_media">
          <ul>
            <li>
              <a href={profileData.facebookLink || "#"}>
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href={profileData.twitterLink || "#"}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href={profileData.instagramLink || "#"}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
