class LocalStorageService {
  hasKey (key) {
    return localStorage.getItem(key) !== null
  }

  removeItem (key) {
    return localStorage.removeItem(key)
  }

  getItem (key) {
    const item = localStorage.getItem(key)
    return item !== null
      ? JSON.parse(item)
      : undefined
  }

  setItem (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  clear () {
    localStorage.clear()
  }
}

export default new LocalStorageService()
