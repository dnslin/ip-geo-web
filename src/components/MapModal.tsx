import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: string;
  longitude: string;
}

export function MapModal({
  isOpen,
  onClose,
  latitude,
  longitude,
}: MapModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl transform transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-xl font-semibold">
                  地理位置
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative w-full h-[500px] rounded-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                <iframe
                  title="位置地图"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  className="bg-gray-50 dark:bg-gray-900"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    Number(longitude) - 0.01
                  },${Number(latitude) - 0.01},${Number(longitude) + 0.01},${
                    Number(latitude) + 0.01
                  }&layer=mapnik&marker=${latitude},${longitude}`}
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  在 OpenStreetMap 中查看
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  关闭
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
