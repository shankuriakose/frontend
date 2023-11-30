import { React, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [myData, setMydata] = useState();
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`profiles/${MyId}`).then((res) => {
      setMydata(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = (data) => {
    AxiosInstance.delete(`profiles/${MyId}/`).then((res) => {
      navigate(`/`);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
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
              Delete Profile: {myData.name}
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
                justifyContent: "start",
                marginBottom: "40px",
              }}
            >
              Are you sure that you want to delete this Profile: {myData.name}
            </Box>

            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: "100%" }}
              >
                Delete the profile
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;
