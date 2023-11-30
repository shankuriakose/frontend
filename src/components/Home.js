import React, { useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

// ... (your existing imports)

const Home = () => {
  const [myData, setMydata] = useState();
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`profiles/`).then((res) => {
      setMydata(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const baseUrl = "http://localhost:8000"; // Replace with your actual base URL

  const columns = useMemo(
    () => [
      {
        accessorKey: "picture", // Updated accessorKey for the profile picture
        header: "Profile Picture",
        size: 100,
        Cell: ({ row }) => (
          <Link to={`/profile/${row.original.id}`}>
            <img
              src={`${baseUrl}${row.original.picture}`} // Prepend base URL to the image URL
              alt={row.original.name}
              style={{ width: "50px", borderRadius: "50%" }}
            />
          </Link>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "designation",
        header: "Designation",
        size: 150,
      },
      {
        accessorKey: "organisation",
        header: "Organisation",
        size: 200,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="secondary"
              component={Link}
              to={`/edit/${row.original.id}`}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              component={Link}
              to={`/delete/${row.original.id}`}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [baseUrl] // Include baseUrl as a dependency
  );

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          rowHeight={0.75} // Set the row height to 75% of the default height
        />
      )}
    </div>
  );
};

export default Home;
