import { AppBar, Toolbar } from '@material-ui/core';

interface AppBarRMProps {
  title: string;
}

const AppBarRM = ({ title }: AppBarRMProps) => {
  console.log('appBar');
  return (
    <AppBar position="static">
      <Toolbar>{title}</Toolbar>
    </AppBar>
  );
};

export default AppBarRM;
