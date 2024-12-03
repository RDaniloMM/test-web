"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-VioletCalido p-2 mt-2 rounded-md text-WhiteCalido disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Actualizando..." : "Actualizar"}
    </button>
  );
};

export default UpdateButton;
