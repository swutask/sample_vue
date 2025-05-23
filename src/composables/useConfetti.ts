import confetti from 'canvas-confetti'

const confettiCount = 200
const defaults = { origin: { y: 0.7 } }

function fire (particleRatio: number, options = {}) {
  confetti({
    ...defaults,
    ...options,
    particleCount: Math.floor(confettiCount * particleRatio)
  })
}

export default function useConfetti () {
  function showConfetti () {
    const confettiConfigs = [
      { particleRatio: 0.25, options: { spread: 26, startVelocity: 55 } },
      { particleRatio: 0.2, options: { spread: 60 } },
      { particleRatio: 0.35, options: { spread: 100, decay: 0.91, scalar: 0.8 } },
      { particleRatio: 0.1, options: { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 } },
      { particleRatio: 0.1, options: { spread: 120, startVelocity: 45 } }
    ]

    confettiConfigs.forEach(({ particleRatio, options }) => fire(particleRatio, options))
  }

  return {
    showConfetti
  }
}
