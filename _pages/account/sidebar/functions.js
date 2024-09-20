import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { icons } from "@/_lib/icons";

export const getActiveTab = () => {
  const params = useSearchParams();
  let active_tab = params?.get("tab") || "basic";

  return active_tab;
};

export const useTabChange = () => {
  const router = useRouter();

  const handleTabChange = (tab) => {
    router.push(`?tab=${tab}`);
  };

  return handleTabChange;
};

export const handleClick = (tab, mutate, logout, handleTabChange) => {
  switch (tab) {
    case "logout":
      return mutate().then((r) => {
        switch (r?.code) {
          case 200:
            logout();
            break;
          default:
            console.error(r);
        }
      });
    default:
      return handleTabChange(tab);
  }
};

export const handleButtonText = (isPending, tab, title) => {
  if (tab === "logout") {
    return isPending ? (
      <div className={`flex items-center justify-center`}>
        <span className={`animate-spin`}>{icons?.loading}</span>
      </div>
    ) : (
      title
    );
  }

  return title;
};
