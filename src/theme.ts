import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
