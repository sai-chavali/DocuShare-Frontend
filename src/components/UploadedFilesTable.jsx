import React, { useEffect, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import HttpService from '../utils/HttpService';
import { Share } from '@mui/icons-material';
import { ShareDialog } from './ShareDialog';

export const UploadedFilesTable = () => {
    const [data, setData] = useState([]);
    const { loading, get } = HttpService();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleShareButtonClick = (fileName, id) => {
        setName(fileName);
        setId(id)
        handleClickOpen();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('/private/documentDetails');
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <Typography variant='h4' sx={{ml:0}}>Uploaded Files</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>FileName</TableCell>
                                    <TableCell>Uploaded On</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.fileName}</TableCell>
                                        <TableCell>{item.uploadedOn}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleShareButtonClick(item.fileName, item.id)}>
                                                <Share />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ShareDialog open={open} handleClose={handleClose} name={name} documentId={id}/>
                </>
            )}
        </div>
    );
};
