export const getSession = () => {
    return localStorage.getItem("mySession")
}
export const setSession = (mySession) => {
    localStorage.setItem("mySession", mySession)
}