import { defineStore } from 'pinia'
import { clientService } from '@/services'

const useClientStore = defineStore('client', () => {
  const clients = ref<IClient[]>([])
  const totalClients = ref(0)
  const temporaryClients = ref<ITemporaryClient[]>([])
  const totalTemporaryClients = ref(0)
  const clientTeams = ref<IClientTeams[]>([])

  async function getClients () {
    try {
      const res = await clientService.getClients()
      if (!res) return

      const { data } = res
      clients.value = data.clients
      totalClients.value = data.clients.length
      temporaryClients.value = data.temporaryClients
      totalTemporaryClients.value = data.temporaryClients.length

      return Promise.resolve(data.clients)
    } catch (error) {
      Promise.reject(error)
    }
  }

  async function registerClient (payload) {
    const { setToken } = useAuth()

    try {
      // create user and set token
      const { data } = await clientService.registerClient(payload)
      setToken(data.token)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function getClientBooks () {
    const { data } = await clientService.getClientBooks()

    clientTeams.value = data.teams

    return data.teams
  }

  async function acceptInvite (payload) {
    try {
      const { setTeam, setTeamId } = useTeam()
      const { data } = await clientService.acceptInvite(payload)

      setTeam(data.team)
      setTeamId(data.team.id)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    clients,
    totalClients,
    temporaryClients,
    totalTemporaryClients,
    clientTeams,
    getClients,
    registerClient,
    getClientBooks,
    acceptInvite
  }
})

export function useClient () {
  const store = useClientStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
