"use client";
 import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import BlogForm from "@/components/blog-form/BlogForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_CREATE_URL;

export default function CreateAiServices() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const token = getCookie("token");

  console.log(token);
  

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
      uploadFormData.append("type", "aiservices");
      uploadFormData.append("meta_description", formData.metaDescription);


      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });
      console.log("response",response);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Blog creation failed");
      }

      const data = await response.json();
    //   console.log("Ai service created successfully:", data);
      toast.success("Ai Service created successfully!");
      router.push("/dashboard/AiServices");
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message || "Failed to create");
      toast.error(error.message || "Failed to create");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/AiServices");
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
