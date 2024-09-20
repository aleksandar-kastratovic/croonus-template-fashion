import { AccountBasicData } from "@/_pages/account/account-data/basic-data";
import { Payments } from "@/_pages/account/account-data/payments";
import { Shippings } from "@/_pages/account/account-data/shippings";
import { PreviousOrders } from "@/_pages/account/account-data/previous-orders";
import { PasswordChange } from "@/_pages/account/account-data/password-change";

export const getActiveScreen = (active_tab) => {
  switch (active_tab) {
    case "basic":
      return <AccountBasicData />;
    case "payments":
      return <Payments />;
    case "shipping":
      return <Shippings />;
    case "orders":
      return <PreviousOrders />;
    case "password-change":
      return <PasswordChange />;
  }
};
