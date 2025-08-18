"use client";

import { useTransition } from "react";
import { subscribeMembershipAction } from "~/server/actions";

interface MembershipPlan {
  id: string;
  title: string;
  price: string;
  description: string | null;
}

export default function CreatorMembershipsView({
  plans,
  pageHandle,
}: {
  plans: MembershipPlan[] | null;
  pageHandle: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = (membershipId: string) => {
    startTransition(async () => {
      const res = await subscribeMembershipAction({ membershipId, pageHandle });
      alert(res.message);
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6">Membership Plans</h2>
      <div className="space-y-4">
        {plans?.map((plan) => (
          <div key={plan.id} className="bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="p-4">
              <h3 className="text-lg font-semibold">{plan.title}</h3>
              <p>${plan.price}<span className="text-sm">/month</span></p>
              {plan.description && <p className="mt-2 text-sm whitespace-pre-line">{plan.description}</p>}
              <div className="mt-4 flex space-x-2">
                <button
                  disabled={isPending}
                  className="px-3 py-1 text-sm bg-white text-black rounded-md hover:bg-gray-200 disabled:opacity-60"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isPending ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {plans?.length === 0 && (
        <div className="bg-neutral-800 rounded-lg p-8 text-center border border-neutral-700">
          <p className="text-neutral-400">This creator hasn't created any memberships yet</p>
        </div>
      )}
    </div>
  );
}
