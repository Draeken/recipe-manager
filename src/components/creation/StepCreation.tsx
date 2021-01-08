import Link from 'next/link';
import { useRouter } from 'next/router';
import { Field, Form, Formik } from 'formik';

const StepCreation = ({  }) => {
  const router = useRouter();
  const query = router.query;
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          family: '',
        }}
        onSubmit={(...a) => console.log('submit', a)}>
        <Form>
          <Field name="name" placeholder="Name" />
          <Field name="family" placeholder="Family" />
          <Link href={`${query.id}/step/${1}`}><button>ADD STEP</button></Link>
        </Form>        
      </Formik>
    </div>
  );
};

export default StepCreation;
