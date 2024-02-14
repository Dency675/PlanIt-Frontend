import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';



import Header from '../../components/Admin/Header';
import UsersList from '../../components/Admin/UsersList';
import TeamsList from '../../components/Admin/TeamsList';
import { Sidebar } from '../../components/Admin/Sidebar';
import { Users } from 'lucide-react';
import ProjectManager from '../../components/Admin/ProjectManager';



export default function JoyOrderDashboardTemplate() {
  const [selectedTab, setSelectedTab] = React.useState('users'); // State for selected tab

  console.log(selectedTab)
  const handleValueFromChild = (tabName:any) => {
    setSelectedTab(tabName);
  };
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar SendValueToParent={handleValueFromChild}/>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
            //   separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
              {selectedTab === 'teams' ? 'Teams' : selectedTab === 'users' ? 'Users' : 'Project Manager'}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
            {selectedTab === 'teams' ? 'Teams' : selectedTab === 'users' ? 'Users' : 'Project Manager'}
            </Typography>
            {/* <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button> */}
          </Box>
          {/* <UsersList/> */}
          {
  selectedTab === 'teams' ? <TeamsList /> :
  selectedTab === 'users' ? <UsersList /> :
  selectedTab === 'projectmanager' ? <ProjectManager /> :
  null // Render null or another default component if needed
}
        
          
        </Box>
        
      </Box>
    </CssVarsProvider>
  );
}
