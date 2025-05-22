import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DocsLayout } from './DocsLayout';
import {
  Introduction,
  AIFormGeneration,
  APIReference,
  Security
} from './pages';

export default function Docs() {
  return (
    <DocsLayout>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/ai-forms" element={<AIFormGeneration />} />
        <Route path="/api" element={<APIReference />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </DocsLayout>
  );
}