export type FlashDesign = {
  id: string;
  price: number;
  src: string;
};

export type FlashContext = {
  flashId: string | null;
  flashPrice: number | null;
  flashImageUrl: string | null;
};
