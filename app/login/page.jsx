import { Login } from "@/_pages/login/login-data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AcountLogin = async () => {
  let all_cookies = cookies();
  let customer_token = await all_cookies.get("customer_token")?.value;

  switch (true) {
    case !customer_token?.includes("web"):
      return <Login />;
    default:
      redirect("/nalog");
  }
};

export default AcountLogin;

export const metadata = {
  title: "Login | Fashion Template",
  description: "Fashion Template",
  robots: {
    index: false,
    follow: false,
  },
};
