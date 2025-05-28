import { motion } from 'framer-motion'
import React from 'react'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'
import PlanCard from './PlanCard'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

const PlanCards = () => {
  const { t } = useLocaleResources('onboarding')
  const radius = 193 // radius of the circle
  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    return {
      left: `calc(30% + ${x}px)`,
      top: `calc(35.5% + ${y}px)`
    }
  }

  const plans = Object.entries(subscriptionPlans)

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transformOrigin: 'center center'
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 120,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {plans.map(([key, plan], index) => (
        <motion.div
          key={key}
          style={{
            position: 'absolute',
            ...calculatePosition(index, plans.length),
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center center'
          }}
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <PlanCard
            icon={<plan.icon color="white" />}
            title={t(plan.title)}
            description={t(plan.description)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PlanCards