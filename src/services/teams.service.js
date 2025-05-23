import $axios from '@/core/api-config'
class TeamsService {
  createTeam ({ teamName, inviteLink }) {
    return $axios.post('/api/teams/createTeam', { teamName, inviteLink })
  }

  sendVerificationCode (payload) {
    return $axios.post('/api/teams/sendVerificationCode', payload)
  }

  verifyCode (payload) {
    return $axios.post('/api/teams/verifyCode', payload)
  }

  inviteMembers ({ emails, bookIds }) {
    return $axios.post('/api/teams/inviteMembers', { emails, bookIds })
  }

  inviteClients ({ emails, bookIds }) {
    return $axios.post('/api/clients/send-invites', { emails, bookIds })
  }

  acceptInvite (payload) {
    return $axios.post('/api/teams/acceptInvite', payload)
  }

  checkEmail (email) {
    return $axios.post('/api/teams/checkEmail', { email })
  }

  getTeam () {
    return $axios.get('/api/teams')
  }

  getTeamByInviteLink (inviteLink) {
    return $axios.get(`/api/teams/inviteLink/${inviteLink}`)
  }

  getMembers ({ limit = 10000, page = 0, column = 'name', direction = 'ASC', search = '' } = {}) {
    const s = search ? `&search=${search}` : ''
    return $axios.get(`/api/teams/members?limit=${limit}&page=${page}&column=${column}&direction=${direction}${s}`)
  }

  getTemporaryMembers ({ limit = 100, page = 0, column = 'name', direction = 'ASC', search = '' } = {}) {
    const s = search ? `&search=${search}` : ''
    return $axios.get(`/api/teams/temporary/members?limit=${limit}&page=${page}&column=${column}&direction=${direction}${s}`)
  }

  getMember () {
    return $axios.get('/api/teams/member')
  }

  addMemberToSpace ({ memberId, bookId }) {
    return $axios.post(`api/teams/member/${memberId}/${bookId}`)
  }

  createInviteLink () {
    return $axios.post('api/teams/createInviteLink')
  }

  removeMemberFromSpace ({ memberId, bookId }) {
    return $axios.delete(`api/teams/member-access/${memberId}/${bookId}`)
  }

  deleteMember (memberId) {
    return $axios.delete(`api/teams/member/${memberId}`)
  }

  deleteTemporaryMember (memberId) {
    return $axios.delete(`api/teams/member/temporary/${memberId}`)
  }

  updateMemberRole ({ memberId, roleName }) {
    return $axios.put(`api/teams/member/${memberId}`, { roleName })
  }

  updateTempMemberRole ({ memberId, roleName }) {
    return $axios.put(`api/teams/temporary/member/${memberId}`, { roleName })
  }

  updateBillingAccess ({ memberId, billingAccess }) {
    return $axios.put(`api/teams/member/billing-access/${memberId}`, { hasBillingAccess: billingAccess })
  }

  setTeamName (name) {
    return $axios.put('api/teams/rename', { name })
  }

  register (payload) {
    return $axios.post('/api/teams/register', payload)
  }

  acceptInviteAndCreateUser (payload) {
    return $axios.post('/api/teams/acceptInviteAndCreateUser', payload)
  }

  upload (data) {
    const { token } = useAuth()

    const headers = {
      'Content-Type': 'multipart/form-data',
      auth: token.value
    }

    return $axios.post('/api/teams/upload', data, headers)
  }

  deleteLogo () {
    return $axios.delete('api/teams/logo')
  }
}

export const teamsService = new TeamsService()
