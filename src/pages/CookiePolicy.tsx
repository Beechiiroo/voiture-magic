
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/use-translation";

export default function CookiePolicy() {
  const { t } = useTranslation();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold mb-6">{t("cookiePolicy")}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              {t("cookieLastUpdated")} {t("date", { date: new Date() })}
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("whatAreCookiesTitle")}</h2>
            <p>{t("whatAreCookiesText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("cookieTypesTitle")}</h2>
            <p>{t("cookieTypesText")}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("essentialCookiesTitle")}</h3>
            <p>{t("essentialCookiesText")}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("functionCookiesTitle")}</h3>
            <p>{t("functionCookiesText")}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("analyticsCookiesTitle")}</h3>
            <p>{t("analyticsCookiesText")}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("marketingCookiesTitle")}</h3>
            <p>{t("marketingCookiesText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("cookieControlTitle")}</h2>
            <p>{t("cookieControlText")}</p>
            <p>{t("browserSettings")}</p>
            <ul className="list-disc pl-5 my-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-rental-600 hover:text-rental-700">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-rental-600 hover:text-rental-700">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-rental-600 hover:text-rental-700">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-rental-600 hover:text-rental-700">Microsoft Edge</a></li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("cookiesWeUseTitle")}</h2>
            <p>{t("cookiesWeUseText")}</p>
            
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t("cookieName")}</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t("cookiePurpose")}</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{t("cookieExpiration")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">session_id</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t("sessionCookieDescription")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t("sessionLength")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">user_preferences</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t("preferencesCookieDescription")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1 {t("year")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">_ga</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{t("gaCookieDescription")}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2 {t("years")}</td>
                </tr>
              </tbody>
            </table>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("contactTitle")}</h2>
            <p>{t("contactCookiesText")}</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
