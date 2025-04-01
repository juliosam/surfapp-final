"use client";

import React, { useState } from "react";
//import { useSession } from "next-auth/react";
import { useAuth } from "@/app/hooks/useAuth";
//import { getUserMeLoader } from "@/services/user-me-loader";
//import Image from "next/image";
//import logo from "@/app/icon.png";

interface Plan {
  link: string;
  priceId: string;
  price: number;
  duration: string;
}

type User = {
  email: string;
};

type Data = {
  user?: User | null;
};

// Stripe Plans >> fill in your own priceId & link
export const plans: Plan[] = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVa6rf6o4bNb92w3cc"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R4s3RFkEdyUEdaM2aZ4Uh3x"
        : "",
    price: 19,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_5kAeXLfYEcRf4MgcMN"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R68pRFkEdyUEdaM6cWI7xPH"
        : "",
    price: 99,
    duration: "/year",
  },
];

const Pricing: React.FC = () => {
  //const { data: session } = useSession();
  //const user = getUserMeLoader();
  const data: Data = useAuth();
  const [plan, setPlan] = useState<Plan>(plans[0]);

  //console.log(data.user.email);

  return (
    <>
      <section id="pricing">
        <div className="py-24 px-8 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="font-medium text-primary mb-5">Pricing</p>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
              Hello YouTube
            </h2>
          </div>

          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            <div className="w-full max-w-lg">
              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
                <div className="flex items-center gap-8">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[0])}
                  >
                    <input
                      type="radio"
                      name="monthly"
                      className="radio"
                      checked={plan.price === 19}
                      readOnly
                    />
                    <span>Pay monthly</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[1])}
                  >
                    <input
                      type="radio"
                      name="yearly"
                      className="radio"
                      checked={plan.price === 99}
                      readOnly
                    />
                    <span>Pay yearly (60% OFF 💰)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="text-5xl tracking-tight font-extrabold">
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                      {plan.duration}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                  {[
                    "NextJS boilerplate",
                    "User oauth",
                    "Database",
                    "Emails",
                    "1 year of updates",
                    "24/7 support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="w-[18px] h-[18px] opacity-80 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <a
                    className="btn btn-primary btn-block"
                    target="_blank"
                    href={
                      plan.link + "?prefilled_email=" + (data.user?.email || "")
                    }
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fixed right-8 bottom-8">
        <a
          href="https://shipfa.st?ref=stripe_pricing_viodeo"
          className="bg-white font-medium inline-block text-sm border border-base-content/20 hover:border-base-content/40 hover:text-base-content/90 hover:scale-105 duration-200 cursor-pointer rounded text-base-content/80 px-2 py-1"
        >
          <div className="flex gap-1 items-center">
            <span>Built with</span>
            <span className="font-bold text-base-content flex gap-0.5 items-center tracking-tight">
              {/* <Image
                src={logo}
                alt="ShipFast logo"
                priority
                width={20}
                height={20}
                className="w-5 h-5"
              /> */}
              ShipFast
            </span>
          </div>
        </a>
      </section>
    </>
  );
};

export default Pricing;
