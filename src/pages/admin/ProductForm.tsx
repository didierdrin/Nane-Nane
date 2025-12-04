import AdminLayout from "@/components/admin/AdminLayout";
import useProductForm from "@/hooks/useProductForm";
import ProductFormLoading from "@/components/admin/forms/ProductFormLoading";
import ProductFormHeader from "@/components/admin/forms/ProductFormHeader";
import ProductFormBasicFields from "@/components/admin/forms/ProductFormBasicFields";
import ProductFormImageField from "@/components/admin/forms/ProductFormImageField";
import ProductFormContentFields from "@/components/admin/forms/ProductFormContentFields";
import ProductFormActions from "@/components/admin/forms/ProductFormActions";

const ProductForm = () => {
  const {
    formData,
    isEditing,
    isSubmitting,
    isFormLoading,
    isRefreshing,
    validationErrors,
    handleChange,
    handleSelectChange,
    handleRefreshData,
    handleSubmit,
    handleFileChange, // ✅ Added this
    getRandomImageForCategory,
    clearError
  } = useProductForm();

  if (isFormLoading) {
    return <ProductFormLoading />;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ProductFormHeader 
          isEditing={isEditing} 
          isRefreshing={isRefreshing}
          onRefreshData={handleRefreshData}
        />

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductFormBasicFields
              name={formData.name}
              category={formData.category}
              weight={formData.weight}
              price={formData.price}
              tag={formData.tag}
              errors={validationErrors}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
            />

            <div className="space-y-4">
              <ProductFormImageField
                image={formData.image}
                errors={validationErrors}
                onChange={handleChange}
                onFileChange={handleFileChange} // ✅ Now properly passed
                getRandomImage={getRandomImageForCategory}
                category={formData.category}
                onClearErrors={clearError}
              />
              
              <ProductFormContentFields
                description={formData.description}
                whatsappMessage={formData.whatsapp_message}
                errors={validationErrors}
                onChange={handleChange}
              />
            </div>
          </div>

          <ProductFormActions 
            isSubmitting={isSubmitting}
            isEditing={isEditing}
          />
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;

// import AdminLayout from "@/components/admin/AdminLayout";
// import useProductForm from "@/hooks/useProductForm";
// import ProductFormLoading from "@/components/admin/forms/ProductFormLoading";
// import ProductFormHeader from "@/components/admin/forms/ProductFormHeader";
// import ProductFormBasicFields from "@/components/admin/forms/ProductFormBasicFields";
// import ProductFormImageField from "@/components/admin/forms/ProductFormImageField";
// import ProductFormContentFields from "@/components/admin/forms/ProductFormContentFields";
// import ProductFormActions from "@/components/admin/forms/ProductFormActions";

// const ProductForm = () => {
//   const {
//     formData,
//     isEditing,
//     isSubmitting,
//     isFormLoading,
//     isRefreshing,
//     validationErrors,
//     handleChange,
//     handleSelectChange,
//     handleRefreshData,
//     handleSubmit,
//     getRandomImageForCategory,
//     clearError
//   } = useProductForm();

//   if (isFormLoading) {
//     return <ProductFormLoading />;
//   }

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <ProductFormHeader 
//           isEditing={isEditing} 
//           isRefreshing={isRefreshing}
//           onRefreshData={handleRefreshData}
//         />

//         <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <ProductFormBasicFields
//               name={formData.name}
//               category={formData.category}
//               price={formData.price}
//               tag={formData.tag}
//               errors={validationErrors}
//               onChange={handleChange}
//               onSelectChange={handleSelectChange}
//             />

//             <div className="space-y-4">
//               <ProductFormImageField
//                 image={formData.image}
//                 errors={validationErrors}
//                 onChange={handleChange}
//                 onFileChange={handleFileChange}
//                 getRandomImage={getRandomImageForCategory}
//                 category={formData.category}
//                 onClearErrors={clearError}
//               />
              
//               <ProductFormContentFields
//                 description={formData.description}
//                 whatsappMessage={formData.whatsapp_message}
//                 errors={validationErrors}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <ProductFormActions 
//             isSubmitting={isSubmitting}
//             isEditing={isEditing}
//           />
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ProductForm;
