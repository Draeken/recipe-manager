import { makeStyles } from '@material-ui/core/styles';

import { colors } from '../../shared/styles';
import Breadcrumb from './Breadcrumb';

const styles = makeStyles({
  root: {
    height: 48,
    backgroundColor: colors.paper.background,
    color: colors.paper.onBackground,
  },
});

const AppBar = ({}) => {
  const classes = styles();
  return (
    <header className={classes.root}>
      <Breadcrumb />
    </header>
  );
};

export default AppBar;
