export type Product = {
  id: string;
  type: string;
  sku: string;
  name: string;
  published: string;
  featured: string;
  visible: string;
  shortDescription: string;
  description: string;
  saleStartDate: string;
  saleEndDate: string;
  taxStatus: string;
  taxClass: string;
  inStock: string;
  stock: string;
  lowStockAmount: string;
  backorderAllowed: string;
  soldIndividually: string;
  weightInKg: string;
  lengthInCm: string;
  widthInCm: string;
  heightInCm: string;
  allowCustomerReview: string;
  purchaseNote: string;
  salePrice: string;
  regularPrice: number;
  categories: string;
  tags: string;
  shippingClass: string;
  images: string[];
  downloadLimit: string;
  downloadExpiryDays: string;
  parent: string;
  groupedProducts: string;
  upsells: string;
  crossSells: string;
  externalURL: string;
  buttonText: string;
  position: string;
  attribute_1_name: string;
  attribute_1_values: string;
  attribute_1_visible: string;
  attribute_1_global: string;
  meta_et_pb_post_hide_nav: string;
  meta_et_pb_page_layout: string;
  meta_et_pb_side_nav: string;
  meta_et_pb_use_builder: string;
  meta_et_pb_first_image: string;
  meta_et_pb_truncate_post: string;
  meta_et_pb_truncate_post_date: string;
  meta_et_pb_old_content: string;
  attribute_1_default: string;
  attribute_2_name: string;
  attribute_2_values: string;
  attribute_2_visible: string;
  attribute_2_global: string;
  attribute_2_default: string;
  attribute_3_name: string;
  attribute_3_values: string;
  attribute_3_visible: string;
  attribute_3_global: string;
  attribute_3_default: string;
};

export type ProductMap = {
  [key: string]: Product;
};

export type CreateProductElementProps = {
  product: Product;
};

export type SetupProductsProps = {
  container: HTMLElement;
  onDecreaseClick: Function;
  onIncreaseClick: Function;
};

export type UpdateCountProps = {
  productId: string;
  count: number;
};

export type GetProductByIdProps = {
  productId: string;
};
