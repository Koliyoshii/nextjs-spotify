import React from "react";
import { useRecoilState } from 'recoil';
import { isOnlyAccessibleToPremium } from "../../atoms/errorModalAtom";

function ErrorModal() {
    const [showModal, setShowModal] = useRecoilState(isOnlyAccessibleToPremium);

  return (
    <div className="sticky bottom-[7rem] max-w-lg m-auto">
      <div
        className="m-b p-4 mb-4 text-sm text-red-700 bg-gray-100 rounded-lg dark:bg-gray-200 dark:text-red-800"
        role="alert"
      >
        <p>
          <span className=" font-bold">Hinweis!</span> Der eingeloggte Account
          ist kein Spotify Premium Account. Einige Funktionen werden nicht
          unterstützt.
        </p>
        <p onClick={() => setShowModal(false) } className="font-bold underline cursor-pointer">Verstanden</p>
      </div>
    </div>
  );
}

export default ErrorModal;
