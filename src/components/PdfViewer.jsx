import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import HttpService from '../utils/HttpService';
import '../styles/index.css';
import { IconButton } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { SignInButton } from './SignInButton';
import Loader from './Loader';

const PdfViewer = (props) => {
    const { accounts } = useMsal();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pdfData, setpdfData] = useState();
    const { get, loading } = HttpService();
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // const navigate = useNavigate();
    const { id }= useParams();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };
    
      const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
      };

    // Check if user is already logged in
    useEffect(() => {
        const fetchData = async () => {
            const pdf = await get(`/private/doc/${id}`)
            setpdfData(pdf);   
        }
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        const checkLoginStatus = async () => {
            if (accounts.length > 0) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
        fetchData();
    }, [accounts]);

    const renderPDF = () => {
        if (pdfData) {
            return (
                <div>
                    <div className="pdf-toolbar">
                        <IconButton disabled={currentPage === 1} onClick={goToPreviousPage}>
                            <ChevronLeft />
                        </IconButton>
                        <span>{currentPage} of {numPages}</span>
                        <IconButton disabled={currentPage === numPages} onClick={goToNextPage}>
                            <ChevronRight />
                        </IconButton>
                    </div>
                    <Document
                        file={`data:application/pdf;base64,${pdfData}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={currentPage} />
                    </Document>
                </div>
            );
        }
        else if(loading)
            return <Loader/>;
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className='.pdf-container'>
                    {renderPDF()}
                </div>
            ) : (
                <SignInButton/>
            )}
        </div>
    );
};

export default PdfViewer;
