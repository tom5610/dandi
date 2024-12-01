import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function CreateKeyModal({ isOpen, onClose, onSubmit }) {
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [limitEnabled, setLimitEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: newKeyName,
      key: `dandi_${Math.random().toString(36).substr(2, 9)}`,
      monthly_limit: limitEnabled ? monthlyLimit : null,
    });
    setNewKeyName('');
    setLimitEnabled(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new API key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">
                Key Name — A unique name to identify this key
              </Label>
              <Input
                id="keyName"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key Name"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="limitUsage"
                  checked={limitEnabled}
                  onCheckedChange={setLimitEnabled}
                />
                <Label htmlFor="limitUsage">Limit monthly usage*</Label>
              </div>
              {limitEnabled && (
                <Input
                  type="number"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                  className="mt-2"
                />
              )}
              <p className="text-sm text-gray-500">
                *If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 