import * as React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';
import LeftComponent from '../../components/Login/LeftComponent';
import RightComponent from '../../components/Login/RightComponent';





// function ModeToggle() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   // necessary for server-side rendering
//   // because mode is undefined on the server
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return <Button variant="soft">Change mode</Button>;
//   }

//   return (
//     <Button
//       variant="soft"
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   );
// }

export default function Login() {
  return (
    <main  style={{ display: 'flex', justifyContent: 'center' }}>
      {/* <ModeToggle /> */}
      <CssBaseline />
      <LeftComponent/>
      <RightComponent/>
     
    </main>
  );
}
