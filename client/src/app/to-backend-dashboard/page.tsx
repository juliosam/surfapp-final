import { LogoutButton } from "@/components/LogoutButton";
//import Pricing from "@/components/Pricing";
import React from "react";

export default function ToBEDashboard() {
  return (
    <div className="container mx-auto px-4 flex justify-between items-center my-4">
      <h2 className="text-xl">To BE Dashboard</h2>
      <LogoutButton />
      {/* <Pricing /> */}
    </div>
  );
}
