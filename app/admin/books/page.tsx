"use client";

import Link from "next/link";
import ListingTabs from "@/components/ListingTabs";
import ListingTable from "@/components/ListingTable";
import { usePathname } from "next/navigation";
import useQuery from "@/hooks/useQuery";
import dayjs from "dayjs";
import { SyncLoader } from "react-spinners";
import { Book } from "@/constant/types";

const headerItems = [
  {
    key: "name",
    name: "Book Name",
  },
  { key: "picture", name: "Picture" },
  { key: "pdf", name: "PDF" },
  { key: "author", name: "Author Name" },
  { key: "createdAt", name: "Created At" },
];

export default function Books() {
  const { data, isLoading } = useQuery<Book[]>("/api/books");

  const pathname = usePathname();
  return (
    <div className="listing__page">
      <div className="listing__page__header">
        <div className="listing__page__header__actions">
          <Link
            href={pathname + "/add"}
            className="listing__page__header__actions__button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00033 13.3307C7.57954 13.3307 7.23842 12.9896 7.23842 12.5688V8.7593H3.4289C3.00811 8.7593 2.66699 8.41818 2.66699 7.9974C2.66699 7.57661 3.00811 7.23549 3.4289 7.23549H7.23842V3.42597C7.23842 3.00518 7.57954 2.66406 8.00033 2.66406C8.42111 2.66406 8.76223 3.00518 8.76223 3.42597V7.23549H12.5718C12.9925 7.23549 13.3337 7.57661 13.3337 7.9974C13.3337 8.41818 12.9925 8.7593 12.5718 8.7593H8.76223V12.5688C8.76223 12.9896 8.42111 13.3307 8.00033 13.3307Z"
                fill="currentColor"
              />
            </svg>
            Add Book
          </Link>
        </div>
      </div>
      <ListingTable data={[]} headerItems={headerItems}>
        {isLoading ? (
          <div className="listing__page__table__loading">
            <SyncLoader color="#FFD700" />
          </div>
        ) : data?.length === 0 ? (
          <div className="listing__page__table__loading">
            <p>No books found.</p>
          </div>
        ) : (
          data?.map((item) => (
            <Link
              href={`/admin/books/edit?id=${item.id}`}
              className="listing__page__table__content__row"
              key={item.id}
            >
              <div className="listing__page__table__content__row__entry">
                {item.name}
              </div>
              <div className="listing__page__table__content__row__entry">
                <img
                  className="listing__page__table__content__row__entry__img"
                  src={item.imagePath}
                  alt={item.author}
                />
              </div>
              <div className="listing__page__table__content__row__entry">
                <a
                  href={item.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="listing__page__table__content__row__entry__pdf"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-file-text-icon lucide-file-text"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  Download PDF
                </a>
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.author}
              </div>
              <div className="listing__page__table__content__row__entry">
                {dayjs(item.createdAt).format("DD/MM/YYYY")}
              </div>
            </Link>
          ))
        )}
      </ListingTable>
    </div>
  );
}
