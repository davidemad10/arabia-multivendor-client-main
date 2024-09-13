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
    image:string;
    slug:string;
    is_featured:boolean;
    lft:number;
    rght:number;
    tree_id:number;
    level:number;
    parent:number;

    
}

