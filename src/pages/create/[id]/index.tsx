import AppLayout from '../../../components/AppLayout';
import RecipeCreation from '../../../components/creation/RecipeCreation';
import LayoutHorHMH from '../../../components/LayoutHorHMH';
import AppBarRM from '../../../components/TopBar/AppBar';

interface CreateProp {
  query: string;
}

const Create = ({ query }: CreateProp) => {
  console.log(query);
  return (
    <AppLayout>
      <AppBarRM title="Recipe Creation" />
      <LayoutHorHMH>
        <div>helper right</div>
        <RecipeCreation />
        <div>helper left</div>
      </LayoutHorHMH>
    </AppLayout>
  );
};

export default Create;
