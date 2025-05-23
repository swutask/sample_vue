import router from '@/router'
import localStorageService from '@/core/local-storage'
import { removeEmpty } from '@/core/helper-functions'

class PageFilterUtils {
  getFilter ({
    localStorageKey = '',
    additionalFilter = {} as TIndexedObject,
    ignoreQuery = false
  } = {}) {
    const filters = localStorageService.getItem(localStorageKey)

    const mergedFilter: TIndexedObject = { ...additionalFilter, ...filters }
    const query: TIndexedObject = router.currentRoute.value.query || {}

    return {
      ...mergedFilter,
      // Parse route.query and transform all Array like & Number like strings into Array, Number
      ...(ignoreQuery
        ? {}
        : removeEmpty(Object.keys(mergedFilter))
          .reduce((obj: TIndexedObject, key: string) => {
            if (query[key]) {
              if (Array.isArray(mergedFilter[key])) obj[key] = query[key].split?.() || query[key]
              if (typeof mergedFilter[key] === 'number' && isFinite(query[key])) obj[key] = +query[key]
              else obj[key] = query[key]
            }
            return obj
          }, {}))
    }
  }
}

export const pageFilterUtils = new PageFilterUtils()
