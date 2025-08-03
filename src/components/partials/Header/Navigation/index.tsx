import { fetchCategoriesTree } from "@/services/category.service";
import Image from "next/image";
import Categories from "./Categories";
import Search from "./Search";

const Navigation = async () => {
  const { data } = await fetchCategoriesTree({ page: 1, limit: 15 });

  return (
    <nav className="bg-card text-card-foreground sticky top-0 z-50">
      <div className="container h-16">
        <div className="relative flex h-full items-center gap-4">
          <div className="flex pb-2">
            <Image src="/logo.png" alt="Logo" width={64} height={32} />
          </div>
          <div className="flex flex-1 items-center">
            <div className="w-[calc(98/100_*_100%)]">
              <Categories data={data} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
