import { Login } from "@/_pages/login/login-data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/_pages/account/sidebar";
import { AccountData } from "@/_pages/account/account-data";
import { Account } from "@/_pages/account/account";

const Nalog = async () => {
  let all_cookies = cookies();
  let customer_token = await all_cookies.get("customer_token")?.value;

  switch (true) {
    case customer_token?.includes("web"):
      return <Account />;
    default:
      redirect("/login");
  }
};

export default Nalog;

export const metadata = {
  title: "Nalog | Fashion Template",
  description: "Fashion Template",
  robots: {
    index: false,
    follow: false,
  },
};
