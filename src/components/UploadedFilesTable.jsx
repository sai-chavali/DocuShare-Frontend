import React, { useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import HttpService from '../utils/HttpService';
import { Share } from '@mui/icons-material';
import { ShareDialog } from './ShareDialog';
import Loader from './Loader';

export const UploadedFilesTable = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

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

    return (
        <div>
            {props.loading ? (
                <Loader/>
            ) : (
                <>
                <Typography variant='h4' sx={{mt: 3,mb:3}}>Uploaded Files</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>FileName</b></TableCell>
                                    <TableCell><b>Uploaded On</b></TableCell>
                                    <TableCell><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.fileName}</TableCell>
                                        <TableCell>{new Date(item.uploadedOn).toLocaleDateString()}</TableCell>
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
