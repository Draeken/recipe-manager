import AppBarRM from '../../../../components/TopBar/AppBar';
import AppLayout from '../../../../components/AppLayout';
import StepCreation from '../../../../components/creation/StepCreation';
import LayoutHorHMH from '../../../../components/LayoutHorHMH';

interface AddStepProps {
  query: string;
}

const AddStep = ({ query }: AddStepProps) => {
  console.log(query);
  return (
    <AppLayout>
      <AppBarRM />
      <LayoutHorHMH>
        <div>helper right</div>
        <StepCreation />
        <div>helper left</div>
      </LayoutHorHMH>
    </AppLayout>
  );
};

export default AddStep;
