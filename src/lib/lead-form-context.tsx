"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type LeadFormState = { open: boolean; plan?: string };

type LeadFormCtx = {
  state: LeadFormState;
  openLeadForm: (plan?: string) => void;
  closeLeadForm: () => void;
};

const Ctx = createContext<LeadFormCtx | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LeadFormState>({ open: false });

  return (
    <Ctx.Provider
      value={{
        state,
        openLeadForm: (plan) => setState({ open: true, plan }),
        closeLeadForm: () => setState({ open: false }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLeadForm must be used inside LeadFormProvider");
  return ctx;
}
