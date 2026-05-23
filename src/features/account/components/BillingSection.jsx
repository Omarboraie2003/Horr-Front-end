import React, { useState } from 'react';
import { getWalletBalance, addPaymentMethod, getOnboardingStatus, getUserPaymentMethods, deletePaymentMethod, updatePaymentMethod } from '../../../services/clientService';
import useFetch from '../../../hooks/useFetch';
import { toast } from 'sonner';

const InstaPayLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#FF6B35" />
    <path d="M30 50C30 37.85 39.85 28 52 28C64.15 28 74 37.85 74 50C74 62.15 64.15 72 52 72C39.85 72 30 62.15 30 50Z" fill="#FFF" />
    <circle cx="52" cy="50" r="8" fill="#FF6B35" />
    <circle cx="62" cy="42" r="3" fill="#FF6B35" />
  </svg>
);

const EWalletLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#10B981" />
    <rect x="15" y="30" width="70" height="50" rx="6" fill="#FFF" />
    <rect x="15" y="30" width="70" height="18" rx="6" fill="#E5E7EB" />
    <circle cx="75" cy="62" r="6" fill="#10B981" />
  </svg>
);

const formatAccountIdentifier = (identifier = '') => {
  const visibleStart = identifier.slice(0, 3);
  const visibleEnd = identifier.slice(-3);
  if (identifier.length <= 6) {
    return `${visibleStart}${'*'.repeat(Math.max(0, identifier.length - 3))}`;
  }
  return `${visibleStart}${'*'.repeat(4)}${visibleEnd}`;
};

const formatAddedDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

const getMethodType = (methodName) => {
  if (!methodName) return 'unknown';
  const normalized = methodName.toLowerCase();
  if (normalized.includes('insta')) return 'insta';
  if (normalized.includes('wallet') || normalized.includes('e-wallet') || normalized.includes('ewallet')) return 'wallet';
  return 'unknown';
};

const BillingSection = () => {
  const { data: balanceData, loading: balanceLoading } = useFetch(getWalletBalance);
  const { refetch: refreshOnboarding } = useFetch(getOnboardingStatus);
  const { data: paymentMethods, loading: paymentLoading, refetch: refreshPaymentMethods } = useFetch(getUserPaymentMethods);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [paymentType, setPaymentType] = useState('insta'); // 'insta' or 'wallet'
  const [identifier, setIdentifier] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editIdentifier, setEditIdentifier] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleAddMethod = async () => {
    if (!identifier.trim()) {
      toast.error('Please enter your account identifier.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        methodName: paymentType === 'insta' ? 'InstaPay' : 'E-Wallet',
        accountIdentifier: identifier
      };
      await addPaymentMethod(payload);
      toast.success('Billing method added successfully!');
      await Promise.all([refreshPaymentMethods(), refreshOnboarding()]);
      setIsAddingMethod(false);
      setIdentifier('');
    } catch (err) {
      toast.error('Failed to add billing method');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMethod = async (methodId) => {
    setDeletingId(methodId);
    try {
      await deletePaymentMethod(methodId);
      toast.success('Payment method removed');
      await Promise.all([refreshPaymentMethods(), refreshOnboarding()]);
      setShowDeleteConfirm(false);
    } catch (err) {
      toast.error('Failed to remove payment method');
    } finally {
      setDeletingId(null);
    }
  };
  const handleUpdateMethod = async (methodId, type) => {
    if (!editIdentifier.trim()) {
      toast.error('Please enter an account identifier.');
      return;
    }
    setUpdating(true);
    try {
      const payload = {
        methodName: type === 'insta' ? 'InstaPay' : 'E-Wallet',
        accountIdentifier: editIdentifier
      };
      await updatePaymentMethod(methodId, payload);
      toast.success('Billing method updated successfully!');
      await Promise.all([refreshPaymentMethods(), refreshOnboarding()]);
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update billing method');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div id="billing" className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Billing & Payments</h1>

      {!isAddingMethod ? (
        <div id="billing-view">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-8 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Outstanding balance</h3>
            <div className="text-5xl font-bold text-gray-900 my-2">
              {balanceLoading ? '...' : `${(balanceData?.balanceEGP ?? 0).toFixed(2)} EGP`}
            </div>
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <span>≈ {balanceLoading ? '...' : ((balanceData?.balanceEGP ?? 0) / 48).toFixed(2)} USD</span>
              <span className="text-xs px-2 py-1 bg-white rounded-md border border-gray-100">1 USD = 48.00 EGP</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-6 md:p-8 mb-8 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Billing methods</h3>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold">✓</div>
            </div>

            {paymentLoading ? (
              <div className="py-6 text-center text-gray-500 text-sm">Loading billing details...</div>
            ) : Array.isArray(paymentMethods) && paymentMethods.length > 0 ? (
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => {
                  const type = getMethodType(method.methodName);
                  const isInsta = type === 'insta';
                  const isEditing = editingId === method.id;

                  return (
                    <div key={method.id} className={`group bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm transition duration-300 hover:shadow-lg ${isEditing ? 'ring-2 ring-amber-500' : 'hover:-translate-y-0.5'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0">
                            {isInsta ? <InstaPayLogo /> : <EWalletLogo />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{method.methodName}</p>
                            <p className="text-xs text-gray-500 mt-1">Added {formatAddedDate(method.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${isInsta ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {isInsta ? 'InstaPay' : 'E-Wallet'}
                          </span>
                          {!isEditing && (
                            <>
                              <button
                                onClick={() => {
                                  setEditingId(method.id);
                                  setEditIdentifier(method.accountIdentifier);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-gray-400 hover:text-amber-600 p-1.5 hover:bg-amber-50 rounded-lg"
                                title="Edit payment method"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => {
                                  setDeletingId(method.id);
                                  setShowDeleteConfirm(true);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg"
                                title="Remove payment method"
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {isEditing ? (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                              type="text" 
                              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-gray-900 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all" 
                              value={editIdentifier}
                              onChange={e => setEditIdentifier(e.target.value)}
                              placeholder={isInsta ? "username@instapay or 01xxxxxxxxx" : "10xxxxxxxxx"}
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleUpdateMethod(method.id, type)}
                                disabled={updating}
                                className="px-5 py-2.5 bg-amber-600 text-white text-sm font-bold rounded-xl hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-sm"
                              >
                                {updating ? 'Saving...' : 'Save'}
                              </button>
                              <button 
                                onClick={() => setEditingId(null)}
                                disabled={updating}
                                className="px-5 py-2.5 bg-gray-200 text-gray-800 text-sm font-bold rounded-xl hover:bg-gray-300 disabled:opacity-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-gray-600">{formatAccountIdentifier(method.accountIdentifier)}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mb-6 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
                <p className="text-gray-500 text-sm font-medium mb-6">
                  You haven't set up any billing methods yet. Add a method so you can hire when you're ready.
                </p>
                <button 
                  className="px-8 py-3 rounded-full font-bold text-sm bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  onClick={() => setIsAddingMethod(true)}
                >
                  + Add a billing method
                </button>
              </div>
            )}

            <button
              className="w-full md:w-auto mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              onClick={() => setIsAddingMethod(true)}
            >
              + Add another billing method
            </button>

            <p className="text-xs text-gray-400 mt-4">
              Your billing method will be charged only when you hire a freelancer or purchase a service.
            </p>
          </div>
        </div>
      ) : (
        <div id="billing-add" className="bg-white rounded-3xl shadow-card-lg border border-black/5 p-6 md:p-8 mb-8 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Add a billing method</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setIsAddingMethod(false)}>✕</button>
          </div>

          <div className="flex gap-4 mb-8 bg-gray-50 p-1 rounded-2xl border border-gray-100">
            {['insta', 'wallet'].map(type => (
              <label key={type} className="flex-1 relative cursor-pointer">
                <input 
                  type="radio" 
                  name="paymentType" 
                  value={type} 
                  checked={paymentType === type}
                  onChange={() => {
                    setPaymentType(type);
                    setIdentifier('');
                  }}
                  className="hidden"
                />
                <span className={`flex items-center justify-center px-4 py-3 rounded-xl font-bold text-sm transition-all border border-transparent ${
                  paymentType === type 
                    ? 'bg-white text-amber-600 shadow-md border-gray-100 scale-[1.02]' 
                    : 'text-gray-500 hover:bg-white/50'
                }`}>
                  {type === 'insta' ? 'InstaPay' : 'E-Wallet'}
                </span>
              </label>
            ))}
          </div>

          <div className="space-y-6">
            {paymentType === 'insta' && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <label className="block font-semibold text-sm mb-2 text-gray-900 tracking-wide font-sans">
                  InstaPay Address or Mobile Number
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-amber-600 focus:ring-4 focus:ring-amber-100 focus:outline-none transition-all font-sans" 
                  placeholder="e.g. username@instapay or 01xxxxxxxxx"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                />
              </div>
            )}

            {paymentType === 'wallet' && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <label className="block font-semibold text-sm mb-2 text-gray-900 tracking-wide font-sans">
                  E-Wallet Mobile Number
                </label>
                <div className="flex gap-2 items-center">
                  <div className="w-16 h-[46px] bg-gray-50 border border-slate-200 rounded-lg flex items-center justify-center text-2xl shadow-inner">🇪🇬</div>
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-amber-600 focus:ring-4 focus:ring-amber-100 focus:outline-none transition-all font-sans" 
                    placeholder="10xxxxxxxxx" 
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              className="px-10 py-3 rounded-full font-bold text-sm bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
              onClick={handleAddMethod}
              disabled={saving}
            >
              {saving ? 'Adding...' : 'Save Method'}
            </button>
            <button 
              className="px-10 py-3 rounded-full font-bold text-sm bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-all"
              onClick={() => {
                setIsAddingMethod(false);
                setIdentifier('');
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Remove payment method?</h3>
            <p className="text-gray-600 text-sm mb-6">This action cannot be undone. You'll need to add the method again if you want to use it.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingId(null);
                }}
                disabled={deletingId !== null}
              >
                Keep it
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                onClick={() => handleDeleteMethod(deletingId)}
                disabled={deletingId === null}
              >
                {deletingId !== null ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSection;
