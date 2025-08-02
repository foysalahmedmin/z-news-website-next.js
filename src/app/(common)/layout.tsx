import Header from "@/components/partials/Header";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
