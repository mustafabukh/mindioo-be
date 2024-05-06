import { Gender, VendorCategory } from "@prisma/client";


export const vendorCategories = {
  "Therapist":VendorCategory.THERAPIST,
  "Healer":VendorCategory.HEALER,
  "Psychiatrist":VendorCategory.PSYCHIATRIST,
  "Cat 4":VendorCategory.CAT4,
  "Cat 5":VendorCategory.CAT5,
  "Cat 6":VendorCategory.CAT6,
}

export const genders = {
  "Male":Gender.MALE,
  "Female":Gender.FEMALE,
  "Non-binary":Gender.NONBINARY,
}
