import { SubscriptionPlanPaymentMethod } from "services/subscription/interfaces"

export type ModalStep = 'PlanConfirmation' | 'PaymentMethodSelection' | 'StripePayment' | 'SuccessfulPayment' | 'FailedPayment'

export interface ModalState {
    step: ModalStep;
    stripeClientSecret?: string;
    intentType?: 'payment' | 'setup';
    selectedPaymentMethod: SubscriptionPlanPaymentMethod;
}