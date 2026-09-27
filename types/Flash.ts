export type FlashDesign = {
  id: string;
  price: number;
  src?: string;
  b64?: string;
  base64?: string;
  description?: string;
  repeatable?: string;
};

export type FlashContext = {
  flashId: string | null;
  flashPrice: number | null;
  flashImageUrl: string | null;
};
