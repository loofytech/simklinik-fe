export default function Auth() {
  return;
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/auth/signin",
    }
  }
}