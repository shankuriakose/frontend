import React, { useState, useEffect } from "react";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "10px",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    width: theme.spacing(9), // Make the Avatar 1.5 times bigger
    height: theme.spacing(9), // Make the Avatar 1.5 times bigger
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
  cameraButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: "translate(40%, 40%)", // Adjust position to intersect at 4 o'clock
  },
  registerButton: {
    width: "100%", // Set the button width to 100%
  },
}));

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    designation: "",
    organisation: "",
    email: "",
    about: "",
    areas_of_interest: "",
    picture: null,
    picturePreview: "",
  });

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
      } catch (error) {
        console.error("Error fetching profile data: ", error.message);
      }
    };

    fetchProfile();
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      const selectedFile = e.target.files[0];

      setProfileData({
        ...profileData,
        picture: selectedFile,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          picturePreview: reader.result,
        }));
      };

      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      } else {
        setProfileData((prevData) => ({
          ...prevData,
          picturePreview: "",
        }));
      }
    } else {
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("designation", profileData.designation);
      formData.append("organisation", profileData.organisation);
      formData.append("email", profileData.email);
      formData.append("about", profileData.about);
      formData.append("areas_of_interest", profileData.areas_of_interest);

      if (profileData.picture) {
        formData.append("picture", profileData.picture);
      }

      const response = await AxiosInstance.put(`profiles/${id}/`, formData);

      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setError("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* Profile Picture */}
        {profileData.picturePreview && (
          <Avatar
            className={classes.avatar}
            src={profileData.picturePreview}
            alt={profileData.name}
            onClick={() => document.getElementById("post-picture").click()}
          />
        )}

        {/* Small Camera Picture Preview */}
        {/* {profileData.picturePreview && (
          <Avatar
            className={classes.smallAvatar}
            src={profileData.picturePreview}
            alt="Camera Preview"
          />
        )} */}

        {/* Input for uploading picture */}
        <input
          accept="image/*"
          className={classes.input}
          id="post-picture"
          onChange={handleChange}
          name="picture"
          type="file"
        />
        <label htmlFor="post-picture">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCameraIcon />
          </IconButton>
        </label>

        {/* Form */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="designation"
                label="Designation"
                name="designation"
                value={profileData.designation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="organisation"
                label="Organisation"
                name="organisation"
                value={profileData.organisation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={profileData.organisation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="about"
                label="About"
                name="about"
                value={profileData.about}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="areas_of_interest"
                label="Areas of Interest"
                name="areas_of_interest"
                value={profileData.areas_of_interest}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Camera Icon and Update Button */}
          <div className={classes.cameraButton}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.registerButton}
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>

          {error && <Typography color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
};

export default Edit;
