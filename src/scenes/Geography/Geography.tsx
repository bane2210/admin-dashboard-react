import { Box } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";

const Geography = () => {
  return (
    <Box m="1.2rem">
      <Header title="Line" subtitle="Line Chart Page" />
      <Box height="75vh" border="1px solid white" borderRadius="4px">
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
