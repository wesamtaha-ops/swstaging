import React from "react";
import {
  BarChart2,
  Database,
  FileText,
  Check,
  Shield,
  Zap,
  Crown,
} from "lucide-react";

interface UsageStats {
  activeForms: {
    current: number;
    limit: number;
    percentage: number;
  };
  monthlyResponses: {
    current: number;
    limit: number;
    percentage: number;
  };
  storage: {
    current: number;
    limit: number;
    percentage: number;
  };
}

interface Plan {
  name: string;
  price: number;
  features: string[];
  icon: React.ElementType;
  popular?: boolean;
}

export function SubscriptionTab() {
  const [currentPlan, setCurrentPlan] = React.useState("Pro");

  const usageStats: UsageStats = {
    activeForms: {
      current: 12,
      limit: 15,
      percentage: 80,
    },
    monthlyResponses: {
      current: 8200,
      limit: 10000,
      percentage: 82,
    },
    storage: {
      current: 4.2,
      limit: 5,
      percentage: 84,
    },
  };

  const plans: Plan[] = [
    {
      name: "Free",
      price: 0,
      features: [
        "Limited surveys and respondents",
        "Basic question types",
        "Email verification",
        "Basic security features",
        "Limited reporting (Excel, CSV)",
      ],
      icon: Shield,
    },
    {
      name: "Pro",
      price: 49,
      features: [
        "Unlimited surveys & respondents",
        "Advanced question types and logic",
        "Email/SMS campaigns",
        "A/B testing",
        "Social media integration",
        "Custom email templates",
        "Enhanced reporting",
      ],
      icon: Zap,
      popular: true,
    },
    {
      name: "Enterprise",
      price: 199,
      features: [
        "All features unlocked",
        "Unlimited users & languages",
        "Advanced integrations",
        "Dynamic real-time reporting",
        "Role-based access control",
        "Full API access",
        "GDPR compliance",
      ],
      icon: Crown,
    },
  ];

  const UsageCard = ({
    title,
    current,
    limit,
    percentage,
    icon: Icon,
    unit = "",
  }: {
    title: string;
    current: number;
    limit: number;
    percentage: number;
    icon: React.ElementType;
    unit?: string;
  }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-almarai text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-almarai text-gray-900">
            {current}
            {unit}/{limit}
            {unit}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className="mt-4">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {percentage}% of limit used
        </p>
      </div>
    </div>
  );

  const handlePlanChange = async (planName: string) => {
    if (planName === currentPlan) return;

    // In a real app, you would:
    // 1. Show a confirmation dialog
    // 2. Handle payment flow if upgrading
    // 3. Make API call to change subscription
    // 4. Handle success/error states

    const isUpgrade =
      plans.findIndex((p) => p.name === planName) >
      plans.findIndex((p) => p.name === currentPlan);

    if (
      window.confirm(
        isUpgrade
          ? `Are you sure you want to upgrade to ${planName}?`
          : `Are you sure you want to downgrade to ${planName}?`
      )
    ) {
      setCurrentPlan(planName);

    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-almarai text-gray-900">
            Account Overview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You are currently on the {currentPlan} plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <UsageCard
            title="Active Forms"
            current={usageStats.activeForms.current}
            limit={usageStats.activeForms.limit}
            percentage={usageStats.activeForms.percentage}
            icon={FileText}
          />
          <UsageCard
            title="Monthly Responses"
            current={usageStats.monthlyResponses.current}
            limit={usageStats.monthlyResponses.limit}
            percentage={usageStats.monthlyResponses.percentage}
            icon={BarChart2}
            unit="k"
          />
          <UsageCard
            title="Storage Used"
            current={usageStats.storage.current}
            limit={usageStats.storage.limit}
            percentage={usageStats.storage.percentage}
            icon={Database}
            unit="GB"
          />
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-almarai text-gray-900 mb-6">
            Available Plans
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-lg border p-6 ${currentPlan === plan.name
                    ? "border-indigo-600 ring-2 ring-indigo-600"
                    : "border-gray-300"
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-almarai text-white">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg ${currentPlan === plan.name
                          ? "bg-indigo-600"
                          : "bg-gray-100"
                          }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${currentPlan === plan.name
                            ? "text-white"
                            : "text-gray-600"
                            }`}
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-almarai text-gray-900">
                          {plan.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          ${plan.price}/month
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanChange(plan.name)}
                    className={`mt-6 w-full px-4 py-2 rounded-md text-sm font-almarai ${currentPlan === plan.name
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {currentPlan === plan.name ? "Current Plan" : "Switch Plan"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-almarai text-gray-900">
                Need a custom plan?
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Contact our sales team for a tailored solution that meets your
                specific needs.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-almarai text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
