import ScrollContainer from "react-indiana-drag-scroll";
import clsx from "clsx";
import { IListingTabs } from "@/interfaces";
import { tabColors } from "@/constant/colors";

export default function ListingTabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: IListingTabs) {
  return (
    <ScrollContainer vertical={false} className="listing__page__header__tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.name}
          className={clsx(
            "listing__page__header__tabs__tab",
            selectedTab === tab.name.toLowerCase() && "active"
          )}
          onClick={() => setSelectedTab(tab.name.toLowerCase())}
        >
          <div
            className="listing__page__header__tabs__tab__dot"
            style={{
              backgroundColor:
                tabColors[tab.name.toLowerCase() as keyof typeof tabColors],
            }}
          />
          {tab.name}
          <div className="listing__page__header__tabs__tab__clip">
            {tab.number}
          </div>
        </button>
      ))}
    </ScrollContainer>
  );
}
