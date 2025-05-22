import React, { useState, useEffect } from 'react';
import { Mail, Bell, HelpCircle, Plus, X } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';
import * as Dialog from '@radix-ui/react-dialog';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  enabled: boolean;
  trigger: 'onSubmit' | 'onApproval' | 'onReject' | 'custom';
}

export function NotificationsPanel() {
  const { t } = useTranslation();
  const { id: formId } = useParams();
  const [selfNotify, setSelfNotify] = useState(false);
  const [respondentNotify, setRespondentNotify] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<EmailTemplate>>({
    name: '',
    subject: '',
    body: '',
    trigger: 'onSubmit'
  });
  const [userEmail, setUserEmail] = useState("");
  console.log('houssem', userEmail);

  // 🔹 Charger les paramètres de notifications existants
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`https://swbackstg.vercel.app/surveys/notification_settings/${formId}`);
        const data = await res.json();
        setSelfNotify(data.selfNotify || false);
        setRespondentNotify(data.respondentNotify || false);
        setEmailTemplates(data.emailTemplates || []);
      } catch (error) {
        console.error("Failed to fetch notification settings:", error);
      }
    };

    fetchSettings();
  }, [formId]);

  // 🔹 Sauvegarder les paramètres de notifications
  const saveSettings = async () => {
    try {
      await fetch(`https://swbackstg.vercel.app/surveys/notification_settings/${formId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selfNotify,
          respondentNotify,
          emailTemplates,
        }),
      });
      alert("✅ Settings saved!");
    } catch (error) {
      console.error("Failed to save notification settings:", error);
    }
  };

  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.subject && newTemplate.body) {
      setEmailTemplates([
        ...emailTemplates,
        {
          id: Date.now().toString(),
          name: newTemplate.name,
          subject: newTemplate.subject,
          body: newTemplate.body,
          trigger: newTemplate.trigger || 'onSubmit',
          enabled: true
        }
      ]);
      setNewTemplate({ name: '', subject: '', body: '', trigger: 'onSubmit' });
      setIsAddingTemplate(false);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setEmailTemplates(emailTemplates.filter(template => template.id !== id));
  };

  const handleToggleTemplate = (id: string) => {
    setEmailTemplates(emailTemplates.map(template =>
      template.id === id ? { ...template, enabled: !template.enabled } : template
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900">{t("notifications.title")}</h2>
          <p className="mt-1 text-sm text-gray-500">{t("notifications.description")}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <Tabs.Root defaultValue="general">
        <Tabs.List className="flex space-x-4 border-b border-gray-200">
          <Tabs.Trigger value="general" className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600">
            {t("notifications.tabs.general")}
          </Tabs.Trigger>
          <Tabs.Trigger value="custom-emails" className="px-4 py-2 text-sm font-almarai text-gray-500 hover:text-gray-700 border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600">
            {t("notifications.tabs.customEmails")}
          </Tabs.Trigger>
        </Tabs.List>

        {/* General Settings */}
        <Tabs.Content value="general" className="pt-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-almarai text-gray-900">{t("notifications.selfNotify.title")}</h3>
                  <p className="text-sm text-gray-500">{t("notifications.selfNotify.description")}</p>
                </div>
              </div>
              <Switch.Root
                checked={selfNotify}
                onCheckedChange={setSelfNotify}
                className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
              >
                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-almarai text-gray-900">{t("notifications.respondentNotify.title")}</h3>
                  <p className="text-sm text-gray-500">{t("notifications.respondentNotify.description")}</p>
                </div>
              </div>
              <Switch.Root
                checked={respondentNotify}
                onCheckedChange={setRespondentNotify}
                className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
              >
                <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {t("notifications.saveChanges")}
            </button>
          </div>
        </Tabs.Content>

        {/* Custom Email Templates */}
        <Tabs.Content value="custom-emails" className="pt-6 space-y-6">
          <button
            onClick={() => setIsAddingTemplate(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("notifications.addTemplate")}
          </button>

          <div className="space-y-4">
            {emailTemplates.map(template => (
              <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-almarai text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">   {t("notifications.template.trigger")} {template.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch.Root
                      checked={template.enabled}
                      onCheckedChange={() => handleToggleTemplate(template.id)}
                      className="w-11 h-6 bg-gray-200 rounded-full data-[state=checked]:bg-indigo-600"
                    >
                      <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
                    </Switch.Root>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-almarai text-gray-700">
                    {t("notifications.template.subject")}
                  </p>
                  <p className="text-sm text-gray-600">{template.subject}</p>
                </div>
              </div>
            ))}
          </div>

          <Dialog.Root open={isAddingTemplate} onOpenChange={setIsAddingTemplate}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40" />
              <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg">
                <Dialog.Title className="text-lg font-almarai text-gray-900 mb-4">
                  {t("notifications.template.trigger")}
                </Dialog.Title>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-almarai text-gray-700">
                      {t("notifications.template.name")}
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-almarai text-gray-700">
                      {t("notifications.template.trigger")}
                    </label>
                    <select
                      value={newTemplate.trigger}
                      onChange={e => setNewTemplate({ ...newTemplate, trigger: e.target.value as any })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="onSubmit">  {t("notifications.template.trigger.onSubmit")}</option>
                      <option value="onSubmit">  {t("notifications.template.trigger.onApproval")}</option>
                      <option value="onSubmit">  {t("notifications.template.trigger.onReject")}</option>
                      <option value="onSubmit">  {t("notifications.template.trigger.custom")}</option>

                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-almarai text-gray-700">
                      {t("notifications.template.subject")}
                    </label>
                    <input
                      type="text"
                      value={newTemplate.subject}
                      onChange={e => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-almarai text-gray-700">
                      {t("notifications.template.body")}
                    </label>
                    <textarea
                      rows={4}
                      value={newTemplate.body}
                      onChange={e => setNewTemplate({ ...newTemplate, body: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingTemplate(false)}
                    className="px-4 py-2 text-sm font-almarai text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {t("notifications.modal.cancel")}
                  </button>
                  <button
                    onClick={handleAddTemplate}
                    className="px-4 py-2 text-sm font-almarai text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    {t("notifications.modal.confirm")}
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
