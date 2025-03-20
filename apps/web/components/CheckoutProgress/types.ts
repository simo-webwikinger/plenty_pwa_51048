export type Step = {
  name: string;
  link?: string; // optional
  action?: () => void; // optional | to handle confirmation clicked on the ckeckout prograss bar
};

export type CheckoutProgressProps = {
  steps: Step[];
  activeStepIndex: number;
};