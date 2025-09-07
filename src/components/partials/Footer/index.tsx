import Icon from "@/components/ui/Icon";
import { SOCIALS } from "@/config";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="container">
        <div className="py-6 md:py-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Logo & About */}
            <div>
              <h2 className="text-2xl font-bold">দৈনিক এদিন</h2>
              <p className="text-muted-foreground mt-3 text-sm">
                আপনার বিশ্বস্ত সংবাদ মাধ্যম — সর্বশেষ সংবাদ, নিরপেক্ষ বিশ্লেষণ
                এবং সঠিক তথ্য সরবরাহে অঙ্গীকারবদ্ধ।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">দ্রুত লিঙ্ক</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/">প্রথম পাতা</a>
                </li>
                <li>
                  <a href="/about">আমাদের সম্পর্কে</a>
                </li>
                <li>
                  <a href="/contact">যোগাযোগ</a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">যোগাযোগ</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                ইমেইল: news@dainikeidin.com
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                মোবাইল: + ০১৭১৫৭৭৮৬৯৬
              </p>
              <div className="flex flex-wrap space-x-4">
                {SOCIALS.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={social.name} className="size-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-6 md:my-10" />

          {/* Bottom Section */}
          <div className="text-muted-foreground flex flex-col items-center justify-center text-sm sm:flex-row">
            <p>
              © {new Date().getFullYear()} দৈনিক এদিন — সর্বস্বত্ব সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
