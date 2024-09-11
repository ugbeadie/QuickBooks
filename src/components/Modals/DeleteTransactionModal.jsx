export const DeleteTransactionModal = ({
  showDeleteTransactionModal,
  onClose,
  children,
}) => {
  if (!showDeleteTransactionModal) return null;
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all duration-700${
        showDeleteTransactionModal ? "visible bg-black/10" : "invisible"
      }`}
    >
      <div
        className={`bg-white rounded-xl relative shadow p-6 transition-all${
          showDeleteTransactionModal
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
