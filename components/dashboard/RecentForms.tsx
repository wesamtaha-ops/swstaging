import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, ExternalLink, MoreVertical } from "lucide-react";

const recentForms = [
  {
    id: 1,
    name: "Customer Feedback Survey",
    responses: 234,
    lastUpdated: "2h ago",
    status: "active",
  },
  {
    id: 2,
    name: "Event Registration Form",
    responses: 156,
    lastUpdated: "1d ago",
    status: "active",
  },
  {
    id: 3,
    name: "Job Application Form",
    responses: 89,
    lastUpdated: "3d ago",
    status: "active",
  },
  {
    id: 4,
    name: "Product Survey",
    responses: 45,
    lastUpdated: "5d ago",
    status: "draft",
  },
];

export function RecentForms() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-almarai text-gray-900">Recent Forms</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {recentForms.map((form) => (
              <li key={form._id} className="py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-almarai text-gray-900 truncate">
                        {form.name}
                      </p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs text-gray-500">
                          {form.responses} responses • {form.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Link
                      to={`/forms/${form._id}`}
                      className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-almarai text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                    >
                      View form
                    </Link>
                    <button className="rounded-full p-1 hover:bg-gray-50">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Link
            to="/forms"
            className="flex items-center justify-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-almarai text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            View all forms
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
