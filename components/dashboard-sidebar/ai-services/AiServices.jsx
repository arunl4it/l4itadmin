"use client";
import React, { useEffect, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie } from "cookies-next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AiServices() {
  const [aiData, setAiData] = useState([]);
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    getAllAiApiCall();
  }, []);

  const getAllAiApiCall = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/type/aiservices?limit=100`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAiData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Changed to use slug for routing
  const handleAiClick = (slug) => {

    // console.log("slug",slug);
    
    router.push(`/dashboard/ai-services/${slug}`);
  };

  const handleDeleteAi = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        getAllAiApiCall();
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-8 p-6 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white dark:text-white">
          AI Services
        </h2>
        <Link href="/dashboard/ai-services/create-ai-service">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
            New Post
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiData.length > 0 ? (
          aiData.map((post) => (
            <div
              onClick={() => handleAiClick(post.slug)}  // Using slug here
              key={post.id}
              className="group border cursor-pointer border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300"
            >
              <div className="w-full h-40 bg-gray-300 rounded-lg mb-4">
                <Image
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                  alt={post?.heading}
                  src={post?.image || "/defaultimage.jpeg"}
                />
              </div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                {post?.heading || "Untitled"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {post?.short_description || "No description provided."}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {post.updated_at
                    ? new Date(post.updated_at).toLocaleDateString()
                    : "Unknown date"}
                </span>
                <div className="flex gap-3">
                  <Link href={`/dashboard/ai-services/edit/${post.slug}`}>  {/* Using slug */}
                    <SquarePen className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this AI service.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAi(post.id);  // Still using id for deletion
                          }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white dark:text-gray-300 col-span-full">
            No AI Services available.
          </p>
        )}
      </div>
    </div>
  );
}