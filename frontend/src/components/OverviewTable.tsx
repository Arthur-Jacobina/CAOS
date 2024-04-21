export default function OverviewTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-white font-bold border-b border-gray-500 px-4 py-2">Your Requests</th>
            <th className="text-white font-bold border-b border-gray-500 px-4 py-2">$</th>
            <th className="text-white font-bold border-b border-gray-500 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <TableRow request="Fix leaky faucet" cost="55" status="Finished" />
          <TableRow request="Replace carpet" cost="135" status="Approved" />
          <TableRow request="Install security system" cost="65" status="Pending" />
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ request, cost, status }) => {
  return (
    <tr>
      <td className="border-b border-gray-500 px-4 py-2 text-white font-bold">{request}</td>
      <td className="border-b border-gray-500 px-4 py-2 text-white font-bold">${cost}</td>
      <td className={`border-b border-gray-500 px-4 py-2 font-bold ${status == 'Finished' ? "text-[#859EF5]" : (status == "Approved" ? "text-[#92E3A9]" : "text-[#F28F8F]")}`}>{status}</td>
    </tr>
  );
};