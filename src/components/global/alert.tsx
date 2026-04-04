import { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ConfirmAlertDialog({
  title,
  isOpen,
  setIsOpen,
  onClick,
}: {
  title: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClick: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    buttonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Enter") {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };
    if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button ref={buttonRef} onClick={onClick}>
            Ya
          </Button>
          <DialogClose asChild onClick={() => setIsOpen(false)}>
            <Button variant="outline">Batalkan</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
