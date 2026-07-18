"use client";

import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

type DeleteConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
};

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
}: DeleteConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-3xl border border-border-soft bg-bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-soft p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <FiAlertTriangle className="text-xl text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-text-dark">{title}</h2>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 transition hover:bg-bg-main"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="leading-7 text-text-light">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border-soft p-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-border-soft px-5 py-2.5 font-medium text-text-dark transition hover:bg-bg-main"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiTrash2 />

            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
