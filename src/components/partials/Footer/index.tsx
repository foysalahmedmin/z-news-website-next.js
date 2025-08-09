import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 border-b border-neutral-700 pb-8 md:grid-cols-3">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">দৈনিক এদিন</h2>
            <p className="mt-3 text-sm text-neutral-400">
              আপনার বিশ্বস্ত সংবাদ মাধ্যম — সর্বশেষ খবর, নিরপেক্ষ বিশ্লেষণ এবং
              সঠিক তথ্য সরবরাহে অঙ্গীকারবদ্ধ।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              দ্রুত লিঙ্ক
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="transition hover:text-white">
                  প্রথম পাতা
                </a>
              </li>
              <li>
                <a
                  href="/category/bangladesh"
                  className="transition hover:text-white"
                >
                  বাংলাদেশ
                </a>
              </li>
              <li>
                <a
                  href="/category/international"
                  className="transition hover:text-white"
                >
                  আন্তর্জাতিক
                </a>
              </li>
              <li>
                <a href="/contact" className="transition hover:text-white">
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">যোগাযোগ</h3>
            <p className="mb-4 text-sm text-neutral-400">
              ইমেইল: contact@doinikeidin.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="transition hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="transition hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="transition hover:text-white">
                <Youtube size={20} />
              </a>
              <a
                href="mailto:contact@doinikeidin.com"
                className="transition hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col items-center justify-between text-sm text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} দৈনিক এদিন — সর্বস্বত্ব সংরক্ষিত</p>
          <p className="mt-2 sm:mt-0">
            Developed by{" "}
            <a
              href="https://foysal.dev"
              className="text-neutral-300 transition hover:text-white"
            >
              Foysal Ahmed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
