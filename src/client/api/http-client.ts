export async function request(uri: string, options: RequestInit = {}) {
  const headers = [['Content-Type', 'application/json']]

  const response = await fetch(`${process.env.API_PROXY_PATH}${uri}`, {
    method: 'GET',
    headers,
    ...options,
  })

  if (response.ok) {
    // use reviver to support Date deserialization
    return JSON.parse(await response.text(), reviver)
  }
  throw await response.json()
}

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

function reviver(key: string, value: any): any | Date {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value)
  }

  return value
}
