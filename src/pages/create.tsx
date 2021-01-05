import AppBar from '../components/AppBar';
import AppLayout from '../components/AppLayout';
import LayoutHorHMH from '../components/LayoutHorHMH';

const Create = () => {
  return (
    <AppLayout>
      <AppBar />
      <LayoutHorHMH>
        <div>helper right</div>
        
        <div>helper left</div>
      </LayoutHorHMH>
    </AppLayout>
  );
};

export default Create;
