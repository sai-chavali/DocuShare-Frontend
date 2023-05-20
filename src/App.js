import { Routes, Route, useNavigate } from "react-router-dom";
// Material-UI imports
import Grid from "@mui/material/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";
import { ThemeProvider } from "@mui/system";
import { theme } from "./styles/theme";
import PdfViewer from "./components/PdfViewer";
import { SnackbarProvider } from "notistack";

function App({ pca }) {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <MsalProvider instance={pca}>
          <PageLayout>
            <Grid container justifyContent="center">
              <Pages />
            </Grid>
          </PageLayout>
        </MsalProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/document/:id" element={<PdfViewer />} />
    </Routes>
  );
}

export default App;