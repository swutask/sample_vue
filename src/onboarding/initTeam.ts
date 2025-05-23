import { firstTeamBook } from '@/onboarding'
import createSampleFolder from '@/onboarding/sample-spaces/creareSampleSpaceFolder'
// import createMoviesSpace from '@/onboarding/sample-spaces/movie-space/createMoviesSpace'
import createNotesSpace from '@/onboarding/sample-spaces/notes/createNotesSpace'
import createKitchenSpace from '@/onboarding/sample-spaces/kitchen-renovation/createKitchenSpace'

export default async ({ settings }) => {
  let teamInitializationStarted = false

  try {
    window.addEventListener('beforeunload', (e) => {
      if (!teamInitializationStarted) return
      e.preventDefault()
      // Chrome requires returnValue to be set.
      e.returnValue = 'Your work workspace is not set up yet, do you still want to leave?'
    })

    teamInitializationStarted = true
    await createSampleFolder()

    // await createMoviesSpace()
    await createNotesSpace()
    await createKitchenSpace()
    await firstTeamBook({ settings })

    teamInitializationStarted = false

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
