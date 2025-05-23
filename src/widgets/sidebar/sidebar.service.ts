import $axios from '@/core/api-config'

class SidebarService {
  getNavigationTools () {
    return $axios.get('/api/settings/sidebar-tools')
  }

  updateSidebarTools (tool) {
    return $axios.put('/api/settings/sidebar-tools', tool)
  }
}

export const sidebarService = new SidebarService()
