import React from "react";
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const Input = styled('input')({
    display: 'none',
  });

function Scanner() {

    
    return (
      <div className="Scanner">
        <Card sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Box sx={{display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography variant="h5" component="h2">
                        扫码
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                            Upload
                            </Button>
                        </label>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                            </IconButton>
                        </label>
                    </Stack>
                    <Typography variant="h4" component="h2">
                        未开放，敬请期待
                    </Typography>
                </CardContent>
            </Box>
        </Card>
      </div>
    );
  }
  
  export default Scanner;
  