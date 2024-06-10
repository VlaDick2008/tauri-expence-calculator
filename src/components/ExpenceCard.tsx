import type { IExpence } from '../App';

export default function ExpenceCard({
  title,
  value,
  id,
  setNewExpences,
}: {
  title: string;
  value: number;
  id: number;
  setNewExpences: React.Dispatch<React.SetStateAction<IExpence[]>>;
}) {
  const expences = JSON.parse(localStorage.getItem('expences') || '[]');

  const deleteExpence = () => {
    setNewExpences(expences.filter((item: IExpence) => item.id != id));
  };

  return (
    <div className="border flex justify-between items-center border-slate-900 p-3 rounded">
      <div>
        <h3 className="text-xl">{title}</h3>
        <p>{value} p.</p>
      </div>
      <button
        onClick={deleteExpence}
        className="border text-white font-bold bg-red-600 border-red-700 p-3 rounded">
        Удалить
      </button>
    </div>
  );
}
