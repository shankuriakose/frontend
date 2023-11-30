import React, { useState } from "react";
import AxiosInstance from "./Axios"; // Make sure to import AxiosInstance
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
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  preview: {
    maxWidth: "150px",
    maxHeight: "120px",
    marginTop: "20px",
  },
}));

export default function Create() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    name: "",
    designation: "",
    organisation: "",
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
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Create New Profile
        </Typography>
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
                onChange={handleChange}
              />
            </Grid>
            <input
              accept="image/*"
              className={classes.input}
              id="post-picture"
              onChange={handleChange}
              name="picture"
              type="file"
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
              name="areas_of_interst"
              onChange={handleChange}
            />
          </Grid>
          <label htmlFor="post-picture">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="" className={classes.preview} />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Post"}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
}
