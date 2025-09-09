const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-muted-foreground">
            দৈনিক এইদিন একটি আধুনিক সংবাদমাধ্যম প্লাটফর্ম যা নির্ভরযোগ্যতা, গতি
            এবং পাঠকের অভিজ্ঞতাকে অগ্রাধিকার দেয়।
          </p>
        </header>

        <div className="space-y-6 leading-relaxed">
          <p>
            আমরা দেশের এবং বিশ্বের গুরুত্বপূর্ণ খবর, বিশ্লেষণ, প্রযুক্তি,
            বিনোদন, খেলাধুলা এবং আরও অনেক বিষয় নিয়ে কাজ করি। দ্রুত এবং নির্ভুল
            খবর পৌঁছে দেওয়ার পাশাপাশি আমরা বিষয়ভিত্তিক গভীরতর কনটেন্ট প্রকাশে
            আগ্রহী।
          </p>
          <p>
            এই ওয়েবসাইটটি Next.js, React, TypeScript এবং Tailwind CSS দিয়ে
            নির্মিত; যেখানে পারফরম্যান্স, অ্যাক্সেসিবিলিটি এবং মোবাইল-ফার্স্ট
            ডিজাইন নিশ্চিত করা হয়েছে।
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">আমাদের লক্ষ্য</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>দ্রুত, নির্ভুল এবং পক্ষপাতহীন সংবাদ পরিবেশন</li>
            <li>ডিজিটাল অভিজ্ঞতাকে সহজ ও ব্যবহারবান্ধব রাখা</li>
            <li>পাঠকের মতামত ও আলোচনাকে গুরুত্ব দেওয়া</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">যোগাযোগ</h2>
          <p>
            যেকোনো মতামত, পরামর্শ বা সহযোগিতার জন্য আমাদের যোগাযোগ পাতায় বার্তা
            পাঠাতে পারেন।
          </p>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
