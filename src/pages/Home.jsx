import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Typography from "@mui/material/Typography";
import UploadFile from "../components/UploadFile";
import { UploadedFilesTable } from "../components/UploadedFilesTable";

export function Home() {
  return (
      <>
          <AuthenticatedTemplate>
            <UploadFile/>
            <UploadedFilesTable/>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to see our application.</center>
            </Typography>
          </UnauthenticatedTemplate>
      </>
  );
}