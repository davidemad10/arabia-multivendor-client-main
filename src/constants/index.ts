export const headerLinks = [
  {
    route: "/",
    label: "الكترونيات",
  },
  {
    route: "proucts",
    label: "موبيلات",
  },
  {
    route: "cart",
    label: "نسائي",
  },
  {
    route: "about-us",
    label: "رجالي",
  },
  {
    route: "aboutي-us",
    label: "بقالة",
  },
];

export const footerLinks = [{}];

export const calculateAverageRating = (reviews) => {
  if (reviews.length == 0) return 0;
  const totalStars = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalStars / reviews.length).toFixed(1).toString(); // Rounds to 1 decimal and converts to string
};
