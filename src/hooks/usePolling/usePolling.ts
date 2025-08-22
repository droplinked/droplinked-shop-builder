import { useEffect, useRef, useState } from 'react'

interface UsePollingOptions {
    interval?: number
    maxAttempts?: number
    onSuccess?: (data?: any) => void
    onError?: (error: any) => void
    onTimeout?: () => void
}

export const usePolling = (options: UsePollingOptions = {}) => {
    const {
        interval = 5000,
        maxAttempts = 60, // 5 minutes max
        onSuccess,
        onError,
        onTimeout
    } = options

    const [isPolling, setIsPolling] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const attemptsRef = useRef<number>(0) // Use ref to avoid stale closure issues

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
                pollingIntervalRef.current = null
            }
            setIsPolling(false)
            setIsProcessing(false)
            setAttempts(0)
            attemptsRef.current = 0
        }
    }, [])

    const startPolling = (pollFunction: () => Promise<boolean>) => {
        setIsPolling(true)
        setAttempts(0)
        attemptsRef.current = 0

        // Poll every specified interval
        pollingIntervalRef.current = setInterval(async () => {
            try {
                attemptsRef.current += 1
                setAttempts(attemptsRef.current)

                const isReady = await pollFunction()

                if (isReady) {
                    stopPolling()
                    onSuccess?.()
                    return
                }

                // Check if max attempts reached using ref to avoid stale closure
                if (attemptsRef.current >= maxAttempts) {
                    stopPolling()
                    onTimeout?.()
                    return
                }
            } catch (error) {
                console.error('Error during polling:', error)
                onError?.(error)
                stopPolling()
            }
        }, interval)
    }

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
        }
        setIsPolling(false)
        setIsProcessing(false)
        setAttempts(0)
        attemptsRef.current = 0
    }

    const startProcessing = () => {
        setIsProcessing(true)
    }

    const stopProcessing = () => {
        setIsProcessing(false)
    }

    return {
        // State
        isPolling,
        isProcessing,
        isLoading: isProcessing || isPolling,
        attempts,

        // Functions
        startPolling,
        stopPolling,
        startProcessing,
        stopProcessing
    }
} 