import dynamic from 'next/dynamic';

const HomeSections = dynamic(() =>
  import('@/app/(main)/_components').then((mod) => mod.HomeSections),
);

export default function Page() {
  return <HomeSections />;
}
