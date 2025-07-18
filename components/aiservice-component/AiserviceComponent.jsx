"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import Mspform from "../msp-form/Mspform";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AiserviceComponent() {
  const router = useRouter();
  const { id } = useParams();
  const token = getCookie("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [aiId, setAiId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Redirect to home if token is missing
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.heading?.trim()) errors.heading = "Heading is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.metaTitle?.trim()) errors.metaTitle = "Meta title is required";
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
        setAiId(data.id);
        
        // Parse the blog_data_raw if it exists
        const blogDataRaw = data.blog_data_raw ? JSON.parse(data.blog_data_raw) : {};
        
        setInitialData({
          ...data,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          short_description: data.short_description || "",
          content: data.content || "",
          // Spread the parsed blog_data_raw into initialData
          ...blogDataRaw
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
      setFormErrors(errors);
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }

    setFormErrors({});

    try {
      const uploadFormData = new FormData();

      if (formData.imageFile instanceof File) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.image) {
        uploadFormData.append("image_url", formData.image);
      }

      if (formData.thumbnailFile) {
        uploadFormData.append("thumbnail", formData.thumbnailFile);
      }

      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content || "");
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription || "");
      uploadFormData.append("heading", formData.heading);
      uploadFormData.append("type", "aiservices");
      uploadFormData.append("meta_description", formData.metaDescription);

      // Prepare nested data matching the AI service structure
      const serviceData = {
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
        faqs: formData.faqs || [],
      };

      // Stringify the nested data
      uploadFormData.append("blog_data_raw", JSON.stringify(serviceData));

      const response = await fetch(`${API_BASE_URL}/blog/update/${aiId}`, {
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
      router.push("/dashboard/AiServices");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update AI service");
      toast.error(error.message || "Failed to update AI service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/AiServices");
  };

  if (!initialData) return <div className="p-8">Loading...</div>;

  return (
    <Mspform
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      apiError={error}
      errors={formErrors}
    />
  );
}