import React, { useEffect, useRef } from "react";

interface Props {
  setShowModal: any;
  setCommentToDelete: any;
  deleteComment: any;
}
function Modal({ setShowModal, setCommentToDelete, deleteComment }: Props) {
  const modalCard = useRef(null);

  useEffect(() => {
    modalCard?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  function cancelClickHandler() {
    setShowModal(false);
    setCommentToDelete(null);
  }

  function deleteClickHandler() {
    setShowModal(false);
    deleteComment();
  }

  return (
    // dark background
    <div className="fixed top-0 left-0 w-full h-full bg-[#000a] z-10 flex items-center justify-center">
      {/* Modal Card */}
      <div
        ref={modalCard}
        className="bg-white rounded-lg p-8 w-[90vw] md:w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-darkBlue">Delete comment</h2>
        <p className="text-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        {/* Buttons container */}
        <div className="flex flex-row w-full gap-6">
          {/* Cancel */}
          <button
            className="py-3 rounded-lg flex-1 font-semibold bg-grayishBlue text-white hover:bg-opacity-50"
            onClick={cancelClickHandler}
          >
            NO, CANCEL
          </button>
          {/* Delete */}
          <button
            className="py-3 rounded-lg flex-1 font-semibold bg-softRed text-white hover:bg-paleRed"
            onClick={deleteClickHandler}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
