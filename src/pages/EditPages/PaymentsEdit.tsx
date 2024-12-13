import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import Select from '../../components/Forms/Select';

interface PaymentFormData {
  commission_id: number;
  project_id: number;
  amount_paid: number;
  payment_date: string;
  status: string;
}

const mockPayment = {
  commission_id: 1,
  project_id: 1,
  amount_paid: 1000,
  payment_date: '2023-01-01',
  status: 'Payé'
};

const PaymentsEdit = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PaymentFormData>();

  useEffect(() => {
    reset(mockPayment);
  }, [reset]);

  const onSubmit = (data: PaymentFormData) => {
    console.log(data);
  };

  return (
    <div className="p-6 bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Modifier le paiement
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission ID</label>
          <Input
            name="commission_id"
            type="number"
            placeholder="Entrez l'ID de la commission"
            error={errors.commission_id?.message}
            register={register('commission_id', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project ID</label>
          <Input
            name="project_id"
            type="number"
            placeholder="Entrez l'ID du projet"
            error={errors.project_id?.message}
            register={register('project_id', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Montant</label>
          <Input
            name="amount_paid"
            type="number"
            placeholder="Entrez le montant"
            error={errors.amount_paid?.message}
            register={register('amount_paid', { valueAsNumber: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <Input
            name="payment_date"
            type="date"
            error={errors.payment_date?.message}
            register={register('payment_date')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
          <Select
            name="status"
            options={[
              { value: 'Payé', label: 'Payé' },
              { value: 'En attente', label: 'En attente' }
            ]}
            placeholder="Sélectionnez un statut"
            error={errors.status?.message}
            register={register('status')}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => reset()}
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentsEdit;