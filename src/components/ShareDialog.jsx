import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Input, InputLabel, Typography } from "@mui/material";
import React from "react";
import UserAccessInput from './UserAccessInput';
import HttpService from "../utils/HttpService";
import CopyableTextbox from "./CopyableTextbox";

export function ShareDialog(props) {
    const [userAccessList, setUserAccessList] = React.useState([]);
    const [isPublic, setIsPublic] = React.useState(true);
    const [expirationTime, setExpirationTime] = React.useState();
    const [url, setUrl] = React.useState();
    const [clickedShare, setClickedShare] = React.useState(false); 
    const { post,loading } = HttpService();


    const handleShare = async () => {
        setClickedShare(true);
        const response = await post('/private/share', {isPublic, expirationTime, userAccessList, documentId: props.documentId});
        setUrl(`${window.location.origin}/document/${response}`)
    }

    const showShareUrl = () => {
        return !loading?(<CopyableTextbox value={url}/>):(
            <Typography variant="caption" component="h2">
            Generating the link...
          </Typography>)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Sharing {props.name} File</DialogTitle>
            <DialogContent>
                <FormControlLabel
                    control={
                        <Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                    }
                    label="Do you want this file share to be public?"
                    labelPlacement="start"
                />
                <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="expirationTime" labelPlacement="start">Expiration Time</InputLabel>
                        <Input
                            autoFocus
                            margin="dense"
                            value={expirationTime}
                            onChange={(event) => setExpirationTime(event.target.value)}
                            id="expirationTime"
                            type="date"
                            fullWidth
                            variant="standard"
                        />
                    </FormControl>
                    </div>
                <UserAccessInput userAccessList={userAccessList} setUserAccessList={setUserAccessList}/>
                <div>
                    {clickedShare && showShareUrl()}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleShare}>Share</Button>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}