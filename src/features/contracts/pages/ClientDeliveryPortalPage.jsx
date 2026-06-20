import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Clock, CheckCircle2, Archive, RefreshCcw } from 'lucide-react';
import { useContractQuery, useContractDeliveriesQuery, useDownloadAttachmentMutation } from '../../../hooks/useContractDelivery';
import { contractsService } from '../../../services/contractsService';
import DeliveryHistory from '../components/DeliveryHistory';

export default function ClientDeliveryPortalPage() {
  const { id: contractId } = useParams();

  const { data: contract, loading: contractLoading, refetch: refetchContract } = useContractQuery(contractId);
  const { data: deliveries, loading: deliveriesLoading, refetch: refetchDeliveries } = useContractDeliveriesQuery(contractId);
  const { mutate: downloadAttachment } = useDownloadAttachmentMutation();

  const isLoading = contractLoading || deliveriesLoading;

  // Helpers
  const statusStr = String(contract?.status ?? contract?.Status ?? '').toLowerCase();
  const isActive = statusStr === 'active' || statusStr === '1';
  const isCompleted = ['completed', 'closed', '2', '5'].includes(statusStr);
  const hasPending = deliveries?.some(d => {
    const s = String(d.status ?? d.Status ?? '').toLowerCase();
    return s === 'pending' || s === '0';
  });
  const pendingDelivery = deliveries?.find(d => {
    const s = String(d.status ?? d.Status ?? '').toLowerCase();
    return s === 'pending' || s === '0';
  });
  const isPendingPaused = pendingDelivery?.isPaused || pendingDelivery?.IsPaused;
  const pendingPauseReason = pendingDelivery?.pauseReason || pendingDelivery?.PauseReason;

  // Handlers
  const handleApprove = async (deliveryId) => {
    try {
      await contractsService.approveDelivery(deliveryId);
      toast.success('Delivery approved!');
      refetchContract();
      refetchDeliveries();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to approve delivery.');
    }
  };

  const handleRevision = async (deliveryId, reason) => {
    try {
      await contractsService.requestRevision(deliveryId, { reason });
      toast.success('Revision requested successfully!');
      refetchContract();
      refetchDeliveries();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to request revision.');
      throw err;
    }
  };

  const handleDispute = async (deliveryId, reason) => {
    try {
      await contractsService.openDispute(deliveryId, { reason });
      toast.success('Dispute opened successfully!');
      refetchContract();
      refetchDeliveries();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to open dispute.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 w-full animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full">
      <Link 
        to={`/client/contracts/${contractId}`} 
        className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm mb-6 hover:underline"
        style={{ color: 'var(--accent)' }}
      >
        <ArrowLeft size={16} /> Back to Contract Details
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {(!deliveries || deliveries.length === 0) ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <div className="inline-flex p-3 bg-gray-50 border border-gray-100 rounded-2xl mb-3 text-gray-400">
                <Archive className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                No deliveries yet
              </h3>
              <p className="text-sm text-gray-500 max-w-xs">
                The freelancer has not submitted any deliverables yet.
              </p>
            </div>
          ) : (
            <DeliveryHistory
              deliveries={deliveries}
              isLoading={false}
              role="Client"
              onApprove={!isCompleted ? handleApprove : undefined}
              onRevision={!isCompleted ? handleRevision : undefined}
              onDispute={!isCompleted ? handleDispute : undefined}
              onDownloadAttachment={(id, name) => downloadAttachment(id, name)}
              onRefresh={() => { refetchContract(); refetchDeliveries(); }}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {isActive && hasPending && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
              {isPendingPaused ? (
                <>
                  <div className="flex items-center gap-2 text-amber-850 mb-2">
                    <Clock className="h-5 w-5 text-amber-605" />
                    <h3 className="font-semibold text-sm uppercase tracking-wide">Review Paused</h3>
                  </div>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {pendingPauseReason || 'Auto-approval worker is paused while a specialist review is in progress.'}
                  </p>
                </>
              ) : (
                <>
                  <div className="absolute top-0 right-0 p-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-800 mb-2">
                    <Clock className="h-5 w-5" />
                    <h3 className="font-semibold text-sm uppercase tracking-wide">Awaiting your review</h3>
                  </div>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    You have 3 days to approve or request revisions before auto-approval.
                  </p>
                </>
              )}
            </div>
          )}

          {isCompleted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 mb-2">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="font-semibold text-sm uppercase tracking-wide">Contract Completed</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                This contract has been successfully completed. Deliveries are now read-only.
              </p>
            </div>
          )}

          {/* Revisions Info */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-800 mb-2">
              <RefreshCcw className="h-5 w-5" />
              <h3 className="font-semibold text-sm uppercase tracking-wide">Max Revisions</h3>
            </div>
            <p className="text-indigo-700 text-sm leading-relaxed">
              <span className="font-bold">{contract?.maxRevisions ?? contract?.MaxRevisions ?? contract?.revisionsIncluded ?? contract?.numberOfRevisions ?? 'Unlimited'}</span> revisions allowed for this contract.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
