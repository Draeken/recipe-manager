import AppBar from '../../../../components/TopBar/AppBar';
import AppLayout from '../../../../components/AppLayout';
import StepCreation from '../../../../components/creation/StepCreation';
import LayoutHorHMH from '../../../../components/LayoutHorHMH';

const AddStep = ({ query }) => {
  console.log(query);
  return (
    <AppLayout>
      <AppBar />
      <LayoutHorHMH>
        <div>helper right</div>
        <StepCreation />
        <div>helper left</div>
      </LayoutHorHMH>
    </AppLayout>
  );
};

export default AddStep;
