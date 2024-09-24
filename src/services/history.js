let navigateFn

export const setNavigate = (navigate) => {
  navigateFn = navigate
}

export const navigate = (path) => {
  if (navigateFn) {
    navigateFn(path)
  }
}