import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newValue: string) => void;
  initialValue: string;
  title?: string;
};

export function EditModal({
  isOpen,
  onClose,
  onSave,
  initialValue,
  title = "Edit todo",
}: EditModalProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // รีเซ็ตค่าเมื่อ modal เปิดใหม่
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
      // Focus ที่ input เมื่อ modal เปิด
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialValue]);

  // ป้องกันการ scroll เมื่อ modal เปิด
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-lg outline-none transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter todo text..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors font-medium shadow-md flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
