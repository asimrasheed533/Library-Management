import "@/style/listing.scss";
import ListingHeaderEntry from "./ListingHeaderEntry";
import { IListingTable } from "@/interfaces";

export default function ListingTable({
  style,
  children,
  sortData,
  setSortData = () => {},
  headerItems,
}: IListingTable) {
  return (
    <div className="listing__page__table" style={style}>
      <div className="listing__page__table__header">
        {headerItems?.map((item) => (
          <ListingHeaderEntry
            key={item.key}
            sortKey={item.key}
            sortData={sortData}
            onSort={(value) => setSortData(value)}
            hasImage={item.hasImage}
            style={item.style}
          >
            {item.name}
          </ListingHeaderEntry>
        ))}
      </div>
      <div className="listing__page__table__scrollable">
        <div className="listing__page__table__content">{children}</div>
      </div>
    </div>
  );
}
