'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Newservice() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getAllBlogsApiCall();
  }, []);

  const getAllBlogsApiCall = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/type/newcase?limit=100`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch blogs:", errorData);
        return;
      }

      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const renderBlogDataRaw = (rawData) => {
    if (!rawData) return null;
    
    try {
      const parsedData = JSON.parse(rawData);
      return (
        <div className="bg-gray-800 p-4 rounded-lg mt-2">
          <h3 className="font-bold text-white mb-2">Blog Details:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-300">Short Description:</h4>
              <p className="text-white">{parsedData.shortDescriptionHeading}</p>
            </div>
            
            <div>
              <h4 className="text-blue-300">About Service:</h4>
              <p className="text-white">{parsedData.aboutServiceDescription}</p>
            </div>
            
            <div>
              <h4 className="text-blue-300">Key Benefits:</h4>
              <ul className="list-disc pl-5 text-white">
                {parsedData.keyBenefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-blue-300">Industries:</h4>
              {parsedData.industries?.map((industry, index) => (
                <div key={index} className="mb-3">
                  <p className="text-white font-medium">{industry.name}</p>
                  <ul className="list-disc pl-5 text-gray-300">
                    {industry.features?.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-blue-300">FAQs:</h4>
              {parsedData.faqs?.map((faq, index) => (
                <div key={index} className="mb-2">
                  <p className="text-white font-medium">Q: {faq.q}</p>
                  <p className="text-gray-300">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error parsing blog_data_raw:", error);
      return <p className="text-red-500">Error displaying content</p>;
    }
  };

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white dark:text-white">
          Blog Posts
        </h2>

        <Link href="/dashboard/new-service/create-newservice">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            New Post
          </button>
        </Link>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog) => (
          <div 
            key={blog.id} 
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {blog.image && (
              <img 
                src={blog.image} 
                alt={blog.heading} 
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{blog.heading}</h3>
              <p className="text-gray-300 mb-4">{blog.short_description}</p>
              
              {blog.blog_data_raw && renderBlogDataRaw(blog.blog_data_raw)}
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-400 text-sm">
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <Link href={`/dashboard/new-service/edit/${blog.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}