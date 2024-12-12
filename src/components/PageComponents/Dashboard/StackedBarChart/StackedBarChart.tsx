import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
  {
    name: 'Jan',
    Salaires: 45000,
    Primes: 2500,
    Charges: 22500,
    Total: 70000
  },
  {
    name: 'Fév',
    Salaires: 44800,
    Primes: 3000,
    Charges: 22400,
    Total: 70200
  },
  {
    name: 'Mars',
    Salaires: 45200,
    Primes: 4500,
    Charges: 22600,
    Total: 72300
  },
  {
    name: 'Avr',
    Salaires: 45000,
    Primes: 2800,
    Charges: 22500,
    Total: 70300
  },
  {
    name: 'Mai',
    Salaires: 45500,
    Primes: 3200,
    Charges: 22750,
    Total: 71450
  },
  {
    name: 'Juin',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Juil',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Aout',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Sept',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Oct',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Nov',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
  {
    name: 'Déc',
    Salaires: 46000,
    Primes: 5000,
    Charges: 23000,
    Total: 74000
  },
];

const StackedBarChart: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-boxdark rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center dark:text-white">
        Répartition des Dépenses Mensuelles (en €)
      </h3>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#718096" strokeOpacity={0.2} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#718096' }}
            axisLine={{ stroke: '#718096', strokeOpacity: 0.2 }}
          />
          <YAxis
            tick={{ fill: '#718096' }}
            axisLine={{ stroke: '#718096', strokeOpacity: 0.2 }}
          >
            <Label
              value="Montant (€)"
              angle={-90}
              position="insideLeft"
              offset={-40}
              style={{ textAnchor: 'middle', fill: '#718096' }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => new Intl.NumberFormat('fr-FR').format(value) + ' €'}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ paddingBottom: '20px' }}
          />
          <Bar
            dataKey="Salaires"
            stackId="a"
            fill="#4F46E5"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Primes"
            stackId="a"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Charges"
            stackId="a"
            fill="#F59E0B"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Total"
            stackId="b"
            fill="#475569"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
