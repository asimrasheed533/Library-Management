"use client";

import Link from "next/link";
import ListingTable from "@/components/ListingTable";
import { usePathname } from "next/navigation";
import useQuery from "@/hooks/useQuery";
import dayjs from "dayjs";
import { SyncLoader } from "react-spinners";
import { Book } from "@/constant/types";
import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import ClickAwayListener from "react-click-away-listener";
import axios from "axios";
import { mutate } from "swr";

const headerItems = [
  {
    key: "name",
    name: "Book Name",
  },
  { key: "picture", name: "Picture" },
  { key: "pdf", name: "PDF" },
  { key: "author", name: "Author Name" },
  { key: "createdAt", name: "Created At" },
  { key: "price", name: "Price" },
  { key: "action", name: "Action" },
];

export default function Books() {
  const { data, isLoading } = useQuery<Book[]>("/api/books");
  console.log("data", data);

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
          data?.map((item) => <BookEntry key={item.id} item={item} />)
        )}
      </ListingTable>
    </div>
  );
}

function BookEntry({ item }: { item: Book }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    try {
      startTransition(async () => {
        const res = await axios.delete(`/api/books/${id}`);
        if (res.status === 200) {
          mutate("/api/books");
          setIsDeleteModalOpen(false);
        }
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
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
          onClick={(e) => {
            e.stopPropagation();
          }}
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
        {dayjs(item.createdAt).format("DD/MM/YYYY hh:mm A")}
      </div>
      <div className="listing__page__table__content__row__entry">
        $ {item.price || "N/A"}
      </div>
      <div className="listing__page__table__content__row__entry">
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
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
            className="lucide lucide-trash2-icon lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1={10} x2={10} y1={11} y2={17} />
            <line x1={14} x2={14} y1={11} y2={17} />
          </svg>
        </button>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        bookName={item.name}
        onClose={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDeleteModalOpen(false);
        }}
        onDelete={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          e.stopPropagation();
          handleDelete(item.id);
        }}
        isDeleting={pending}
      />
    </Link>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  bookName: string;
  onClose: (e: any) => void;
  onDelete: (e: any) => void;
  isDeleting?: boolean;
}

function DeleteModal({
  isOpen,
  bookName,
  onClose,
  onDelete,
  isDeleting = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <ClickAwayListener onClickAway={onClose}>
        <div
          style={{
            backgroundColor: "rgb(42, 42, 42)",
            borderRadius: "8px",
            padding: "24px",
            width: "400px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            color: "white",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Delete Confirmation
          </h2>
          <p style={{ margin: 0 }}>
            Are you sure you want to delete <strong>"{bookName}"</strong>? This
            action cannot be undone.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <button
              onClick={onClose}
              disabled={isDeleting}
              style={{
                padding: "8px 16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
                cursor: isDeleting ? "not-allowed" : "pointer",
                color: "#333",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: isDeleting ? "not-allowed" : "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {isDeleting && <SyncLoader color="#fff" size={8} margin={2} />}
              {!isDeleting && "Delete"}
            </button>
          </div>
        </div>
      </ClickAwayListener>
    </div>,
    document.body
  );
}
