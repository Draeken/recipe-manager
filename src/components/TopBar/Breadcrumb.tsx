import { useRouter } from 'next/router';

type RouterComponents = { components: Array<{ Component: { name: string } }> };

const Breadcrumb = ({}) => {
  const router = useRouter();
  const path = router.pathname;
  if (!path || !((router as unknown) as RouterComponents).components) {
    return <div>Home</div>;
  }
  const components = Object.entries(((router as unknown) as RouterComponents).components)
    .filter((a) => a[0] !== '/_app')
    .sort((a, b) => path.indexOf(a[0]) - path.indexOf(b[0]));

  return <div>Home{components.map((c) => ` - ${c[1].Component.name}`)}</div>;
};

export default Breadcrumb;
