import { menuItems } from "@/app/lib/menu-items";
import AiServices from "@/components/dashboard-sidebar/ai-services/AiServices";
import Blog from "@/components/dashboard-sidebar/blog/Blog";
import CaseStudy from "@/components/dashboard-sidebar/case-study/CaseStudy";
import { Leads } from "@/components/dashboard-sidebar/leads/Leads";
import MspServices from "@/components/dashboard-sidebar/msp-services/MspServices";
import Newservice from "@/components/dashboard-sidebar/new-service/Newservice";
import {
  Home,
  ClipboardCheck,
  Brain,
  Network,
  ContactRound,
  NotebookPen,
} from "lucide-react";

// export const menuItems = [
//   {
//     id: 1,
//     name: "Dashboard",
//     href: "",
//     icon: Home,
//   },
//   {
//     id: 2,
//     name: "Blog",
//     href: "Blog",
//     icon: ClipboardCheck,
//   },
//   {
//     id: 3,
//     name: "AI Services",
//     href: "AiServices",
//     icon: Brain,
//   },
//   {
//     id: 4,
//     name: "MSP Services",
//     href: "MspServices",
//     icon: Network,
//   },
//   {
//     id: 5,
//     name: "Leads",
//     href: "Leads",
//     icon: ContactRound,
//   },
//   {
//     id: 6,
//     name: "Case Study",
//     href: "CaseStudy",
//     icon: NotebookPen,
//   },
//   {
//     id: 7,
//     name: "New Service",
//     href: "Newservice",
//     icon: NotebookPen,
//   },
// ];

// Use the menuItems to generate static params
export async function generateStaticParams() {
  // Filter out the Dashboard item since it has empty href
  return menuItems
    .filter((item) => item.href)
    .map((item) => ({
      menu: item.href,
    }));
}

const DashboardPage = ({ params }) => {
  const { menu } = params;

  const renderContent = () => {
    switch (menu) {
      case "Blog":
        return <Blog />;
      case "AiServices":
        return <AiServices />;
      case "MspServices":
        return <MspServices />;
      case "Leads":
        return <Leads />;
      case "CaseStudy":
        return <CaseStudy />;
      case "Newservice":
        return <Newservice />;

      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The requested page could not be found.
            </p>
          </div>
        );
    }
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default DashboardPage;
