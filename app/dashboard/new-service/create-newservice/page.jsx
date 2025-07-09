"use client";
import ServiceForm from "@/components/service-form/Serviceform";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import Mspform from "@/components/msp-form/Mspform";

const API_BASE_URL = process.env.NEXT_PUBLIC_CREATE_URL;

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const token = getCookie("token");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.heading?.trim()) errors.heading = "Heading is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.metaTitle?.trim())
      errors.metaTitle = "Meta title is required";
    if (!formData.metaDescription?.trim())
      errors.metaDescription = "Meta description is required";
    if (!formData.imageFile && !formData.image)
      errors.image = "Image is required";

    return errors;
  };

  const handleSubmit = async (formData) => {
    // console.log("form datasss", formData);
    
    setIsSubmitting(true);
    setError("");

    // Validate form
    const errors = validateForm(formData);
    console.log("validation errors", errors);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const uploadFormData = new FormData();

      // Append image
      if (formData.imageFile) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.image) {
        uploadFormData.append("image_url", formData.image);
      }

      // Append basic fields
      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content || "");
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription || "");
      uploadFormData.append("heading", formData.heading);
      uploadFormData.append("type", "newcase");
      uploadFormData.append("meta_description", formData.metaDescription);

      // Structure the blog data in the expected format
      const blog_data_raw = {
        section1Title2: formData.section1Title2 || "",
        section1Content: formData.section1Content || "",
        section1Title21: formData.section1Title21 || "",
        section1Content21: formData.section1Content21 || "",
        section1Title22: formData.section1Title22 || "",
        section1Content22: formData.section1Content22 || "",
        section2Heading: formData.section2Heading || "",
        section2Content: formData.section2Content || "",
        section3Heading: formData.section3Heading || "",
        section3Subheading: formData.section3Subheading || "",
        section3Points: formData.section3Points || [],
        section3Conclusion: formData.section3Conclusion || "",
        section4Heading: formData.section4Heading || "",
        section4Subheading: formData.section4Subheading || "",
        section4Points: formData.section4Points || [],
        section4Conclusion: formData.section4Conclusion || "",
        section5Heading: formData.section5Heading || "",
        section5Subheading: formData.section5Subheading || "",
        section5Points: formData.section5Points || [],
        section5Conclusion: formData.section5Conclusion || "",
        section6Heading: formData.section6Heading || "",
        section6Subheading: formData.section6Subheading || "",
        section6Points: formData.section6Points || [],
        section6Conclusion: formData.section6Conclusion || "",
        section7Heading: formData.section7Heading || "",
        section7Subheading: formData.section7Subheading || "",
        section7Points: formData.section7Points || [],
        section7Conclusion: formData.section7Conclusion || "",
        section8Heading: formData.section8Heading || "",
        section8Subheading: formData.section8Subheading || "",
        section8Content: formData.section8Content || "",
      };

      // Append the structured blog data
      uploadFormData.append("blog_data_raw", JSON.stringify(blog_data_raw));

      console.log([...uploadFormData.entries()]);

      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Blog creation failed");
      }

      const data = await response.json();
      console.log("data", data);

      toast.success("Blog created successfully!");
      router.push("/dashboard/Blog");
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message || "Failed to create blog");
      toast.error(error.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/Blog");
  };

  return (
    <Mspform
      onSubmit={handleSubmit}
      isEditing={false}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      apiError={error}
      errors={formErrors}
    />
  );
}