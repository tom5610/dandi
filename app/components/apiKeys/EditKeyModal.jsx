import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EditKeyModal({ isOpen, onClose, onSubmit, apiKey }) {
  const [editKeyName, setEditKeyName] = useState('');

  useEffect(() => {
    if (apiKey) {
      setEditKeyName(apiKey.name);
    }
  }, [apiKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: editKeyName });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit API key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="editKeyName">Key Name</Label>
              <Input
                id="editKeyName"
                value={editKeyName}
                onChange={(e) => setEditKeyName(e.target.value)}
                placeholder="Key Name"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 