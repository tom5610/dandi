import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteKeyModal({ isOpen, onClose, onConfirm, apiKey }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Delete API Key '{apiKey?.name}'
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-gray-600">
            Are you sure you want to delete this API key? It will be invalidated and you will need to update it in your applications.
          </p>
          <p className="text-gray-600 font-medium">
            This action is irreversible.
          </p>
        </div>
        <DialogFooter className="flex space-x-2 sm:space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onConfirm(apiKey)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 