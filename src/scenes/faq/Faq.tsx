import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const Faq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box gap={2} m="1rem" display="flex" flexDirection="column" alignItems="center">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Accordion
      defaultExpanded
        sx={{
          maxWidth: "800px",
          color: theme.palette.mode === "dark" ? "black" : "white",
          bgcolor: colors.blueAccent[100],
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              color={theme.palette.mode === "dark" ? "primary" : "secondary"}
            />
          }
        >
          <Typography>An Important Question</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            vero possimus aperiam ducimus atque, tempore molestiae quibusdam
            sint tempora, voluptate voluptas soluta quae minima rerum
            perspiciatis ex. Aspernatur quisquam omnis, nam molestias quasi
            neque reprehenderit esse nisi similique magnam recusandae nostrum ex
            cum minus praesentium dolor labore inventore, sed eum!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          maxWidth: "800px",
          color: theme.palette.mode === "dark" ? "black" : "white",
          bgcolor: colors.blueAccent[100],
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              color={theme.palette.mode === "dark" ? "primary" : "secondary"}
            />
          }
        >
          <Typography>An Important Question</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            vero possimus aperiam ducimus atque, tempore molestiae quibusdam
            sint tempora, voluptate voluptas soluta quae minima rerum
            perspiciatis ex. Aspernatur quisquam omnis, nam molestias quasi
            neque reprehenderit esse nisi similique magnam recusandae nostrum ex
            cum minus praesentium dolor labore inventore, sed eum!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Faq;
