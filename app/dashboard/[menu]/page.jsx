 import AiServices from "@/components/dashboard-sidebar/ai-services/AiServices";
import Blog from "@/components/dashboard-sidebar/blog/Blog";
import MspServices from "@/components/dashboard-sidebar/msp-services/MspServices";

const DashboardPage =async ({ params }) => {
  const { menu } = await params;
  // console.log("menu",menu);

  const renderContent = () => {
    switch (menu) {
      case "Blog":
        return <Blog />;
      case "AiServices":
        return <AiServices />;
      case "MspServices":
        return <MspServices />;
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

  return <div className="w-full ">{renderContent()}</div>;
};

export default DashboardPage;
