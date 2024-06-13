import React from 'react';
import type { IExpence } from '../App';

export default function ExpenceCard({
  title,
  value,
  id,
  setNewExpences,
}: {
  title: string;
  value: number;
  id: string;
  setNewExpences: React.Dispatch<React.SetStateAction<IExpence[]>>;
}) {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const expences = JSON.parse(localStorage.getItem('expences') || '[]');

  const deleteExpence = () => {
    setNewExpences(expences.filter((item: IExpence) => item.id != id));
  };

  return (
    <div
      className={`border flex justify-between items-center p-3 rounded ${
        isCompleted ? 'border-green-600 bg-green-200 text-slate-600' : 'border-slate-900'
      }`}>
      <div>
        <h3 className="text-xl">{title}</h3>
        <p>{value} p.</p>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex gap-2 text-sm">
          Отметить выполненным?
          <input type="checkbox" onClick={() => setIsCompleted(!isCompleted)} />
        </label>
        <button
          onClick={deleteExpence}
          className="border text-white font-bold bg-red-600 border-red-700 p-3 rounded">
          Удалить
        </button>
      </div>
    </div>
  );
}
