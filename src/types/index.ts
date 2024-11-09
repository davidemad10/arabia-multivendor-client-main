export type TSliderSimpleProps = {
  alt?: string;
  arrows?: boolean;
  className?: string;
  dataTestId?: string;
  dots?: boolean;
  fade?: boolean;
  height?: string;
  images?: string[];
  infinite?: boolean;
  nextArrow?: JSX.Element;
  prevArrow?: JSX.Element;
  slidesToScroll?: number;
  slidesToShow?: number;
  swipeToSlide?: boolean;
  speed?: number;
  width?: string;
};

export interface Slider {
  category: string;
  id: number;
  translations: {
    lang: any;
    en: {
      image: string;
    };
    ar: {
      image: string;
    };
  };
}

export interface Categories {
  id: number;
  translations: {
    en: {
      name: string;
    };
    ar: {
      name: string;
    };
  };
  image: string;
  slug: string;
  is_featured: boolean;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  parent: number;
}

export interface TransitionsModalProps {
  dialogueText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface Product {
  id: number;
  translations: {
    en: {
      name: string;
    };
    ar: {
      name: string;
    };
  };
  image: string;
}
export interface registerUserData {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
}

export interface userCredentials {
  email: string;
  password: string;
}

export interface passwords {
  new_password: string;
  confirm_password: string;
}

export interface confirmResetOTPparams {
  open: boolean;
  setOpen: (open: boolean) => void;
}
