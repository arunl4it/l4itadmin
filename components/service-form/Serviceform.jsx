"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MyFroalaEditor from "@/components/text-editor/Texteditor";
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
    heading: "",
    shortDescriptionHeading: "",
    shortDescription: "",
    aboutServiceHeading: "",
    aboutServiceDescription: "",
    // content: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    keyBenefits: [],
    applications: [],
    // industries: [],
    processSteps: [],
    faqs: [],
    industries: [
      {
        name: "",
        features: [""],
      },
    ],
  });

  // console.log("form data",formData.faqs);
  

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditing && initialData) {
      // console.log(initialData);
      
      const blogData = JSON.parse(initialData.blog_data_raw);
      // console.log("initialData",blogData.keyBenefits);

      const parsedData = {
        image: initialData.image || "",
        heading: initialData.heading || "",
        shortDescriptionHeading: blogData.shortDescriptionHeading || "",
        shortDescription: initialData.short_description || "",
        aboutServiceHeading: blogData.aboutServiceHeading || "",
        aboutServiceDescription: blogData.aboutServiceDescription || "",
        // content: initialData.content || "",
        metaTitle: initialData.meta_title || "",
        metaDescription: initialData.meta_description || "",
        slug: initialData.slug || "",
        keyBenefits: blogData.keyBenefits || [],
        applications: blogData.applications || [],
        industries: blogData.industries || [],
        processSteps: blogData.processSteps || [],
        faqs: blogData.faqs || [],
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

  // const handleContentChange = (content) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     content: content,
  //   }));
  // };

  // Handlers for array fields
  const handleArrayFieldChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayFieldItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
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
    onSubmit({ ...formData, imageFile });
  };

  const handleIndustryNameChange = (index, value) => {
    const updatedIndustries = [...formData.industries];
    updatedIndustries[index].name = value;
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  const handleIndustryFeatureChange = (industryIndex, featureIndex, value) => {
    const updatedIndustries = [...formData.industries];
    updatedIndustries[industryIndex].features[featureIndex] = value;
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  const addIndustry = () => {
    setFormData((prev) => ({
      ...prev,
      industries: [...prev.industries, { name: "", features: [""] }],
    }));
  };

  const removeIndustry = (index) => {
    const updatedIndustries = formData.industries.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  const addIndustryFeature = (industryIndex) => {
    const updatedIndustries = [...formData.industries];
    updatedIndustries[industryIndex].features.push("");
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  const removeIndustryFeature = (industryIndex, featureIndex) => {
    const updatedIndustries = [...formData.industries];
    updatedIndustries[industryIndex].features = updatedIndustries[
      industryIndex
    ].features.filter((_, i) => i !== featureIndex);
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing
            ? "Edit Document Parsing Service"
            : "Create New Document Parsing Service"}
        </h1>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

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

            {/* Service Title */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Service Title
              </label>
              <Input
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Document Parsing AI Solution"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.heading && (
                <p className="text-sm text-red-500">{errors.heading}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Slug (URL identifier)
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="document-parsing-solution"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug}</p>
              )}
            </div>
          </div>

          {/* Short Description Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Short Description</h2>

            {/* Short Description Heading */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Short Description Heading
              </label>
              <Input
                name="shortDescriptionHeading"
                value={formData.shortDescriptionHeading}
                onChange={handleChange}
                placeholder="e.g., Transform Your Document Processing"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.shortDescriptionHeading && (
                <p className="text-sm text-red-500">
                  {errors.shortDescriptionHeading}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Short Description Content
              </label>
              <Textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Briefly describe your document parsing service (1-2 sentences)"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[120px]"
              />
              {errors.shortDescription && (
                <p className="text-sm text-red-500">
                  {errors.shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* About the Service Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About the Service</h2>

            {/* About Service Heading */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                About Service Heading
              </label>
              <Input
                name="aboutServiceHeading"
                value={formData.aboutServiceHeading}
                onChange={handleChange}
                placeholder="e.g., About Our Document Parsing Solution"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.aboutServiceHeading && (
                <p className="text-sm text-red-500">
                  {errors.aboutServiceHeading}
                </p>
              )}
            </div>

            {/* About Service Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                About Service Description
              </label>
              <Textarea
                name="aboutServiceDescription"
                value={formData.aboutServiceDescription}
                onChange={handleChange}
                placeholder="Provide more detailed information about your document parsing service"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[150px]"
              />
              {errors.aboutServiceDescription && (
                <p className="text-sm text-red-500">
                  {errors.aboutServiceDescription}
                </p>
              )}
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
            <p className="text-sm text-gray-500 mb-4">
              List the main benefits of your document parsing service
            </p>

            {formData.keyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <Input
                  value={benefit}
                  onChange={(e) =>
                    handleArrayFieldChange("keyBenefits", index, e.target.value)
                  }
                  placeholder="e.g., Accelerate document processing by 80%"
                  className="flex-1 border-gray-300 p-4"
                />
                <button
                  type="button"
                  onClick={() => removeArrayFieldItem("keyBenefits", index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayFieldItem("keyBenefits")}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add Benefit
            </Button>
          </div>

          {/* Applications Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Where Can Document Parsing Be Applied?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              List industries and use cases for your solution
            </p>

            {formData.applications.map((application, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <Input
                  value={application}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "applications",
                      index,
                      e.target.value
                    )
                  }
                  placeholder="e.g., Finance: Invoice data extraction, tax documentation"
                  className="flex-1 border-gray-300 p-4"
                />
                <button
                  type="button"
                  onClick={() => removeArrayFieldItem("applications", index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayFieldItem("applications")}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add Application
            </Button>
          </div>

          {/* Industries Section */}
          {/* <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Industries We Serve</h2>
            <p className="text-sm text-gray-500 mb-4">
              List the industries your solution targets
            </p>

            {formData.industries.map((industry, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <Input
                  value={industry}
                  onChange={(e) =>
                    handleArrayFieldChange("industries", index, e.target.value)
                  }
                  placeholder="e.g., Healthcare: Automate intake forms and insurance claims"
                  className="flex-1 border-gray-300 p-4"
                />
                <button
                  type="button"
                  onClick={() => removeArrayFieldItem("industries", index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayFieldItem("industries")}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add Industry
            </Button>
          </div> */}

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Industries We Serve</h2>
            <p className="text-sm text-gray-500 mb-4">
              Add industries and their specific features
            </p>

            {formData.industries.map((industry, industryIndex) => (
              <div
                key={industryIndex}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Industry {industryIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeIndustry(industryIndex)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry Name
                    </label>
                    <Input
                      value={industry.name}
                      onChange={(e) =>
                        handleIndustryNameChange(industryIndex, e.target.value)
                      }
                      placeholder="e.g., Healthcare, Finance, Legal"
                      className="border-gray-300 p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry Features
                    </label>
                    {industry.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 mb-2"
                      >
                        <Input
                          value={feature}
                          onChange={(e) =>
                            handleIndustryFeatureChange(
                              industryIndex,
                              featureIndex,
                              e.target.value
                            )
                          }
                          placeholder="e.g., HIPAA-compliant support workflows"
                          className="flex-1 border-gray-300 p-3"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeIndustryFeature(industryIndex, featureIndex)
                          }
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addIndustryFeature(industryIndex)}
                      className="mt-2"
                    >
                      <Plus size={14} className="mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addIndustry}
              className="mt-4"
            >
              <Plus size={16} className="mr-2" />
              Add Industry
            </Button>
          </div>

          {/* Process Steps Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Our Process</h2>
            <p className="text-sm text-gray-500 mb-4">
              Describe your document parsing workflow steps
            </p>

            {formData.processSteps.map((step, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Step {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayFieldItem("processSteps", index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <Textarea
                  value={step}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "processSteps",
                      index,
                      e.target.value
                    )
                  }
                  placeholder="e.g., Document Audit: We identify common document types and formats"
                  className="border-gray-300 p-4 min-h-[80px]"
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayFieldItem("processSteps")}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add Process Step
            </Button>
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
                ? "Update Service"
                : "Create Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
