export default async () => {
  const { createFolder, updateFolder } = useBook()

  await createFolder().then((res) => {
    updateFolder(res.id, { name: 'Sample spaces' })
  })
}
