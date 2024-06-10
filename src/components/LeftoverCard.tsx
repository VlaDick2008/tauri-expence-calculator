export default function IncomeCard({
  setLeftoverPersent,
}: {
  setLeftoverPersent: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="border border-slate-900 p-3 rounded">
      <h3 className="text-3xl mb-3">Сколько нужно отложить?</h3>
      <div className="flex gap-3">
        <p>% от зарплаты:</p>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLeftoverPersent(Number(e.target.value))
          }
          className="border border-slate-900 rounded w-8 outline-none"
          type="text"
          name="sallary"
          id="sallary"
        />
      </div>
    </div>
  );
}
