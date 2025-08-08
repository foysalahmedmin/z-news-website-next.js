import Header from "@/components/partials/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "দৈনিক এইদিন",
  description: "দৈনিক এইদিন",
};

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
