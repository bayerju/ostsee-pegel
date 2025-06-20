import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";

export function ActivationWarningDialog({
  isOpen,
  onOpenChange,
  onActivate,
  mutationIsPending,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onActivate: () => void;
  mutationIsPending: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aktivierung</DialogTitle>
          <DialogDescription>
            Durch das aktivieren dieser Form der Benachrichtigung, werden alle
            anderen Formen deaktiviert.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onActivate} disabled={mutationIsPending}>
            Aktivieren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
