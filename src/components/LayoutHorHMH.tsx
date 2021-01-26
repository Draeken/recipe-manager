import { makeStyles } from '@material-ui/core/styles';

const layout = makeStyles({
  root: {
    display: 'grid',
    flex: 1,
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: '100%',
  },
});

interface LayoutHorHMHProps {
  children: React.ReactNode;
}

const LayoutHorHMH = ({ children }: LayoutHorHMHProps) => {
  const classes = layout();
  return <main className={classes.root}>{children}</main>;
};

export default LayoutHorHMH;
