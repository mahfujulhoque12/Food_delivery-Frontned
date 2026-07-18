export const objectToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = "",
): FormData => {
  Object.entries(obj).forEach(([key, value]) => {
    const fieldName = parentKey ? `${parentKey}.${key}` : key;

    if (value === null || value === undefined) return;

    if (value instanceof File) {
      formData.append(fieldName, value);
    } else if (
      typeof value === "object" &&
      !(value instanceof Date) &&
      !Array.isArray(value)
    ) {
      objectToFormData(value, formData, fieldName);
    } else {
      formData.append(fieldName, String(value));
    }
  });

  return formData;
};
