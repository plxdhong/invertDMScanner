import React from "react";
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, IconButton, Stack, Typography,Alert } from "@mui/material";
import { Box } from "@mui/system";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { BrowserDatamatrixCodeReader } from "@zxing/browser";
import {NotFoundException} from "@zxing/library";




const Input = styled('input')({
    display: 'none',
  });
const canvasStyle = {
    display: 'none',
}
const imgStyle = {
    width: '150px'
}
function Hand() {
    const [result, setResult] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [error, setError] = React.useState(false);
    const canvas = React.useRef();
    const reader = new BrowserDatamatrixCodeReader();


    const handleUpload = (event) => {
        if (event.target.files && event.target.files[0]){
            setResult('');
            setError(false);
            const context = canvas.current.getContext('2d');
            const img = new Image();
            img.src = URL.createObjectURL(event.target.files[0]);
            img.onload = async () => {
                canvas.current.width = img.naturalWidth;
                canvas.current.height = img.naturalHeight;
                context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                var imgData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                var data = imgData.data;
                for (var i = 0, len = data.length; i < len; i += 4) {
                    data[i] = 255 - data[i];
                    data[i + 1] = 255 - data[i + 1];
                    data[i + 2] = 255 - data[i + 2];
                  }
                context.putImageData(imgData, 0, 0);
                var image = new Image();
                image.src = canvas.current.toDataURL("image/jpeg");
                image.onload=async () => {
                    setImage(image.src);
                    try {
                        const data = await reader.decodeFromImageElement(image);
                        console.log(data);
                        setResult(data.getText());
                    } catch (e) {
                        if (e instanceof NotFoundException) {
                            console.log('No DM code found.');
                            setError(true);
                        } else {
                            console.log('Error reading DM code: ' + e);
                        }
                    }
                    
                }
                img.onerror = (error) => {
                    console.log(error);
                }
            }
            img.onerror = (error) => {
                console.log(error);
            }
        }
    };
    
    return (
      <div className="Scanner">
        <Card sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Box sx={{display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography variant="h5" component="h2">
                        手动上传
                    </Typography>
                    <canvas ref={canvas} style={canvasStyle}/>
                    {image && <img src={image} alt="" style={imgStyle}/>}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" onChange={handleUpload} id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                            上传
                            </Button>
                        </label>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" onChange={handleUpload} id="icon-button-file" type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                            </IconButton>
                        </label>
                    </Stack>
                    {error && <Alert severity="error"> 没有找到DM码:{Date.now().toString(36)}</Alert>}
                    {result && <Alert severity="success"> DM码:{result}</Alert>}
                </CardContent>
            </Box>
        </Card>
      </div>
    );
  }
  
  export default Hand;
  