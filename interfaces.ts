import { CSSProperties, ReactNode } from "react";
import { ToastOptions } from "react-toastify";
export interface IListingAction {
  name: string;
  onClick: () => void;
  icon: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  sale?: boolean;
}

export interface IListingTable {
  style?: Object;
  children: ReactNode;
  actions?: IListingAction[];
  selectedRows?: string[];
  setSelectedRows?: (value: string[]) => void;
  totalPages?: number;
  sortData?: {
    key: string;
    order: "asc" | "desc";
  };
  setSortData?: (value: { key: string; order: "asc" | "desc" }) => void;
  headerItems: {
    key: string;
    name: string;
    hasImage?: boolean;
    style?: CSSProperties;
  }[];
  data: any[];
  onAdd?: () => void;
  isFetchingData?: boolean;
  isStale?: boolean;
  noCheckbox?: boolean;
}
export interface IListingTabs {
  tabs: {
    name: string;
    number: number;
  }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export interface IInput {
  name: string;
  label: string;
  id?: string;
  value?: string;
  type?: string;
  error?: string;
  onChange?: (e: any) => void;
  autoFocus?: boolean;
  required?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}
export interface IOption {
  value: any;
  label: string;
}
export interface ISelect {
  placeholder?: string;
  options: IOption[];
  value?: IOption | IOption[] | null;
  onChange?: (newValue: any) => void;
  label: string;
  isMulti?: boolean;
  disabled?: boolean;
}
export interface IDashboardLayout {
  children: ReactNode;
  links: ILinks[];
}
export interface ILinks {
  label: string;
  children: {
    href: string;
    label: string;
    icon: ReactNode;
    preloadLink?: string;
  }[];
}
export interface ITextArea {
  help?: string;
  example?: string;
  label?: string;
  id?: string;
  error?: boolean;
  type?: string;
  secure?: boolean;
  style?: CSSProperties;
  defaultOptions?: string;
  prefix?: string;
  isRtl?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  [x: string]: any;
}
export interface UseActionParams<TArgs = any, TData = any> {
  promise: (args: TArgs, signal?: AbortSignal) => Promise<{ data: TData }>;
  successMessage?: string;
  errorMessage?: string;
  mutatePath?: string;
  goBack?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  logError?: (error: Error) => void;
  retryCount?: number;
  successToastOptions?: ToastOptions;
  errorToastOptions?: ToastOptions;
  needsConfirmation?: boolean;
}
export interface SWROptions {
  keepPreviousData?: boolean;
  [key: string]: any;
}
