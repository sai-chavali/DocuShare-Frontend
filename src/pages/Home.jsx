import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Typography from "@mui/material/Typography";
import UploadFile from "../components/UploadFile";
import { UploadedFilesTable } from "../components/UploadedFilesTable";
import HttpService from "../utils/HttpService";
import { useEffect, useState } from "react";

export function Home() {
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const { get, loading } = HttpService();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('/private/documentDetails');
                setUploadedDocs(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUploadDocSuccess = (doc) => {
        const tmpDocs = [doc, ...uploadedDocs];
        setUploadedDocs(tmpDocs);
    }

  return (
      <>
          <AuthenticatedTemplate>
            <UploadFile addDoc={handleUploadDocSuccess}/>
            <UploadedFilesTable data={uploadedDocs}loading={loading}/>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to see our application.</center>
            </Typography>
          </UnauthenticatedTemplate>
      </>
  );
}