import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }}>
                    <Link component={RouterLink} to="/" color="inherit" variant="h6">DocuShare</Link>
                </Typography>
                {/* <AuthenticatedTemplate>
                    <Link component={RouterLink} to="/docs" color="inherit" variant="h6">Documents</Link>
                </AuthenticatedTemplate> */}
                <WelcomeName />
                <SignInSignOutButton />
            </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;