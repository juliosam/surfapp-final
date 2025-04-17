'use client';

import { Metadata } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Pricing from "@/components/Pricing";

const metadata: Metadata = {
  title: "Upgrade to Auth-plus | SurfApp",
  description: "Upgrade your account to access the seller dashboard and bulk selling features",
};

export default function UpgradePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("Failed to start checkout process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upgrade to Auth-plus
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Get access to the seller dashboard and bulk selling features
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Auth-plus Plan</h2>
              <p className="mt-2 text-gray-600">$20.00 USD</p>
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="mt-4 w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Upgrade Now"}
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Features included:</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to seller dashboard
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Bulk selling features
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Pricing />
    </main>
  );
}
