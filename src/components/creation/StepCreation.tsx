import Link from 'next/link';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';
import { Box, makeStyles, Paper } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const StepCreation = () => {
  const router = useRouter();
  const classes = styles();
  const { query } = router;
  return (
    <Paper className={classes.root}>
      <Box m={2}>
        <Formik
          initialValues={{
            name: '',
            family: '',
          }}
          onSubmit={(...a) => console.log('submit', a)}
        >
          <Form>
            <Field name="name" placeholder="Name" />
            <Field name="family" placeholder="Family" />
            <Link href={`${query.id}/step/${1}`}>
              <button>ADD STEP</button>
            </Link>
          </Form>
        </Formik>
      </Box>
    </Paper>
  );
};

export default StepCreation;
