import { company_data } from "@/_lib/company_data";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import {
  useBillingAddresses,
  useGetAddress,
  useShippingAddresses,
} from "@/hooks/ecommerce.hooks";

export const getRobots = (robots) => {
  let arr = (robots ?? ",")?.split(",")?.map((i) => i?.trim());
  let follow = true;
  let index = true;

  if (arr?.includes("noindex")) {
    index = false;
  }

  if (arr?.includes("nofollow")) {
    follow = false;
  }

  return {
    index: index,
    follow: follow,
  };
};

export const handleCategoryRobots = (strana, filteri, sort, viewed, robots) => {
  if (!robots) {
    robots = { index: true, follow: true };
  }
  switch (true) {
    case filteri?.length > 0:
      return { index: false, follow: false };
    case sort?.length > 0:
      return { index: false, follow: false };
    case Number(strana) > 1:
      return { index: false, follow: true };
    case viewed > Number(process.env.PAGINATION_LIMIT):
      return { index: false, follow: true };
    default:
      return robots;
  }
};

export const generateProductSchema = (product, product_gallery, canonical) => {
  if (product) {
    const {
      data: {
        item: {
          basic_data: { name, sku },
          price: {
            price: { original, discount },
            discount: { active },
            currency,
          },
          inventory: { inventory_defined },
        },
      },
    } = product;
    const { gallery } = product_gallery;

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: name,
      image: gallery?.[0]?.image,
      sku: sku,
      offers: {
        "@type": "Offer",
        url: canonical,
        priceCurrency: currency?.toUpperCase(),
        price: original,
        availability: inventory_defined
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    };
  }
};

export const generateBreadcrumbSchema = (
  parents = [],
  name = "",
  path,
  base_url
) => {
  let slug_path = path?.join("/");

  let breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          name: "Početna",
          "@id": `${base_url}`,
        },
      },
    ],
  };

  parents?.map((parent, index) => {
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      item: {
        name: `${base_url}/${parent?.slug_path}`,
        "@id": `${base_url}/${parent?.slug_path}`,
      },
    });
  });
  breadcrumb.itemListElement.push({
    "@type": "ListItem",
    position: parents?.length + 2,
    item: {
      name: `${base_url}/${slug_path}`,
      "@id": `${base_url}/${slug_path}`,
    },
  });
  return breadcrumb;
};

export const getCompanyData = (base_url) => {
  let name = process.env["NAME"];
  let phone = process.env["TELEPHONE"];
  let email = process.env["EMAIL"];
  let street_address = process.env["STREET_ADDRESS"];
  let city = process.env["CITY"];
  let postal_code = process.env["POSTAL_CODE"];
  let address_country = process.env["ADDRESS_COUNTRY"];

  return {
    name: name,
    phone: phone,
    email: email,
    street_address: street_address,
    city: city,
    postal_code: postal_code,
    address_country: address_country,
    base_url: base_url,
  };
};

export const generateOrganizationSchema = (base_url) => {
  let { default: default_data, stores } = company_data;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store"],
    name: default_data?.name,
    url: `${base_url}`,
    logo: `${base_url}/logo.png`,
    sameAs: [
      "https://www.instagram.com/stefantekstil.rs/",
      "https://www.facebook.com/STEFAN.DOO.ARILJE",
    ],
    telephone: default_data?.telephone,
    email: default_data?.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: default_data?.street_address,
      addressLocality: default_data?.city,
      postalCode: default_data?.postal_code,
      addressCountry: default_data?.address_country,
    },
    image: `${base_url}/logo.png`,
    branchOf: (stores ?? [])?.map((item) => {
      return {
        "@type": "Store",
        name: item?.name,
        telephone: item?.telephone,
        email: item?.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: item?.street_address,
          addressLocality: item?.city,
          postalCode: item?.postal_code,
          addressCountry: item?.address_country,
        },
        image: `${base_url}/logo.png`,
      };
    }),
  };
};

export const getBillingCartForm = (address_id, loggedIn) => {
  let tmp_form_data = {};

  if (!loggedIn) {
    tmp_form_data.form = {};
    tmp_form_data.all_forms = [];
    return { tmp_form_data };
  } else {
    console.log("ee");
    const { data: billing_addresses } = useBillingAddresses();

    switch (true) {
      case billing_addresses?.length === 1:
        tmp_form_data.form = handleSingleBillingAddress(
          billing_addresses,
          "single",
          null
        );
        break;
      case billing_addresses?.length > 1:
        tmp_form_data.all_forms = billing_addresses;
        tmp_form_data.form = handleSingleBillingAddress(
          billing_addresses,
          "multiple",
          address_id
        );
        break;
    }
    return { tmp_form_data };
  }
};

export const handleSingleBillingAddress = (
  billing_addresses,
  type,
  address_id
) => {
  switch (type) {
    case "single":
      const { id } = billing_addresses?.[0];
      const { data: billing_address_single, isLoading: isLoadingSingle } =
        useGetAddress(id, "billing");
      if (!isLoadingSingle) {
        const formattedDataSingle = (billing_address_single ?? []).map(
          (item) => {
            return Object.keys(item).reduce((acc, key) => {
              acc[`${key}_billing`] = item[key];
              return acc;
            }, {});
          }
        );

        return formattedDataSingle?.[0];
      }
    case "multiple":
      const { data: billing_address_multiple, isLoading: isLoadingMultiple } =
        useGetAddress(address_id, "billing");

      if (!isLoadingMultiple) {
        const formattedDataMultiple = (billing_address_multiple ?? []).map(
          (item) => {
            return Object.keys(item).reduce((acc, key) => {
              acc[`${key}_billing`] = item[key];
              return acc;
            }, {});
          }
        );

        return formattedDataMultiple?.[0];
      }
  }
};
