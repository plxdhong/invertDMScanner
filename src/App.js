import * as React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import PanToolIcon from '@mui/icons-material/PanTool';
import InboxIcon from '@mui/icons-material/Inbox';
import Paper from '@mui/material/Paper';
import Scanner from './components/Scanner';
import Hand from './components/Hand';



function App() {
  const [value, setValue] = React.useState(2);
  const ref = React.useRef(null);

  return (
    <div className="App">
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        {value === 1 && <Scanner/>}
        {value === 2 && <Hand/>}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction disabled value={1} label="扫描-未开放" icon={<QrCodeScannerOutlinedIcon />} />
            <BottomNavigationAction value={2} label="手动" icon={<PanToolIcon />} />
            <BottomNavigationAction disabled value={3} label="记录-未开放" icon={<InboxIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
