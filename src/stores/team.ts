const useTeamStore = defineStore('team', () => {
  const team = ref<ITeam>(null)
  const teamId = ref<number>(null)
  const members = ref<ITeamMember[]>([])
  const totalMembers = ref<number>(null)
  const temporaryMembers = ref<ITeamMember[]>(null)
  const totalTemporaryMembers = ref<number>(null)
  const member = ref<ITeamMember>(null)

  const isOwner = computed(() => {
    const { user } = useProfile()

    return team.value?.userId === user.value?.id
  })

  const isAdmin = computed(() => member.value?.teamRole?.name === 'admin')
  const isRegularUser = computed(() => member.value?.teamRole?.name === 'user')
  const hasTeam = computed(() => team.value?.id)
  const isTeamAccount = computed(() => teamId.value)
  const hasBillingAccess = computed(() => teamId.value ? member.value?.hasBillingAccess : true)
  const hasMembers = computed(() => members.value?.length > 1)

  function updateMemberBooks ({ memberId, value }: { memberId: number; value: boolean }) {
    members.value = members.value.map(m => {
      if (memberId === m.id) {
        return { ...m, isOpen: value }
      } else {
        return m
      }
    })
  }

  function setTeamId (payload: number) {
    teamId.value = payload
  }

  function setLogo (logo: typeof team.value.teamLogo) {
    team.value.teamLogo = logo
  }

  function setTeam (value: ITeam) {
    team.value = value

    setTeamId(value.id)
  }

  function removeTeam () {
    team.value = null
    teamId.value = null
    members.value = []
    member.value = null
  }

  function setMembers (payload: { members: ITeamMember[]; totalMembers: number }) {
    members.value = payload.members
    totalMembers.value = payload.totalMembers
  }

  function setTemporaryMembers (payload: { members: ITeamMember[]; totalMembers: number }) {
    temporaryMembers.value = payload.members
    totalTemporaryMembers.value = payload.totalMembers
  }

  function handleUpdateMemberRole ({ memberId, role }: { memberId: number; role: string }) {
    if (member.value.id === memberId) {
      member.value = {
        ...member.value,
        teamRole: { name: role }
      }
    }

    const preparedMembers = members.value.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          role,
          hasBillingAccess: role === 'admin' ? true : m.hasBillingAccess
        }
      } else {
        return m
      }
    })

    members.value = preparedMembers
  }

  function handleUpdateBillingAccess ({ memberId, billingAccess }: { memberId: number; billingAccess: boolean }) {
    const preparedMembers = members.value.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          hasBillingAccess: billingAccess
        }
      } else {
        return m
      }
    })

    members.value = preparedMembers
  }

  function handleUpdateTempMemberRole ({ memberId, role }: { memberId: number; role: string }) {
    const members = temporaryMembers.value.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          teamRole: { name: role }
        }
      } else {
        return m
      }
    })

    temporaryMembers.value = members
  }

  async function getTeam () {
    try {
      const res = await teamsService.getTeam()

      team.value = res?.data.team
      setTeamId(res?.data.team?.id)
      if (res?.data.team) getMember()

      return Promise.resolve(res?.data.team)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  function getMembers (payload?: IPaginationPayload) {
    return teamsService.getMembers(payload)
      .then(({ data }) => {
        setMembers({
          members: data.members,
          totalMembers: data.totalMembers
        })
        return data.members
      }).catch((err) => {
        console.log(err)
      })
  }

  function getTemporaryMembers (payload: IPaginationPayload = {}) {
    teamsService.getTemporaryMembers(payload)
      .then(({ data }) => {
        setTemporaryMembers({
          members: data.temporaryMembers,
          totalMembers: data.totalMembers
        })
      })
  }

  function getMember () {
    return teamsService.getMember().then(({ data }) => {
      member.value = data.member

      return data.member
    })
  }

  async function registerTeam (payload: {
    firstName: string
    lastName: string
    color: string
    email: string
    password: string
    teamName: string
    inviteLink: string
    size: number
  }) {
    const { setToken } = useAuth()

    try {
      // create user and set token
      const { data } = await teamsService.register(payload)
      setToken(data.token)
      team.value = data.team
      setTeamId(data.team.id)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function createTeam (payload) {
    try {
      const { data } = await teamsService.createTeam(payload)
      team.value = data.team
      setTeamId(data.team.id)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // TODO clear this func cuz not used anywhere?
  async function acceptInvite (payload: any) {
    try {
      const { data } = await teamsService.acceptInvite(payload)
      team.value = data.team
      setTeamId(data.team.id)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async function acceptInviteAndCreateUser (payload: {
    firstName: string
    lastName: string
    color: string
    inviteLink: string
    signature: string
    expire: string
    email: string
    teamId: number
    password: string
  }) {
    const { setToken } = useAuth()

    try {
      const { data } = await teamsService.acceptInviteAndCreateUser(payload)
      setToken(data.token)
      team.value = data.team
      setTeamId(data.team.id)

      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  function updateMemberRole ({ id, role }: { id: number; role: string }) {
    teamsService.updateMemberRole({
      roleName: role,
      memberId: id
    }).then(() => {
      handleUpdateMemberRole({
        memberId: id,
        role
      })
    })
  }

  function updateTempMemberRole ({ id, role }: { id: number; role: string }) {
    teamsService.updateTempMemberRole({
      roleName: role,
      memberId: id
    }).then(() => {
      handleUpdateTempMemberRole({
        memberId: id,
        role
      })
    })
  }

  function updateBillingAccess ({ id, billingAccess }: { id: number; billingAccess: boolean }) {
    teamsService.updateBillingAccess({
      billingAccess,
      memberId: id
    }).then(() => {
      handleUpdateBillingAccess({
        memberId: id,
        billingAccess
      })
    })
  }

  async function setTeamName (name: string) {
    const result = await teamsService.setTeamName(name)

    team.value.name = result.data.name
    team.value.link = result.data.link
  }

  return {
    team,
    teamId,
    members,
    totalMembers,
    temporaryMembers,
    totalTemporaryMembers,
    member,
    isOwner,
    isAdmin,
    isRegularUser,
    hasTeam,
    isTeamAccount,
    hasBillingAccess,
    hasMembers,
    updateMemberBooks,
    setTeamId,
    setLogo,
    setTeam,
    removeTeam,
    setMembers,
    setTemporaryMembers,
    handleUpdateMemberRole,
    handleUpdateBillingAccess,
    handleUpdateTempMemberRole,
    getTeam,
    getMembers,
    getTemporaryMembers,
    getMember,
    registerTeam,
    createTeam,
    acceptInvite,
    acceptInviteAndCreateUser,
    updateMemberRole,
    updateTempMemberRole,
    updateBillingAccess,
    setTeamName
  }
})

export function useTeam () {
  const teamStore = useTeamStore()

  return {
    ...teamStore,
    ...storeToRefs(teamStore)
  }
}
