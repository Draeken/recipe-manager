import { Box, Button, makeStyles, Paper, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const RecipeCreation = () => {
  const classes = styles();
  const router = useRouter();
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
          <Form autoComplete="off">
            <Box display="flex" flexDirection="column">
              <Field name="name" placeholder="Recipe name" as={TextField} variant="filled" />
              <Field name="family" placeholder="Family" as={TextField} variant="filled" />
            </Box>
            <Link href={`${query.id}/step/${1}`}>
              <Button variant="contained" color="primary">
                add step
              </Button>
            </Link>
          </Form>
        </Formik>
      </Box>
    </Paper>
  );
};

export default RecipeCreation;
