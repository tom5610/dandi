'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiKeyService } from '@/app/services/apiKeys'
import { CreateKeyModal } from '@/app/components/apiKeys/CreateKeyModal';
import { ApiKeysTable } from '@/app/components/apiKeys/ApiKeysTable';
import { PlanOverviewCard } from '@/app/components/dashboard/PlanOverviewCard';
import { EditKeyModal } from '@/app/components/apiKeys/EditKeyModal';
import { DeleteKeyModal } from '@/app/components/apiKeys/DeleteKeyModal';
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch API keys",
        variant: "destructive",
      });
    }
  };

  const handleCreateKey = async (newKey) => {
    try {
      const data = await apiKeyService.createApiKey(newKey);
      setApiKeys([data, ...apiKeys]);
      setShowNewKeyForm(false);
      toast({
        title: "Success",
        description: "API key created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create API key",
        variant: "destructive",
      });
    }
  };

  const handleEditKey = async (updatedData) => {
    try {
      if (!editingKey?.id || !updatedData.name) {
        throw new Error('Missing required fields for key update');
      }

      const keyData = {
        id: editingKey.id,
        name: updatedData.name.trim()
      };
      
      console.log('Updating key with data:', keyData);
      const data = await apiKeyService.updateApiKey(keyData);
      setApiKeys(apiKeys.map(key => key.id === editingKey.id ? data : key));
      setShowEditForm(false);
      toast({
        title: "Success",
        description: "API key updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update API key",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (key) => {
    setEditingKey(key);
    setShowEditForm(true);
  };

  const openDeleteDialog = (key) => {
    setKeyToDelete(key);
    setShowDeleteDialog(true);
  };

  const handleDeleteKey = async () => {
    try {
      await apiKeyService.deleteApiKey(keyToDelete.id);
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete.id));
      setShowDeleteDialog(false);
      toast({
        title: "Success",
        description: "API key deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete API key",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <PlanOverviewCard />
      
      <div className="space-y-4">
        {/* Header section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">API Keys</h1>
          <Button onClick={() => setShowNewKeyForm(true)} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ApiKeysTable 
          apiKeys={apiKeys}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
        />
      </div>

      <CreateKeyModal 
        isOpen={showNewKeyForm}
        onClose={() => setShowNewKeyForm(false)}
        onSubmit={handleCreateKey}
      />

      <EditKeyModal 
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSubmit={handleEditKey}
        apiKey={editingKey}
      />

      <DeleteKeyModal 
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteKey}
        apiKey={keyToDelete}
      />
    </div>
  );
}
