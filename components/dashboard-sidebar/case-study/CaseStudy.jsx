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

export default function CaseStudy() {
  const [caseData, setCaseData] = useState([]);
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    getAllCaseApiCall();
  }, []);

  const getAllCaseApiCall = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/type/case?limit=10000`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete case:", errorData);
      }

      const data = await response.json();
      setCaseData(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCaseClick = (slug) => {
    console.log("clicked", slug);
    // router.push(`/dashboard/blog/${slug}`);
  };

  const handleDeleteCase = async (id) => {
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
        getAllCaseApiCall();
      } else {
        console.error("Failed to delete Case");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleCancel = (e) => {
    e?.stopPropagation();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-white">
            Case Studies
          </h1>
          <p className="text-slate-300 dark:text-gray-400 mt-2">
            Manage and create new case study posts
          </p>
        </div>
        <Link href="/dashboard/case-study/create-case">
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2">
            <SquarePen className="w-5 h-5" />
            New Case Study
          </button>
        </Link>
      </div>

      {/* Case Studies Grid */}
      {caseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseData.map((post) => {

            let parsedata = {};
            try {
              parsedata = post?.blog_data_raw
                ? JSON.parse(post.blog_data_raw)
                : {};
              console.log(parsedata);
            } catch (e) {
              console.error("Invalid JSON in blog_data_raw:", e);
              parsedata = {};
            }
            console.log("post", parsedata);


            return (
              <div
                key={post.id}
                className="relative group overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white dark:bg-gray-700 cursor-pointer rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the case study. This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCase(post.id);
                          }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Link
                  href={`/dashboard/case-study/${post?.slug}`}
                  className="block"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={parsedata?.section2?.thumbnailImageUrl || post?.image || "/defaultimage.jpeg"}
                      alt={post?.heading}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {post?.heading || "Untitled Case Study"}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {post?.short_description || "No description provided."}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {post.updated_at
                          ? new Date(post.updated_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "Unknown date"}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        Case Study
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <SquarePen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No case studies yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating a new case study
          </p>
          <Link href="/dashboard/case-study/create-case">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
              Create Case Study
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
