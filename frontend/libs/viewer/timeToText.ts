export default (time: number) => {
  const min = `00${Math.floor(time / 60)}`.slice(-2)
  const sec = `00${Math.floor(time % 60)}`.slice(-2)
  return `${min}:${sec}`
}
