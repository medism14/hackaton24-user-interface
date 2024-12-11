import React from 'react';
import { CardDataStats, StackedBarChart } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBill,
  faBriefcase,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7.5">
        <CardDataStats
          title="Nombres d'employés"
          total="3.456"
          rate="0.95%"
          levelDown
        >
          <FontAwesomeIcon icon={faUserTie} className="text-xl" />
        </CardDataStats>

        <CardDataStats
          title="Total dépenses le mois d'août"
          total="3.456"
          rate="0.95%"
          levelDown
        >
          <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
        </CardDataStats>

        <CardDataStats
          title="Dépenses patronales le mois d'août"
          total="3.456"
          rate="0.95%"
          levelDown
        >
          <FontAwesomeIcon icon={faBriefcase} className="text-xl" />
        </CardDataStats>
      </div>

      <div className="mt-[50px]">
        <StackedBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
