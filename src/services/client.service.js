import $axios from '@/core/api-config'

class ClientService {
  registerClient ({ email, password, firstName, lastName, color, teamId, signature }) {
    return $axios.post('/api/clients/register', { email, password, firstName, lastName, color, teamId, signature })
  }

  acceptInvite ({ email, signature, teamId }) {
    return $axios.post('/api/clients/accept-invite', { email, signature, teamId })
  }

  getClients () {
    return $axios.get('/api/clients')
  }

  addClientAccessToBook ({ clientId, bookId }) {
    return $axios.post(`/api/clients/add-access-to-book/${clientId}/${bookId}`)
  }

  removeClientAccessFromBook ({ clientId, bookId }) {
    return $axios.delete(`/api/clients/remove-access-from-book/${clientId}/${bookId}`)
  }

  deleteClient (clientId) {
    return $axios.delete(`api/clients/remove/${clientId}`)
  }

  deleteTemporaryClient (clientId) {
    return $axios.delete(`api/clients/remove-temporary-client/${clientId}`)
  }

  createInviteLink () {
    return $axios.post('api/clients/createInviteLink')
  }

  getClientBooks () {
    return $axios.get('api/clients/books')
  }
}

export const clientService = new ClientService()
