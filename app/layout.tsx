import "react-toastify/dist/ReactToastify.css";
import "@/style/global.scss";
import { ToastContainer } from "react-toastify";
import { Plus_Jakarta_Sans } from "next/font/google";
import PDFWorkerInitializer from "@/components/PDFWorkerInitializer";
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

const APP_NAME = "Library";
const APP_DEFAULT_TITLE = "Library Management System";
const APP_TITLE_TEMPLATE = "Library Management System | %s";
const APP_DESCRIPTION =
  "Library Management System is a web application that allows users to manage their library, including adding, updating, and deleting books, as well as tracking borrowed books and managing user accounts.";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#161c24",
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>
        <PDFWorkerInitializer />
        {children}
        <ToastContainer position="bottom-right" theme="dark" autoClose={1500} />
      </body>
    </html>
  );
}
