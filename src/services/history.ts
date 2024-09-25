let navigateFn: (path: string) => void

export const setNavigate = (navigate: (path: string) => void) => {
  navigateFn = navigate
}

export const navigate = (path: string) => {
  if (navigateFn) {
    navigateFn(path)
  }
}