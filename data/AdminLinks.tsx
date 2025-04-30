import GeneralIcon from "@/icons/GeneralIcon";

export default [
  {
    label: "Dashboard",
    href: "/admin",

    children: [
      {
        href: "/admin/products",
        label: "Products",
        icon: <GeneralIcon />,
      },
      {
        href: "/admin/categories",
        label: "Categories",
        icon: <GeneralIcon />,
      },
      {
        href: "/admin/orders",
        label: "Orders",
        icon: <GeneralIcon />,
      },
    ],
  },
];
