export const parseURLQuery = () => {
  const result = {}
  location
    .href
    .split('?')[1]
    .split('&')
    .forEach((param) => {
      const [key, value] = param.split('=')
      result[key] = value
    })
  return result
}