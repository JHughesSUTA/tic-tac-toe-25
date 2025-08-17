import { createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  resetModalRef: React.RefObject<HTMLDialogElement | null>;
  toggleResetModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const resetModalRef = useRef<HTMLDialogElement>(null);

  const toggleResetModal = () => {
    if (!resetModalRef.current) return;
    if (resetModalRef.current.open) {
      resetModalRef.current.close();
    } else {
      resetModalRef.current.showModal();
    }
  };

  return (
    <ModalContext.Provider value={{ resetModalRef, toggleResetModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
