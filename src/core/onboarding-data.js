export default {
  Today: [
    {
      id: 'onboardingOverviewMenuItem',
      title: 'Overview',
      description: 'The Overview page is your homepage, allowing you to create and save multiple task views and switch between them to see your tasks from different angles.<br/><br/>We&apos;ve already created two useful views for you, grouped by due date and by space.'
    },
    {
      id: 'onboardingCreateTask',
      title: 'Create a task',
      description: 'Adding tasks is easy. To do this quickly, use the &apos;New task&apos; button in the sidebar (or the keyboard shortcut Alt+C).<br/><br/> Let\'s add a task now, click the &apos;New task&apos; button to get started.',
      position: 'new-task'
    },
    {
      id: 'onboardingOverviewMenuItemHeader',
      title: 'Overview',
      description: 'The Overview page is your homepage, allowing you to create and save multiple task views and switch between them to see your tasks from different angles.<br/><br/>We&apos;ve already created two useful views for you, grouped by due date and by space.'
    }
  ],
  Chat: [
    {
      id: 'onboardingChatProjects',
      title: 'Real-time team chat',
      description: 'Chats are categorized into <span class="italic">Space chats</span> and  <span class="italic">1-on-1 chats.</span> <br/> <br/>When you create a new space, a space-specific chat is automatically added, helping to keep your conversations focused and relevant.',
      position: 'right'
    }
  ],
  TeamBooks: [
    {
      id: 'onboardingProjectsMenuItem',
      title: 'Your spaces',
      description: 'This page shows all your spaces, helping you categorize tasks like projects.<br/><br/>It’s recommended to create a space for each subject, such as work projects, daily to-dos, event planning, or notes, to keep everything organized and focused.'
    },
    {
      id: 'onboardingProjectsMenuItemHeader',
      title: 'Your spaces',
      description: 'This page shows all your spaces, helping you categorize tasks like projects.<br/><br/>It’s recommended to create a space for each subject, such as work projects, daily to-dos, event planning, or notes, to keep everything organized and focused.'
    },
    {
      id: 'onboardingAddProject',
      title: 'Create a new space',
      description: 'Use the <span class="italic">+ New space</span> button to create a new space.'
    },
    {
      id: 'onboardingAddProjectHeader',
      title: 'Create a new space',
      description: 'Use the <span class="italic">“+“ New space</span> button to create a new space.'
    },
    {
      id: 'onboardingSampleProject',
      title: 'This is a sample space',
      description: 'Check out this <span class="italic">example space</span> to familiarize yourself with managing spaces in Complex.<br/><br/>We recommend you to delete it when you checked it out.',
      position: 'center'
    },
    {
      id: 'onboardingSampleProjectHeader',
      title: 'This is a sample space',
      description: 'Check out this <span class="italic">example space</span> to familiarize yourself with managing spaces in Complex.<br/><br/>We recommend you to delete it when you checked it out.',
      position: 'center'
    }
    // {
    //   id: 'onboardingRecentNotes',
    //   title: 'Recently viewed',
    //   description: 'Here, you\'ll find the most recent tasks and notes you\'ve viewed, allowing you to quickly navigate back.',
    //   position: 'top-left-no-gap'
    // },
    // {
    //   id: 'onboardingRecentNotesHeader',
    //   title: 'Recently viewed',
    //   description: 'Here, you\'ll find the most recent tasks and notes you\'ve viewed, allowing you to quickly navigate back.',
    //   position: 'top-left-no-gap'
    // }
  ],
  TeamMembers: [
    {
      id: 'onboardingPeopleMenuItemHeader',
      title: 'The Team',
      description: 'This is the <span class="italic">team overview page.</span> All the members of your workspace will be shown here. '
    },
    {
      id: 'onboardingPeopleMenuItem',
      title: 'The Team',
      description: 'This is the <span class="italic">team overview page.</span> All the members of your workspace will be shown here. ',
      position: 'top-middle'
    },
    {
      id: 'onboardingInvitePeople',
      title: 'Invite your team',
      description: (name) => `This is where you <span class="italic">invite your team members</span>
                              and guests to the <span>${name}</span> workspace.`,
      position: 'top-right-no-gap'
    },
    {
      id: 'onboardingInvitePeopleHeader',
      title: 'Invite your team',
      description: (name) => `This is where you <span class="italic">invite your team members</span>
                              and guests to the <span>${name}</span> workspace.`
    }
  ],
  CalendarTeam: [
    {
      id: 'onboardingCalendarMenuItem',
      title: 'Calendar',
      description: 'The calendar combines every task from all spaces in one overview. Only tasks with <span class="italic">due dates</span> appear here.',
      position: 'calendar'

    },
    {
      id: 'onboardingCalendarMenuItemHeader',
      title: 'Calendar',
      description: 'The calendar combines every task from all spaces in one overview. Only tasks with <span class="italic">due dates</span> appear here.'
    }
  ],
  TaskBoardTeam: [
    {
      id: 'onboardingTaskManagement',
      title: 'Inside a space',
      description: 'This is where you manage all the tasks that you added to this space or project.<br/> <br/> Rearrange your tasks by simply dragging and dropping them. Click on a task to open it and add details, or right-click to quickly assign attributes.',
      position: 'task-board'
    },
    {
      id: 'onboardingTasksFilter',
      title: 'Filters, grouping and sorting',
      description: 'Managing your tasks with Complex.so is incredibly powerful. <br/> <br/> In the display menu, you\'ll find options to filter, group and sort your tasks, as well as change your tasks view (Board, List, or Calendar), giving you different ways to view your tasks.'
    }
    // Temporary disabled
    // {
    //   id: 'onboardingSwitchTaskView',
    //   title: 'Switch task view',
    //   description: 'You can switch task views here. You can choose between a <span class="italic">Kanban board</span>, a <span class="italic">list view,</span> and a  <span class="italic">calendar view</span>. This helps you to view your work from all angles.'
    // }
  ],
  TeamBook: [
    {
      id: 'onboardingPagesMenuDropdown',
      title: 'Notes menu',
      description: 'This is the notes menu. Here you’ll find all the notes that are part of this space.',
      position: 'top-right'
    },
    {
      id: 'onboardingPageContent',
      title: 'This is a note',
      description: 'Notes work like the <span class="italic">documents</span> you’re used to. Anything you type is <span class="italic">auto-saved</span> instantly.<br/> <br/> You can use <span class="italic">@ to link</span> to any task or note.<br/> <br/> Notes can be edited <span class="italic">together with your team in real-time</span>.',
      position: 'top-right'
    }
  ],
  WeekPlanner: [
    {
      id: 'onboardingWeekPlannerItem',
      title: 'Plan your week',
      description: 'The week planner helps you to organize and visualize your tasks for the upcoming week.',
      position: 'center'
    },
    {
      id: 'onboardingWeekPlannerItemHeader',
      title: 'Plan your week',
      description: 'The week planner helps you to organize and visualize your tasks for the upcoming week.',
      position: 'center'
    }
  ]
}
