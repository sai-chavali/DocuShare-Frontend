import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

const UserAccessInput = (props) => {
  const {userAccessList, setUserAccessList} = props;

  const addTextbox = () => {
    setUserAccessList([...userAccessList, {email:'', accessLevel:'READ'}]);
  };

  const removeTextbox = (index) => {
    const updatedUserAccessList = [...userAccessList];
    updatedUserAccessList.splice(index, 1);
    setUserAccessList(updatedUserAccessList);
  };

  const handleTextboxChange = (index, name, value) => {
    const updatedUserAccessList = [...userAccessList];
    updatedUserAccessList[index][name] = value;
    setUserAccessList(updatedUserAccessList);
  };

  return (
    <div>
      {userAccessList.map(({email, accessLevel}, index) => (
        <div key={index}>
          <div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email Address"
                            type="email"
                            name="email"
                            onChange={(e) => handleTextboxChange(index, e.target.name, e.target.value)}
                            value={email}
                            fullWidth
                            variant="standard"
                        />
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="access-label">Access</InputLabel>
                        <Select
                            labelId="access=label"
                            name="accessLevel"
                            id="accessLevel"
                            value={accessLevel}
                            onChange={(e) => handleTextboxChange(index, e.target.name, e.target.value)}
                        >
                            <MenuItem value={'READ'}>Read</MenuItem>
                            <MenuItem value={'WRITE'}>Write</MenuItem>
                            <MenuItem value={'COMMENT'}>Comment</MenuItem>
                        </Select>
                    </FormControl>
                    <Button  sx={{ m:0.5, mt: 2, minWidth: 120 }} onClick={() => removeTextbox(index)}>Remove</Button>
                </div>
        </div>
      ))}
      <Button onClick={addTextbox}>Add User Access</Button>
    </div>
  );
};

export default UserAccessInput;