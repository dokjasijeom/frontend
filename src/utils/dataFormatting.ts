export function getFormData(object: { [x: string]: any }) {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    formData.append(key, object[key])
  })
  return formData
}

export function getImageUrl(file: Blob | MediaSource | null) {
  let imageUrl = ''

  if (file) {
    imageUrl = URL.createObjectURL(file)
  }

  return imageUrl
}
