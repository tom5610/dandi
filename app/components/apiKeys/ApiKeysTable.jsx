import { useState } from 'react';
import { TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function ApiKeysTable({ apiKeys, onEdit, onDelete }) {
  const [showKey, setShowKey] = useState({});
  const { toast } = useToast();

  const toggleKeyVisibility = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({
        title: "Copied!",
        description: "API key copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy API key",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <Card>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-sm font-medium text-gray-500">NAME</th>
            <th className="text-left p-4 text-sm font-medium text-gray-500">USAGE</th>
            <th className="text-left p-4 text-sm font-medium text-gray-500">KEY</th>
            <th className="text-right p-4 text-sm font-medium text-gray-500">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((apiKey) => (
            <tr key={apiKey.id} className="border-b last:border-0">
              <td className="p-4 text-sm">{apiKey.name}</td>
              <td className="p-4 text-sm">{apiKey.usage || 0}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-gray-600">
                    {showKey[apiKey.id] ? apiKey.key : '•••••••••••••••••••••••••••••••'}
                  </code>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                    {showKey[apiKey.id] ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                    <ClipboardIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(apiKey)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(apiKey)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
} 