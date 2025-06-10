import Casecomponent from "@/components/casestudy-component/CaseComponent";

 
 
export async function generateStaticParams() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${API_BASE_URL}/blog/type/case`);
    if (!res.ok) throw new Error("Failed to fetch AI services");
    const services = await res.json();
    // console.log("services blog",services);
    
    return services.map((service) => ({ slug: service.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function CaseStudy({ params }) {
  return <Casecomponent params={params} />;
}