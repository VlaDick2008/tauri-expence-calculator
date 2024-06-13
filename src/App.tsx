import React from 'react';
import { v4 as uuid } from 'uuid';

import ExpenceCard from './components/ExpenceCard';
import IncomeCard from './components/IncomeCard';
import LeftoverCard from './components/LeftoverCard';

export interface IExpence {
  id: string;
  title: string;
  value: number;
}

function App() {
  const [newExpence, setNewExpence] = React.useState({ title: '', value: 0 });
  const [newExpences, setNewExpences] = React.useState(
    JSON.parse(localStorage.getItem('expences') || '[]'),
  );

  const [sallary, setSallary] = React.useState(0);
  const [avans, setAvans] = React.useState(0);

  const [leftoverPersent, setLeftoverPersent] = React.useState(0);

  const [totalMoney, setTotalMoney] = React.useState(sallary + avans);
  const [totalExpences, setTotalExpences] = React.useState(0);

  React.useEffect(() => {
    localStorage.setItem('expences', JSON.stringify(newExpences));
    setTotalExpences(newExpences.reduce((acc: number, item: IExpence) => acc + item.value, 0));
    setTotalMoney(sallary + avans);
  }, [avans, newExpences, sallary]);

  const addNewExpence = () => {
    if (newExpence.title === '') return;

    const newExpenceObj: IExpence = {
      id: uuid(),
      title: newExpence.title,
      value: newExpence.value,
    };

    setNewExpences([...newExpences, newExpenceObj]);
    setNewExpence({ title: '', value: 0 });
  };

  return (
    <section className="bg-white rounded-lg h-full flex flex-col xl:flex-row gap-5 p-5">
      <div className="flex flex-col gap-5 flex-wrap flex-1">
        {newExpences.map((expence: IExpence) => (
          <ExpenceCard
            key={expence.id}
            title={expence.title}
            value={expence.value}
            id={expence.id}
            setNewExpences={setNewExpences}
          />
        ))}
        <div>
          <div className="border border-green-700 p-3 rounded">
            <input
              value={newExpence.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewExpence({ ...newExpence, title: e.target.value })
              }
              type="text"
              className="border border-green-700 rounded w-full outline-none"
            />
            <input
              value={newExpence.value}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewExpence({ ...newExpence, value: Number(e.target.value) })
              }
              className="border border-green-700 mt-3 rounded w-full outline-none"
            />
          </div>
          <button
            onClick={addNewExpence}
            className="border text-white font-bold mt-5 bg-green-600 border-green-700 p-3 rounded">
            Добавить
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              setNewExpences([]);
            }}
            className="border ml-5 text-white font-bold mt-5 bg-red-600 border-red-700 p-3 rounded">
            Сбросить
          </button>
        </div>
      </div>
      <div className="xl:h-full h-[1px] xl:w-[1px] w-full bg-black" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <IncomeCard setMoney={setAvans} value={avans} title="Аванс" />
          <IncomeCard setMoney={setSallary} value={sallary} title="Зарплата" />
        </div>
        <div>
          <LeftoverCard setLeftoverPersent={setLeftoverPersent} />
        </div>
        <div>
          <div className="flex xl:flex-col gap-4">
            <div className="border border-slate-900 p-3 rounded">
              <h3 className="text-3xl">Деняк: </h3>
              <p className="text-xl">{totalMoney} p.</p>
            </div>
            <div className="border border-slate-900 p-3 rounded">
              <h3 className="text-3xl">Расходы:</h3>
              <p className="text-xl">{totalExpences} p.</p>
            </div>
            <div className="border border-slate-900 p-3 rounded">
              <h2 className="xl:text-5xl text-3xl">
                Нужно отложить:{' '}
                {(((totalMoney - totalExpences) / 100) * leftoverPersent).toFixed(0)} p.
              </h2>
              <h2 className="xl:text-5xl text-3xl">
                Деняк остаётся:{' '}
                {(
                  totalMoney -
                  totalExpences -
                  ((totalMoney - totalExpences) / 100) * leftoverPersent
                ).toFixed(0)}{' '}
                p.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
