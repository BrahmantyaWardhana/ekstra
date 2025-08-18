'use client'

import { useRouter } from 'next/navigation';

interface MembershipPlans {
  id: string,
  title: string,
  price: string,
  description: string | null,
}

export default function CreatorMembershipsView( {plans} : {plans : MembershipPlans[] | null} ) {
  const router = useRouter();

  const handleSubscribeMembership = (membershipId: string) => {
    router.push(`/creator/dashboard/editmembership/${membershipId}`);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6">Membership Plans</h2>

      <div className="space-y-4">
        {plans?.map((plan) => (
          <div 
            key={plan.id}
            className="bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">{plan.title}</h3>
              </div>
              <p className="">${plan.price}<span className="text-sm">/month</span></p>
              
              {plan.description && (
                <p className="mt-2 text-sm whitespace-pre-line">{plan.description}</p>
              )}
              
              <div className="mt-4 flex space-x-2">
                <button 
                  className="px-3 py-1 text-sm bg-white text-black rounded-md hover:bg-gray-200 cursor-pointer flex items-center justify-center transition-colors"
                  onClick={() => handleSubscribeMembership(plan.id)}  
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans?.length === 0 && (
        <div className="bg-neutral-800 rounded-lg p-8 text-center border border-neutral-700">
          <p className="text-neutral-400 mb-4">This creator haven't created any memberships yet</p>
        </div>
      )}
    </div>
  );
}