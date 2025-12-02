import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/notices',
      permanent: false,
    },
  };
};

const Home = () => null;
export default Home;
