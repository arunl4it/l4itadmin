 import MspComponent from "@/components/msp-component/MspComponent";

 
export async function generateStaticParams() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${API_BASE_URL}/blog/type/msp`);
    if (!res.ok) throw new Error("Failed to fetch AI services");
    const services = await res.json();
    console.log("services msp",services);
    
    return services.map((service) => ({ slug: service.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Blog({ params }) {
  return <MspComponent params={params} />;
}