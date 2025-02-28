import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLayoutStore, useLocationStore, useUserStore } from "../store/module";
import { resolution } from "../utils/layout";
import Icon from "./Icon";
import showDailyReviewDialog from "./DailyReviewDialog";
import showResourcesDialog from "./ResourcesDialog";
import showSettingDialog from "./SettingDialog";
import showAskAIDialog from "./AskAIDialog";
import showArchivedMemoDialog from "./ArchivedMemoDialog";
import UserBanner from "./UserBanner";

const Header = () => {
  const { t } = useTranslation();
  const userStore = useUserStore();
  const locationStore = useLocationStore();
  const layoutStore = useLayoutStore();
  const showHeader = layoutStore.state.showHeader;

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < resolution.sm) {
        layoutStore.setHeaderStatus(false);
      } else {
        layoutStore.setHeaderStatus(true);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
  }, []);

  return (
    <div
      className={`fixed sm:sticky top-0 left-0 w-full sm:w-56 h-full flex-shrink-0 pointer-events-none sm:pointer-events-auto z-10 ${
        showHeader && "pointer-events-auto"
      }`}
    >
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none transition-opacity duration-300 sm:!hidden ${
          showHeader && "opacity-60 pointer-events-auto"
        }`}
        onClick={() => layoutStore.setHeaderStatus(false)}
      ></div>
      <header
        className={`relative w-56 sm:w-full h-full max-h-screen overflow-auto hide-scrollbar flex flex-col justify-start items-start py-4 z-30 bg-white dark:bg-zinc-800 sm:bg-transparent sm:shadow-none transition-all duration-300 -translate-x-full sm:translate-x-0 ${
          showHeader && "translate-x-0 shadow-2xl"
        }`}
      >
        <UserBanner />
        <div className="w-full px-2 py-2 flex flex-col justify-start items-start shrink-0 space-y-2">
          <Link
            to="/"
            className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
            onClick={() => locationStore.clearQuery()}
          >
            <Icon.Home className="mr-4 w-6 h-auto opacity-80" /> {t("common.home")}
          </Link>
          <button
            className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
            onClick={() => showDailyReviewDialog()}
          >
            <Icon.Calendar className="mr-4 w-6 h-auto opacity-80" /> {t("common.daily-review")}
          </button>
          <Link
            to="/explore"
            className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
          >
            <Icon.Hash className="mr-4 w-6 h-auto opacity-80" /> {t("common.explore")}
          </Link>
          {!userStore.isVisitorMode() && (
            <>
              <button
                className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
                onClick={() => showAskAIDialog()}
              >
                <Icon.Bot className="mr-4 w-6 h-auto opacity-80" /> Ask AI
              </button>
              <button
                className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
                onClick={() => showResourcesDialog()}
              >
                <Icon.Paperclip className="mr-4 w-6 h-auto opacity-80" /> {t("common.resources")}
              </button>
              <button
                className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
                onClick={() => showArchivedMemoDialog()}
              >
                <Icon.Archive className="mr-4 w-6 h-auto opacity-80" /> {t("common.archived")}
              </button>
              <button
                className="px-4 pr-5 py-2 rounded-lg flex flex-row items-center text-lg dark:text-gray-200 hover:bg-white hover:shadow dark:hover:bg-zinc-700"
                onClick={() => showSettingDialog()}
              >
                <Icon.Settings className="mr-4 w-6 h-auto opacity-80" /> {t("common.settings")}
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
