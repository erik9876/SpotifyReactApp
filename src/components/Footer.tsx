import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PlayingTitle from "./PlayingTitle.tsx";
import Options from "./Options.tsx";

const Footer = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                top: 'auto',
                bottom: 0,
                marginTop: "10px",
                width: "100%",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <PlayingTitle />
                    </Grid>
                    <Grid item>
                        <Options />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
