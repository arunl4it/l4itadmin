"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import Image from "next/image";
import BlogForm from "../blog-form/BlogForm";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Casecomponent() {
 
  const router = useRouter();
  const { id } = useParams();
  const token = getCookie("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [caseId, setCaseId] = useState(null);

  // Redirect to home if token is missing
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.heading?.trim()) errors.heading = "Heading is required";
    if (!formData.content?.trim()) errors.content = "Content is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.shortDescription?.trim())
      errors.shortDescription = "Short description is required";
    if (!formData.metaTitle?.trim())
      errors.metaTitle = "Meta title is required";
    if (!formData.metaDescription?.trim())
      errors.metaDescription = "Meta description is required";
    if (!formData.imageFile && !formData.image)
      errors.image = "Image is required";

    return errors;
  };

  // Fetch blog data
  useEffect(() => {
    const fetchAiService = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setCaseId(data.id);
        setInitialData({
          ...data,
          short_description: data.short_description || "",
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
        });
      } catch (error) {
        console.error("Fetch blog error:", error);
        toast.error("Failed to load blog data");
      }
    };

    if (id) {
      fetchAiService();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError("");

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const uploadFormData = new FormData();

      if (formData.imageFile instanceof File) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.image) {
        uploadFormData.append("image_url", formData.image);
      }

      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content);
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription);
      uploadFormData.append("heading", formData.heading);
      uploadFormData.append("type", "case");
      uploadFormData.append("meta_description", formData.metaDescription);

      const response = await fetch(`${API_BASE_URL}/blog/update/${caseId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "AI service update failed");
      }

      const data = await response.json();
      toast.success("AI Service updated successfully!");
      router.push("/dashboard/CaseStudy");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update AI service");
      toast.error(error.message || "Failed to update AI service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/CaseStudy");
  };

  if (!initialData) return <div className="p-8">Loading...</div>;

  return (
    <BlogForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      apiError={error}
    />
  );
}
