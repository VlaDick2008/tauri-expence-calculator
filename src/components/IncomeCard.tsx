import React from 'react';

export default function IncomeCard({
  title,
  setMoney,
  value,
}: {
  title: string;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}) {
  const [countAvans, setCountAvans] = React.useState(false);

  return (
    <div className="border border-green-700 p-3 rounded">
      <div className="flex items-center justify-between gap-5">
        <h3 className="text-xl text-green-600">{title}</h3>
        {title === 'Аванс' && (
          <div className="flex gap-2">
            <label htmlFor="">Считать аванс?</label>
            <input
              onChange={() => {
                setCountAvans(!countAvans);
              }}
              type="checkbox"
            />
          </div>
        )}
      </div>
      {title === 'Аванс' ? (
        <input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMoney(Number(e.target.value))}
          type="text"
          disabled={!countAvans}
          className="border border-green-700 mt-2 rounded w-full outline-none disabled:bg-gray-200"
        />
      ) : (
        <input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMoney(Number(e.target.value))}
          type="text"
          className="border border-green-700 mt-2 rounded w-full outline-none"
        />
      )}
    </div>
  );
}
