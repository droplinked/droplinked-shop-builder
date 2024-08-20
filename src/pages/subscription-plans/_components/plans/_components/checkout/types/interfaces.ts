import { SubscriptionPlanPaymentMethod } from "lib/apis/subscription/interfaces"

export type ModalStep = 'PlanConfirmation' | 'PaymentMethodSelection' | 'StripePayment' | 'SuccessfulPayment' | 'FailedPayment'

export interface ModalState {
    modalStep: ModalStep;
    stripeClientSecret: string;
    selectedPaymentMethod: SubscriptionPlanPaymentMethod;
}