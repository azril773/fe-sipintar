"use client";

import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { toast } from "react-toastify";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  title: string;
  message: string;
  type: NotificationType;
  closeToast?: () => void;
}

export const Notification = ({
  title,
  message,
  type,
  closeToast,
}: NotificationProps) => {
  const iconConfig = {
    success: {
      Icon: CheckCircleIcon,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    error: {
      Icon: XCircleIcon,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/30",
    },
    warning: {
      Icon: ExclamationCircleIcon,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    info: {
      Icon: InformationCircleIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
  };

  const config = iconConfig[type];

  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-zinc-700">
      <div className={`flex items-start gap-3 p-4 ${config.bgColor}`}>
        <div className="shrink-0 flex-none pt-0.5">
          <config.Icon aria-hidden="true" className={`h-6 w-6 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>

        {closeToast && (
          <button
            type="button"
            onClick={closeToast}
            className="shrink-0 inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
          >
            <span className="sr-only">Tutup</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
  return (
    <button
      type="button"
      onClick={closeToast}
      className="inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
    >
      <span className="sr-only">Tutup</span>
      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
};
