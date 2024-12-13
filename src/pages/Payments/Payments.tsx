import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardDataStats, Input, ModalAdd } from '../../components';
import Select from '../../components/Forms/Select';
import { useNavigate } from 'react-router-dom';

interface Payment {
  id: number;
  commission_id: number;
  project_id: number;
  amount_paid: number;
  payment_date: string;
  status: string;
  created_at: string;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    commission_id: 101,
    project_id: 201,
    amount_paid: 5000,
    payment_date: '2023-06-15',
    status: 'Payé',
    created_at: '2023-06-15T10:00:00Z'
  },
  {
    id: 2,
    commission_id: 102,
    project_id: 202,
    amount_paid: 3500,
    payment_date: '2023-06-20',
    status: 'En attente',
    created_at: '2023-06-20T14:30:00Z'
  },
  {
    id: 3,
    commission_id: 103,
    project_id: 203,
    amount_paid: 7500,
    payment_date: '2023-06-25',
    status: 'Payé',
    created_at: '2023-06-25T09:15:00Z'
  }
];

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<Payment>();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://172.20.10.209:8000/payments/');
        const paymentsData = response.data as Payment[];
        setPayments(paymentsData);
        setFilteredPayments(paymentsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des paiements:', error);
        // Fallback to mock data in case of error
        setPayments(mockPayments);
        setFilteredPayments(mockPayments);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = (paymentId: number) => {
    const paymentToDelete = payments.find((payment) => payment.id === paymentId);
    if (paymentToDelete) {
      setSelectedPayment(paymentToDelete);
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer le paiement #${paymentToDelete.id} ?`
        )
      ) {
        setPayments((prev) => prev.filter((payment) => payment.id !== paymentId));
        setFilteredPayments((prev) => prev.filter((payment) => payment.id !== paymentId));
      }
    }
  };

  const handleEdit = (paymentId: number) => {
    navigate(`/payments/edit?id=${paymentId}`);
  };

  const onSubmit = async (data: Payment) => {
    try {
      const formattedData = {
        commission_id: data.commission_id,
        project_id: data.project_id,
        amount_paid: data.amount_paid,
        payment_date: data.payment_date,
        status: data.status
      };

      const response = await axios.post(
        'http://172.20.10.209:8000/payments/',
        formattedData,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const newPayment = response.data as Payment;
      setPayments((prev: Payment[]) => [...prev, newPayment]);
      setFilteredPayments((prev: Payment[]) => [...prev, newPayment]);
      setShowAddModal(false);
      reset();
    } catch (error) {
      console.error('Erreur:', error);
      if (error instanceof Error) {
        alert(error.message || 'Erreur lors de la création du paiement');
      } else {
        alert('Une erreur est survenue lors de la création du paiement');
      }
    }
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Paiements"
          total={payments.length.toString()}
          rate="12.5%"
          levelUp
        >
          <FontAwesomeIcon icon={faPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Paiements Payés"
          total={payments.filter(p => p.status === 'Payé').length.toString()}
          rate="8.2%"
          levelUp
        >
          <FontAwesomeIcon icon={faPlus} className="text-success" />
        </CardDataStats>
        <CardDataStats
          title="Nouveaux Paiements"
          total="12"
          rate="2.3%"
          levelUp
        >
          <FontAwesomeIcon icon={faPlus} className="text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Paiements en Attente"
          total={payments.filter(p => p.status === 'En attente').length.toString()}
          rate="1.8%"
          levelDown
        >
          <FontAwesomeIcon icon={faPlus} className="text-danger" />
        </CardDataStats>
      </div>

      <div className="mt-8 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Rechercher un paiement..."
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-3 text-gray-400"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-white hover:bg-opacity-90"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un paiement
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">ID</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Commission ID</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Project ID</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Montant</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Date</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Statut</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{payment.id}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{payment.commission_id}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{payment.project_id}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{payment.amount_paid}€</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{new Date(payment.payment_date).toLocaleDateString()}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      payment.status === 'Payé' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(payment.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="hover:text-danger"
                        onClick={() => handleDelete(payment.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalAdd
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          reset();
        }}
        onSave={handleSubmit(onSubmit)}
        title="Ajouter un paiement"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission ID</label>
            <Input
              name="commission_id"
              type="number"
              placeholder="Entrez l'ID de la commission"
              register={register('commission_id', { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project ID</label>
            <Input
              name="project_id"
              type="number"
              placeholder="Entrez l'ID du projet"
              register={register('project_id', { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Montant</label>
            <Input
              name="amount_paid"
              type="number"
              placeholder="Entrez le montant"
              register={register('amount_paid', { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <Input
              name="payment_date"
              type="date"
              register={register('payment_date', { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
            <Select
              name="status"
              register={register('status', { required: true })}
              options={[
                { value: 'Payé', label: 'Payé' },
                { value: 'En attente', label: 'En attente' }
              ]}
              placeholder="Sélectionnez un statut"
            />
          </div>
        </form>
      </ModalAdd>
    </div>
  );
};

export default Payments;