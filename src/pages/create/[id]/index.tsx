import AppBar from '../../../components/TopBar/AppBar';
import AppLayout from '../../../components/AppLayout';
import RecipeCreation from '../../../components/creation/RecipeCreation';
import LayoutHorHMH from '../../../components/LayoutHorHMH';

const Create = ({ query }) => {
  console.log(query);
  return (
    <AppLayout>
      <AppBar />
      <LayoutHorHMH>
        <div>helper right</div>
        <RecipeCreation />
        <div>helper left</div>
      </LayoutHorHMH>
    </AppLayout>
  );
};

export default Create;
