import { fetchCategoriesTree } from "@/services/category.service";
import Navigation from "./Navigation";
import TopHeader from "./TopHeader";

const Header = async () => {
  const { data } = await fetchCategoriesTree({ page: 1, limit: 15 });
  return (
    <>
      <TopHeader categories={data!} />
      <Navigation categories={data!} />
    </>
  );
};

export default Header;
