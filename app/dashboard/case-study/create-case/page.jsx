"use client";
import BlogForm from "@/components/blog-form/BlogForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
// const API_BASE_URL = "http://ai.l4it.net:8000/blog"

export default function CreateCasePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_CREATE_URL;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const token = getCookie("token");

  console.log("token", API_BASE_URL);

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

  const handleSubmit = async (formData) => {
    console.log("API_BASE_URL", API_BASE_URL);

    setIsSubmitting(true);
    setError("");

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }

    setFormErrors({});

    try {
      const uploadFormData = new FormData();

      if (formData.imageFile) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.image) {
        // If using URL instead of file upload
        uploadFormData.append("image_url", formData.image);
      }

      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content);
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription);
      uploadFormData.append("heading", formData.heading);
      uploadFormData.append("type", "case");
      uploadFormData.append("meta_description", formData.metaDescription);

      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });
      console.log("responsessss", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "case study creation failed");
      }

      const data = await response.json();
      console.log("case study created successfully:", data);
      toast.success("case study created successfully!");
      router.push("/dashboard/CaseStudy");
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message || "Failed to create case study");
      toast.error(error.message || "Failed to create case study");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/CaseStudy");
  };

  return (
    <BlogForm
      onSubmit={handleSubmit}
      isEditing={false}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      errors={formErrors}
      apiError={error}
    />
  );
}
