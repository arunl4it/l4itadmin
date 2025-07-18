"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function ServiceForm({
  initialData = {},
  onSubmit,
  isEditing = false,
  onCancel,
  isSubmitting,
  errors = {},
  apiError,
}) {
  const [formData, setFormData] = useState({
    image: "",
    thumnailimage: "",
    heading: "",
    section1Title2: "",
    section1Content: "",
    section1Title21: "",
    section1Content21: "",
    section1Title22: "",
    section1Content22: "",
    section2Heading: "",
    section2Content: "",
    section3Heading: "",
    section3Subheading: "",
    section3Points: [],
    section3Conclusion: "",
    section4Heading: "",
    section4Subheading: "",
    section4Points: [],
    section4Conclusion: "",
    section5Heading: "",
    section5Subheading: "",
    section5Points: [],
    section5Conclusion: "",
    section6Heading: "",
    section6Subheading: "",
    section6Points: [],
    section6Conclusion: "",
    section7Heading: "",
    section7Subheading: "",
    section7Points: [],
    section7Conclusion: "",
    section8Heading: "",
    section8Subheading: "",
    section8Content: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    faqs: [],
  });

  // console.log("form data",formData.faqs);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  useEffect(() => {
    if (isEditing && initialData) {
      const serviceData = JSON.parse(initialData.blog_data_raw);

      const parsedData = {
        image: initialData.image || "",
        thumnailimage: serviceData.thumnailimage,
        heading: initialData.heading || "",
        section1Title2: serviceData.section1Title2 || "",
        section1Content: initialData.section1Content || "",
        section1Title21: serviceData.section1Title21 || "",
        section1Content21: serviceData.section1Content21 || "",
        section1Title22: serviceData.section1Title22 || "",
        section1Content22: serviceData.section1Content22 || "",
        section2Heading: serviceData.section2Heading || "",
        section2Content: serviceData.section2Content || "",
        section3Heading: serviceData.section3Heading || "",
        section3Subheading: serviceData.section3Subheading || "",
        section3Points: serviceData.section3Points || [],
        section3Conclusion: serviceData.section3Conclusion || "",
        section4Heading: serviceData.section4Heading || "",
        section4Subheading: serviceData.section4Subheading || "",
        section4Points: serviceData.section4Points || [],
        section4Conclusion: serviceData.section4Conclusion || "",
        section5Heading: serviceData.section5Heading || "",
        section5Subheading: serviceData.section5Subheading || "",
        section5Points: serviceData.section5Points || [],
        section5Conclusion: serviceData.section5Conclusion || "",
        section6Heading: serviceData.section6Heading || "",
        section6Subheading: serviceData.section6Subheading || "",
        section6Points: serviceData.section6Points || [],
        section6Conclusion: serviceData.section6Conclusion || "",
        section7Heading: serviceData.section7Heading || "",
        section7Subheading: serviceData.section7Subheading || "",
        section7Points: serviceData.section7Points || [],
        section7Conclusion: serviceData.section7Conclusion || "",
        section8Heading: serviceData.section8Heading || "",
        section8Subheading: serviceData.section8Subheading || "",
        section8Content: serviceData.section8Content || "",
        metaTitle: initialData.meta_title || "",
        metaDescription: initialData.meta_description || "",
        slug: initialData.slug || "",
        faqs: serviceData.faqs || [],
      };

      setFormData(parsedData);

      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayFieldItem = (field, defaultValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayFieldItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile, thumbnailFile });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Service Page" : "Create New Service Page"}
        </h1>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Section 1 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 1 - Main Content
            </h2>

            {/* Image Upload */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-gray-300 p-5 text-gray-600 mt-2 hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer border border-gray-300 rounded-md px-4 py-3 inline-block hover:bg-gray-100 transition-colors"
                  >
                    {imageFile ? imageFile.name : "Choose an image"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    {imageFile ? "Click to change image" : "Or enter URL below"}
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
            </div>
            {/* Thumbnail image upload */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail Image
              </label>
              <div className="flex items-center gap-4">
                {thumbnailPreview ? (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : formData.thumnailimage ? (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={formData.thumnailimage}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="border-gray-300 p-5 text-gray-600 mt-2 hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer border border-gray-300 rounded-md px-4 py-3 inline-block hover:bg-gray-100 transition-colors"
                  >
                    {thumbnailFile
                      ? thumbnailFile.name
                      : "Choose a thumbnail image"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    {thumbnailFile
                      ? "Click to change image"
                      : "Or enter URL below"}
                  </p>
                  <Input
                    name="thumnailimage"
                    value={formData.thumnailimage}
                    onChange={handleChange}
                    placeholder="Or enter thumbnail image URL"
                    className="border-gray-300 p-3 mt-2"
                  />
                </div>
              </div>
              {errors.thumnailimage && (
                <p className="text-sm text-red-500">{errors.thumnailimage}</p>
              )}
            </div>

            {/* Main Title */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Main Title (H1)
              </label>
              <Input
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Enter main service title"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.heading && (
                <p className="text-sm text-red-500">{errors.heading}</p>
              )}
            </div>

            {/* Title 2 */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Catchy Heading (Title 2)
              </label>
              <Input
                name="section1Title2"
                value={formData.section1Title2}
                onChange={handleChange}
                placeholder="Enter catchy heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section1Title2 && (
                <p className="text-sm text-red-500">{errors.section1Title2}</p>
              )}
            </div>

            {/* Content Part */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content for Title 2
              </label>
              <Textarea
                name="section1Content"
                value={formData.section1Content}
                onChange={handleChange}
                placeholder="Enter content for the catchy heading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.section1Content && (
                <p className="text-sm text-red-500">{errors.section1Content}</p>
              )}
            </div>

            {/* Optional Title 2.1 */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Optional Subheading (Title 2.1)
              </label>
              <Input
                name="section1Title21"
                value={formData.section1Title21}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section1Title21 && (
                <p className="text-sm text-red-500">{errors.section1Title21}</p>
              )}
            </div>

            {/* Content for Title 2.1 */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content for Optional Subheading
              </label>
              <Textarea
                name="section1Content21"
                value={formData.section1Content21}
                onChange={handleChange}
                placeholder="Enter content for the optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.section1Content21 && (
                <p className="text-sm text-red-500">
                  {errors.section1Content21}
                </p>
              )}
            </div>

            {/* Optional Title 2.2 */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Optional Subheading (Title 2.2)
              </label>
              <Input
                name="section1Title22"
                value={formData.section1Title22}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section1Title22 && (
                <p className="text-sm text-red-500">{errors.section1Title22}</p>
              )}
            </div>

            {/* Content for Title 2.2 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content for Optional Subheading
              </label>
              <Textarea
                name="section1Content22"
                value={formData.section1Content22}
                onChange={handleChange}
                placeholder="Enter content for the optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.section1Content22 && (
                <p className="text-sm text-red-500">
                  {errors.section1Content22}
                </p>
              )}
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 2 - Engagement Area
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section2Heading"
                value={formData.section2Heading}
                onChange={handleChange}
                placeholder="Enter section heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section2Heading && (
                <p className="text-sm text-red-500">{errors.section2Heading}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content (Optional)
              </label>
              <Textarea
                name="section2Content"
                value={formData.section2Content}
                onChange={handleChange}
                placeholder="Enter optional content for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.section2Content && (
                <p className="text-sm text-red-500">{errors.section2Content}</p>
              )}
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 3 - Points Section
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section3Heading"
                value={formData.section3Heading}
                onChange={handleChange}
                placeholder="Enter section heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section3Heading && (
                <p className="text-sm text-red-500">{errors.section3Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section3Subheading"
                value={formData.section3Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section3Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section3Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading Content
              </label>
              <Textarea
                name="section3SubheadingContent"
                value={formData.section3SubheadingContent}
                onChange={handleChange}
                placeholder="Enter content related to subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section3SubheadingContent && (
                <p className="text-sm text-red-500">
                  {errors.section3SubheadingContent}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              {formData.section3Points.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "section3Points",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Enter point ${index + 1}`}
                    className="flex-1 border-gray-300 p-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayFieldItem("section3Points", index)
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayFieldItem("section3Points")}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Point
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Conclusion Content
              </label>
              <Textarea
                name="section3Conclusion"
                value={formData.section3Conclusion}
                onChange={handleChange}
                placeholder="Enter conclusion for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section3Conclusion && (
                <p className="text-sm text-red-500">
                  {errors.section3Conclusion}
                </p>
              )}
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 4 - Points Section
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section4Heading"
                value={formData.section4Heading}
                onChange={handleChange}
                placeholder="Enter section heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section4Heading && (
                <p className="text-sm text-red-500">{errors.section4Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section4Subheading"
                value={formData.section4Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section4Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section4Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading Content
              </label>
              <Textarea
                name="section4SubheadingContent"
                value={formData.section4SubheadingContent}
                onChange={handleChange}
                placeholder="Enter content related to subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section4SubheadingContent && (
                <p className="text-sm text-red-500">
                  {errors.section4SubheadingContent}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              {formData.section4Points.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "section4Points",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Enter point ${index + 1}`}
                    className="flex-1 border-gray-300 p-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayFieldItem("section4Points", index)
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayFieldItem("section4Points")}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Point
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Conclusion Content
              </label>
              <Textarea
                name="section4Conclusion"
                value={formData.section4Conclusion}
                onChange={handleChange}
                placeholder="Enter conclusion for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section4Conclusion && (
                <p className="text-sm text-red-500">
                  {errors.section4Conclusion}
                </p>
              )}
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 5 - Points Section
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section5Heading"
                value={formData.section5Heading}
                onChange={handleChange}
                placeholder="Enter section heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section5Heading && (
                <p className="text-sm text-red-500">{errors.section5Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section5Subheading"
                value={formData.section5Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section5Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section5Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading Content
              </label>
              <Textarea
                name="section5SubheadingContent"
                value={formData.section5SubheadingContent}
                onChange={handleChange}
                placeholder="Enter content related to subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section5SubheadingContent && (
                <p className="text-sm text-red-500">
                  {errors.section5SubheadingContent}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Points
              </label>
              {formData.section5Points.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "section5Points",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Enter point ${index + 1}`}
                    className="flex-1 border-gray-300 p-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayFieldItem("section5Points", index)
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayFieldItem("section5Points")}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Point
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Conclusion Content
              </label>
              <Textarea
                name="section5Conclusion"
                value={formData.section5Conclusion}
                onChange={handleChange}
                placeholder="Enter conclusion for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section5Conclusion && (
                <p className="text-sm text-red-500">
                  {errors.section5Conclusion}
                </p>
              )}
            </div>
          </div>

          {/* Section 6 (Optional) */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 6 - Optional Points Section
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section6Heading"
                value={formData.section6Heading}
                onChange={handleChange}
                placeholder="Enter section heading (optional)"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section6Heading && (
                <p className="text-sm text-red-500">{errors.section6Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section6Subheading"
                value={formData.section6Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section6Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section6Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading Content
              </label>
              <Textarea
                name="section6SubheadingContent"
                value={formData.section6SubheadingContent}
                onChange={handleChange}
                placeholder="Enter content related to subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section6SubheadingContent && (
                <p className="text-sm text-red-500">
                  {errors.section6SubheadingContent}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Points (Optional)
              </label>
              {formData.section6Points.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "section6Points",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Enter point ${index + 1}`}
                    className="flex-1 border-gray-300 p-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayFieldItem("section6Points", index)
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayFieldItem("section6Points")}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Point
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Conclusion Content
              </label>
              <Textarea
                name="section6Conclusion"
                value={formData.section6Conclusion}
                onChange={handleChange}
                placeholder="Enter conclusion for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section6Conclusion && (
                <p className="text-sm text-red-500">
                  {errors.section6Conclusion}
                </p>
              )}
            </div>
          </div>

          {/* Section 7 (Optional) */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 7 - Technology We Use (Optional)
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section7Heading"
                value={formData.section7Heading}
                onChange={handleChange}
                placeholder="Enter section heading (optional)"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section7Heading && (
                <p className="text-sm text-red-500">{errors.section7Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section7Subheading"
                value={formData.section7Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section7Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section7Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading Content
              </label>
              <Textarea
                name="section7SubheadingContent"
                value={formData.section7SubheadingContent}
                onChange={handleChange}
                placeholder="Enter content related to subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section7SubheadingContent && (
                <p className="text-sm text-red-500">
                  {errors.section7SubheadingContent}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Technologies (Optional)
              </label>
              {formData.section7Points.map((point, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "section7Points",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Enter technology ${index + 1}`}
                    className="flex-1 border-gray-300 p-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayFieldItem("section7Points", index)
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayFieldItem("section7Points")}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Technology
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Conclusion Content
              </label>
              <Textarea
                name="section7Conclusion"
                value={formData.section7Conclusion}
                onChange={handleChange}
                placeholder="Enter conclusion for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.section7Conclusion && (
                <p className="text-sm text-red-500">
                  {errors.section7Conclusion}
                </p>
              )}
            </div>
          </div>

          {/* Section 8 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 8 - Connecting With Us
            </h2>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Section Heading (H2)
              </label>
              <Input
                name="section8Heading"
                value={formData.section8Heading}
                onChange={handleChange}
                placeholder="Enter section heading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section8Heading && (
                <p className="text-sm text-red-500">{errors.section8Heading}</p>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subheading (Optional)
              </label>
              <Input
                name="section8Subheading"
                value={formData.section8Subheading}
                onChange={handleChange}
                placeholder="Enter optional subheading"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.section8Subheading && (
                <p className="text-sm text-red-500">
                  {errors.section8Subheading}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                name="section8Content"
                value={formData.section8Content}
                onChange={handleChange}
                placeholder="Enter content for this section"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.section8Content && (
                <p className="text-sm text-red-500">{errors.section8Content}</p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Button Text
              </label>
              <Input
                name="ctaButtonText"
                value={formData.ctaButtonText}
                onChange={handleChange}
                placeholder="e.g., Contact Us Now"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Add common questions and answers about your service
            </p>

            {formData.faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">FAQ {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeArrayFieldItem("faqs", index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <Input
                      value={faq.q || ""}
                      onChange={(e) => {
                        const updatedFaqs = [...formData.faqs];
                        updatedFaqs[index] = {
                          ...updatedFaqs[index],
                          q: e.target.value,
                        };
                        setFormData((prev) => ({ ...prev, faqs: updatedFaqs }));
                      }}
                      placeholder="e.g., What document types can your AI handle?"
                      className="border-gray-300 p-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer
                    </label>
                    <Textarea
                      value={faq.a || ""}
                      onChange={(e) => {
                        const updatedFaqs = [...formData.faqs];
                        updatedFaqs[index] = {
                          ...updatedFaqs[index],
                          a: e.target.value,
                        };
                        setFormData((prev) => ({ ...prev, faqs: updatedFaqs }));
                      }}
                      placeholder="e.g., We support scanned PDFs, emails, Word files, and structured/unstructured data formats."
                      className="border-gray-300 p-3 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayFieldItem("faqs", { q: "", a: "" })}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add FAQ
            </Button>
          </div>

          {/* SEO Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">SEO Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <Input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO-friendly title (50-60 characters)"
                  className="border-gray-300 p-4"
                />
                {errors.metaTitle && (
                  <p className="text-sm text-red-500">{errors.metaTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <Textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO-friendly description (150-160 characters)"
                  className="min-h-[100px] border-gray-300 p-4"
                />
                {errors.metaDescription && (
                  <p className="text-sm text-red-500">
                    {errors.metaDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL identifier)
                </label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="service-page-url"
                  className="border-gray-300 p-4"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug}</p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              size="lg"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting
                ? "Processing..."
                : isEditing
                ? "Update Page"
                : "Create Page"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
