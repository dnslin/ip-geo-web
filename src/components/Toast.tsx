import { Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({ message, isOpen, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>
    </Transition>
  );
}
