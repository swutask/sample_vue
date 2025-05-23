export function getAssignedSubTasks (task: ITask, completedFilter: IShowCompletedFilter, members: ITeamMember[]) {
  let memberUserIds = []

  if (Array.isArray(members)) {
    memberUserIds = members.map(m => m.userId)
  }

  return task.subTask.filter(s => {
    const teamMembersCondition = s.teamMembers.some(m => memberUserIds.includes(m.userId))

    let completedCondition = true

    switch (completedFilter?.label) {
      case 'None':
        completedCondition = !s.completedAt
        break
      // case 'Last 7 days':
      //   completedCondition = !!s.completedAt
      //   break
      // case 'Today':
      //   completedCondition = !!s.completedAt
      //   break
      default:
        completedCondition = true
        break
    }

    return teamMembersCondition && completedCondition
  })
}
