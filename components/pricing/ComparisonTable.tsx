interface ComparisonTableProps {
  tiers: {
    name: string;
    price: number;
  }[];
}

export const ComparisonTable = ({ tiers }: ComparisonTableProps) => {
  return (
    <div className="mt-24">
      <h3 className="text-2xl   font-bold font-almarai font-almarai  font-almarai text-gray-900 text-center mb-12">Compare Plan Features</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="py-5 px-4 text-left text-sm font-almarai text-gray-900">Features</th>
              {tiers.map((tier) => (
                <th key={tier.name} className="px-4 py-5 text-left text-sm font-almarai text-gray-900">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-5 px-4 text-sm text-gray-500">Survey Creation</td>
              <td className="px-4 py-5 text-sm">Basic</td>
              <td className="px-4 py-5 text-sm">Advanced</td>
              <td className="px-4 py-5 text-sm">Full Logic</td>
              <td className="px-4 py-5 text-sm">Enterprise</td>
            </tr>
            <tr>
              <td className="py-5 px-4 text-sm text-gray-500">Response Limit</td>
              <td className="px-4 py-5 text-sm">100/mo</td>
              <td className="px-4 py-5 text-sm">Unlimited</td>
              <td className="px-4 py-5 text-sm">Unlimited</td>
              <td className="px-4 py-5 text-sm">Unlimited</td>
            </tr>
            <tr>
              <td className="py-5 px-4 text-sm text-gray-500">Question Types</td>
              <td className="px-4 py-5 text-sm">Basic</td>
              <td className="px-4 py-5 text-sm">Advanced</td>
              <td className="px-4 py-5 text-sm">All Types</td>
              <td className="px-4 py-5 text-sm">Custom Types</td>
            </tr>
            <tr>
              <td className="py-5 px-4 text-sm text-gray-500">AI Features</td>
              <td className="px-4 py-5 text-sm">—</td>
              <td className="px-4 py-5 text-sm">Basic</td>
              <td className="px-4 py-5 text-sm">Advanced</td>
              <td className="px-4 py-5 text-sm">Enterprise</td>
            </tr>
            <tr>
              <td className="py-5 px-4 text-sm text-gray-500">Analytics</td>
              <td className="px-4 py-5 text-sm">Basic</td>
              <td className="px-4 py-5 text-sm">Enhanced</td>
              <td className="px-4 py-5 text-sm">Advanced</td>
              <td className="px-4 py-5 text-sm">Custom</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};