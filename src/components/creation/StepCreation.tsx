import { Button, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { DeleteSharp } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      paddingRight: theme.spacing(2),
    },
  },
  smallField: {
    width: '100px',
  },
}));

const StepCreation = () => {
  const classes = styles();
  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{
          inputs: [
            {
              family: '',
              details: '',
              quantity: 1,
              unit: '',
            },
          ],
        }}
        onSubmit={(...a) => console.log('submit', a)}
        render={({ values }) => (
          <Form autoComplete="off">
            <FieldArray
              name="inputs"
              render={(arrayHelpers) => (
                <>
                  {values.inputs.map((_, index) => (
                    <div>
                      <Field
                        name={`inputs.${index}.family`}
                        label="Input"
                        as={TextField}
                        variant="filled"
                      />
                      <Field
                        name={`inputs.${index}.details`}
                        label="Additional details"
                        as={TextField}
                        variant="filled"
                      />
                      <Field
                        className={classes.smallField}
                        type="number"
                        name={`inputs.${index}.quantity`}
                        label="Quantity"
                        as={TextField}
                        variant="filled"
                      />
                      <Field
                        className={classes.smallField}
                        name={`inputs.${index}.unit`}
                        label="Unit"
                        as={TextField}
                        variant="filled"
                      />
                      <IconButton aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                        <DeleteSharp />
                      </IconButton>
                    </div>
                  ))}
                  <br />
                  <Button
                    color="primary"
                    onClick={() =>
                      arrayHelpers.push({
                        family: '',
                        details: '',
                        quantity: 1,
                        unit: '',
                      })
                    }
                  >
                    add input
                  </Button>
                </>
              )}
            />
          </Form>
        )}
      />
    </Paper>
  );
};

export default StepCreation;
