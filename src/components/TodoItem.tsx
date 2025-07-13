import type { Todo } from "../types/todo";
import { motion } from "framer-motion";
import { useState } from "react";
import { EditModal } from "../components/ui/EditModal";
import editIcon from "../assets/icons/lucide--edit.svg";
import trashIcon from "../assets/icons/lucide--trash.svg";

type Props = {
  readonly todo: Todo;
  readonly onToggle: (id: number) => void;
  readonly onDelete: (id: number) => void;
  readonly onEdit: (id: number, newTitle: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  // เพิ่ม state สำหรับควบคุม EditModal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleToggle = () => {
    setIsChecking(true);

    setTimeout(() => {
      onToggle(todo.id);
      setIsChecking(false);
    }, 400);
  };

  // ตรวจสอบว่าควรแสดง checkbox เป็นแบบเลือกหรือไม่
  const isChecked = isChecking ? !todo.completed : todo.completed;

  return (
    <>
      <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        layout
        transition={{ duration: 0.3 }}
        className={
          todo.completed
            ? "flex items-start justify-between p-3 rounded-xl mb-2"
            : "flex items-start justify-between p-3 rounded-xl mb-2 border border-gray-200 dark:border-gray-600 shadow-md bg-white dark:bg-gray-700"
        }
      >
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="w-6 h-6 flex-shrink-0 mt-0.5 relative cursor-pointer"
            onClick={handleToggle}
          >
            <div
              className={`w-full h-full rounded-full border-2 transition-colors duration-200 ${
                isChecked
                  ? "bg-green-500 border-green-500"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500"
              }`}
            ></div>

            {isChecked && (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}

            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
              className="absolute opacity-0 w-0 h-0"
              aria-label={isChecked ? "Mark as incomplete" : "Mark as complete"}
            />
          </div>

          <span
            className={`break-words ${
              todo.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {todo.title}
          </span>
        </div>
        <div className="flex gap-2 ml-2 flex-shrink-0">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Edit"
            title="Edit"
          >
            <img
              src={editIcon}
              alt="Edit"
              className="w-4 h-4 brightness-0 invert-[47%] sepia-[6%] saturate-[24%] hue-rotate-[314deg] brightness-[98%] contrast-[86%] dark:invert-[87%] dark:sepia-0 dark:saturate-0 dark:hue-rotate-0 dark:brightness-[100%] dark:contrast-[89%]"
            />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Delete"
            title="Delete"
          >
            <img
              src={trashIcon}
              alt="Delete"
              className="w-4 h-4 brightness-0 invert-[47%] sepia-[6%] saturate-[24%] hue-rotate-[314deg] brightness-[98%] contrast-[86%] dark:invert-[87%] dark:sepia-0 dark:saturate-0 dark:hue-rotate-0 dark:brightness-[100%] dark:contrast-[89%]"
            />
          </button>
        </div>
      </motion.li>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(newTitle) => onEdit(todo.id, newTitle)}
        initialValue={todo.title}
        title="Edit todo"
      />
    </>
  );
}
