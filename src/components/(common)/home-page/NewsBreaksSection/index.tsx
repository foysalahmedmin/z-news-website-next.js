import { TNewsBreak } from "@/types/news-break.type";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const newsBreaks: Partial<TNewsBreak>[] = [
  {
    _id: "64d1f7b5a8c2f9b1d5e7c101",
    sequence: 1,
    title: "ঢাকায় সকাল থেকে প্রবল বৃষ্টি চলছে",
    news: "64d1f7b5a8c2f9b1d5e7c201",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c102",
    sequence: 2,
    title: "বাংলাদেশ ক্রিকেট দল ওয়েস্ট ইন্ডিজ সফরে",
    news: "64d1f7b5a8c2f9b1d5e7c202",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c103",
    sequence: 3,
    title: "সড়ক দুর্ঘটনায় একজনের মৃত্যু",
    news: "64d1f7b5a8c2f9b1d5e7c203",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c104",
    sequence: 4,
    title: "বিশ্বজুড়ে মূল্যস্ফীতি বৃদ্ধি পাচ্ছে",
    news: "64d1f7b5a8c2f9b1d5e7c204",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c105",
    sequence: 5,
    title: "নতুন শিক্ষাবর্ষের প্রস্তুতি শুরু",
    news: "64d1f7b5a8c2f9b1d5e7c205",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c106",
    sequence: 6,
    title: "কৃষকদের জন্য নতুন সরকারি অনুদান ঘোষণা",
    news: "64d1f7b5a8c2f9b1d5e7c206",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c107",
    sequence: 7,
    title: "ঢাকা মেট্রোরেলের কাজ সম্পন্নের পথে",
    news: "64d1f7b5a8c2f9b1d5e7c207",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c108",
    sequence: 8,
    title: "মহামারীর নতুন বিধিনিষেধ আরোপ",
    news: "64d1f7b5a8c2f9b1d5e7c208",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c109",
    sequence: 9,
    title: "বিশ্বকাপ ফুটবলের প্রস্তুতি শুরু",
    news: "64d1f7b5a8c2f9b1d5e7c209",
  },
  {
    _id: "64d1f7b5a8c2f9b1d5e7c110",
    sequence: 10,
    title: "পর্যটন শিল্পে উন্নতির লক্ষ্যে নতুন পরিকল্পনা",
    news: "64d1f7b5a8c2f9b1d5e7c210",
  },
];

const NewsHeadlinesSection = async () => {
  return (
    <section className="bg-card text-card-foreground top-0 shadow md:sticky md:z-30">
      <div className="relative container">
        <div className="relative flex flex-col items-center lg:flex-row">
          <div className="bg-primary text-primary-foreground flex h-12 w-full items-center justify-center gap-2 px-4 lg:w-auto">
            <span className="relative flex size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
            </span>
            <h3 className="font-bold whitespace-nowrap">শিরোনাম</h3>
          </div>

          {/* Marquee container should take full available width */}
          <div className="relative flex h-12 w-full items-center overflow-hidden lg:w-auto lg:flex-1">
            <div className="via-card from-card absolute -end-1 top-0 bottom-0 z-20 w-10 bg-gradient-to-l to-transparent" />
            <div className="via-card from-card absolute -start-1 top-0 bottom-0 z-20 w-10 bg-gradient-to-r to-transparent" />
            <Marquee speed={50} pauseOnHover gradient={false}>
              <ul className="flex whitespace-nowrap">
                {newsBreaks.map((newsBreak) => (
                  <li
                    className="border-primary border-r px-4"
                    key={newsBreak._id}
                  >
                    <Link
                      href={`/news/${newsBreak.news}`}
                      className="underline-effect foreground hover:underline-effect-active text-sm whitespace-nowrap uppercase transition-colors duration-200"
                    >
                      {newsBreak.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeadlinesSection;
