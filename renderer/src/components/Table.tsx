import {
  CogIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { SortKeys, SortOrder } from "../routes/Home";
import { RouterOutput } from "../utils/trpc";

type Data = RouterOutput["expense"]["getAll"];

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick} className="px-3">
      {sortKey === columnKey ? (
        <span className="-mb-2 grid">
          <SortAscendingIcon
            className={`col-start-1 row-start-1 h-5 w-5 transition duration-300 ease-out ${
              sortOrder === "ascn" ? "opacity-100" : "opacity-0"
            } text-sky-500`}
          />
          <SortDescendingIcon
            className={`col-start-1 row-start-1 h-5 w-5 transition duration-300 ease-out ${
              sortOrder === "desc" ? "opacity-100" : "opacity-0"
            } text-sky-500`}
          />
        </span>
      ) : (
        <SortDescendingIcon className="col-start-1 row-start-1 -mb-2 h-5 w-5 text-slate-300 duration-300 ease-out" />
      )}
    </button>
  );
}

const Table: React.FC<{
  headers: {
    key: SortKeys;
    label: string;
  }[];
  data?: Data;
  sortOrder: SortOrder;
  sortKey: SortKeys;
  changeSort: (key: SortKeys) => void;
}> = ({ headers, data, sortOrder, changeSort, sortKey }) => {
  return (
    <table className="divide-y divide-gray-300 rounded-md bg-slate-200 shadow-md">
      <thead className="bg-gray-50">
        <tr>
          {headers.map(({ key, label }) => {
            return (
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 first:rounded-tl-md last:rounded-tr-md first:sm:pl-6"
                key={key}
              >
                {/* <th> is display: table-header-group; so this wrapping div lets us display:flex; the children */}
                <div className={`flex justify-right`}>
                  <p>{label}</p>
                  <SortButton
                    columnKey={key}
                    onClick={() => changeSort(key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data?.map((expense, i) => {
          const roundl = data.length - 1 === i ? "rounded-bl-md" : "";
          const roundr = data.length - 1 === i ? "rounded-br-md" : "";

          return (
            <tr
              key={expense.id}
              className="even:bg-slate-50 hover:bg-slate-200"
            >
              {/* DATUM */}
              <td
                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 ${roundl}`}
              >
                <Link to={`edit/${expense.id}`}>
                  {new Intl.DateTimeFormat("nl-BE", {
                    dateStyle: "medium",
                  }).format(expense.date)}
                </Link>
              </td>
              {/* WINKEL */}
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {expense.store.name}
              </td>
              {/* VOLLEDIG */}
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {new Intl.NumberFormat("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 2,
                }).format(expense.fullAmount / 100)}
              </td>
              {/* BETAALD */}
              <td
                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6`}
              >
                {new Intl.NumberFormat("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 2,
                }).format(expense.paidAmount / 100)}
              </td>
              {/* BESPAARD */}
              <td
                className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 ${roundr}`}
              >
                {new Intl.NumberFormat("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 2,
                }).format((expense.fullAmount - expense.paidAmount) / 100)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
