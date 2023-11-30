import "./Register.css";
import React, { useState } from "react";
import AxiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: theme.spacing(4),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
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
  transparentInput: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  cameraButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  cameraIcon: {
    marginRight: theme.spacing(1),
    width: "30%",
  },
  registerButton: {
    width: "70%",
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    name: "",
    designation: "",
    organisation: "",
    email: "",
    about: "",
    areas_of_interest: "",
  });

  const [postData, updateFormData] = useState(initialFormData);
  const [postPicture, setPostPicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setPostPicture({
        picture: e.target.files,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("name", postData.name);
      formData.append("designation", postData.designation);
      formData.append("organisation", postData.organisation);
      formData.append("email", postData.email);
      formData.append("about", postData.about);
      formData.append("areas_of_interest", postData.areas_of_interest);
      formData.append("picture", postPicture.picture[0]);

      const response = await AxiosInstance.post("profiles/", formData);

      if (response.status === 201) {
        navigate("/");
      } else {
        setError("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setError("Error submitting data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* Avatar or Image Preview */}
        {imagePreview ? (
          <Avatar alt="Preview" src={imagePreview} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar}>A</Avatar>
        )}
        <Typography component="h1" variant="h5">
          Create New Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="designation"
                label="Designation"
                name="designation"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="organisation"
                label="Organisation"
                name="organisation"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="about"
                label="About"
                name="about"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.transparentInput}
                variant="outlined"
                required
                fullWidth
                id="areas_of_interest"
                label="Areas of Interest"
                name="areas_of_interest"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <div className={classes.cameraButton}>
            <Grid item xs={12} sm={4} className={classes.cameraIcon}>
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
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.registerButton}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register"}
              </Button>
            </Grid>
          </div>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
}
