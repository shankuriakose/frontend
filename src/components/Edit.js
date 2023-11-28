import { React, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyTextField from "./forms/MyTextField";
import MySelectField from "./forms/MySelectField";
import MyMultiLineField from "./forms/MyMultilineField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const getParams = useParams();
  const myId = getParams.id;

  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`project/${myId}`).then((res) => {
      console.log(res.data);
      setValue("name", res.data.name);
      setValue("comments", res.data.comments);
      setValue("status", res.data.status);
      setValue("start_date", Dayjs(res.data.start_date));
      setValue("end_date", Dayjs(res.data.end_date));

      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const defaultValues = {
    name: "",
    comments: "",
    status: "",
  };

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues,
  });
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${myId}/`, {
      name: data.name,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then((res) => {
      navigate(`/`);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Create records
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              boxShadow: 3,
              padding: 4,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "40px",
              }}
            >
              <MyTextField
                label="Name"
                name={"name"}
                control={control}
                placeholder="Provide a project name"
                width={"30%"}
              />

              <MyDatePickerField
                label="Start date"
                name="start_date"
                control={control}
                width={"30%"}
              />

              <MyDatePickerField
                label="End date"
                name="end_date"
                control={control}
                width={"30%"}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <MyMultiLineField
                label="Comments"
                name="comments"
                control={control}
                placeholder="Provide project comments"
                width={"30%"}
              />

              <MySelectField
                label="Status"
                name="status"
                control={control}
                width={"30%"}
              />

              <Box sx={{ width: "30%" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;
