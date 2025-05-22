import React, { useState } from "react";
import { FormCard } from "./FormCard";
import { Form } from "@/types";
import ReactPaginate from "react-paginate";

interface FormGridProps {
  forms: Form[];
  
  responsesCount: { [key: string]: number };

  averageTime: { [key: string]: number };
  completionData: {
    _id: string;
    averageCompletion: number;
    totalResponses: number;
  }[];

  onShare: (formId: string) => void;
  onOptionsClick: (formId: string) => void;
  onClosingOptions: (formId: string) => void;
  onStatusChange: (formId: string, status: "live" | "draft" | "closed") => void;
  // onStatusChange: (formId: string, status: "live" | "draft" | "closed") => void;
}

export function FormGrid({
  forms,
  onShare,
  onOptionsClick,
  onClosingOptions,
  onStatusChange,
  responsesCount,
  averageTime,
  completionData,
}: FormGridProps) {
const completionDataMap = (completionData || []).reduce((acc, item) => {
  acc[item._id] = item.averageCompletion; 
  return acc;
}, {} as { [key: string]: number });



  return (
    <>
      {forms.map((form) => (
        <FormCard
          key={form._id}
          form={form}
          responsesCount={responsesCount}
          averageTime={averageTime}
          completionData={completionDataMap}
          onShare={() => onShare(form._id)}
          onOptionsClick={() => onOptionsClick(form._id)}
          onClosingOptions={() => onClosingOptions(form._id)}
          onStatusChange={(newStatus) => onStatusChange(form._id, newStatus)}
        />
      ))}
    </>
  );
}
