import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarCharts from "../../components/BarCharts";

const Bar = () => {
  return (
    <Box m="1.2rem">
      <Header title="Bar Charts" subtitle="Bar Charts Page" />
      <Box height="75vh">
        <BarCharts />
      </Box>
    </Box>
  );
};

export default Bar;
