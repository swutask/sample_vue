import { attachmentService } from '@/pages/file-manager/attachment.service'

export default (props, showInFileManager = true) => {
  const { setFile } = useFile()
  const { createNewVersion } = useAttachment()
  const { share } = useProject()
  const { checkLimits } = usePlan()
  const { handleLoading } = useGeneral()

  async function uploadToS3 (file, oldVersion = null) {
    handleLoading(!!oldVersion)

    try {
      if (checkLimits(file.size)) {
        handleLoading(false)

        return
      }

      const projectId = props.projectId
      const taskId = props.taskId
      const bookId = props.bookId
      const messageId = props.messageId

      const AWS = window.AWS

      if (!AWS) {
        handleLoading(false)
        throw new Error('AWS not found')
      }

      AWS.config.update({
        region: 'eu-central-1',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-central-1:6c25ba0f-af55-402a-896a-c52812ec3398'
        })
      })

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: import.meta.env.VITE_APP_AWS_BUCKET }
      })

      const { setNotification } = useGeneral()
      if (file.size / 1024 / 1024 >= 500) {
        handleLoading(false)
        return setNotification({ uuid: window.crypto.randomUUID(), message: 'File size too big, uploads up to 500MB are allowed', color: 'error' })
      }

      if (oldVersion && oldVersion.mimeType !== file.type) {
        handleLoading(false)
        return setNotification({ uuid: window.crypto.randomUUID(), message: 'File must be the same format as the original version', color: 'error' })
      }

      let uploadedFile = null

      if (oldVersion) {
        const res = await createNewVersion({
          name: file.name,
          size: file.size,
          originalId: oldVersion.id
        })

        uploadedFile = res.data.attachment
      } else {
        const options = {
          taskId,
          projectId,
          messageId,
          bookId,
          showInFileManager,

          files: [
            {
              shareId: share.value?.id,
              mimeType: file.type || 'application/octet-stream',
              size: file.size,
              name: file.name
            }
          ]
        }

        const methodName = props.isShared ? 'createFileShared' : 'createFile'

        const response = await attachmentService[methodName](options)
        uploadedFile = response.data.files[0]
      }

      setFile({ id: uploadedFile.id, percent: 1, bookId })
      const localKey = oldVersion ? oldVersion.key : uploadedFile.key
      const url = `https://${import.meta.env.VITE_APP_AWS_BUCKET}.s3.eu-central-1.amazonaws.com/${localKey}`

      // s3 upload
      const request = await s3.putObject({
        Key: localKey,
        Body: file,
        ContentType: file.type || 'application/octet-stream',
        ACL: 'public-read'
      }).on('httpUploadProgress', (evt) => {
        setFile({
          id: uploadedFile.id,
          percent: parseInt((evt.loaded * 100) / evt.total) || 1,
          bookId: props.bookId,
          abort: () => setTimeout(() => request.abort(), 50)
        })
      })

      const updateOptions = {
        taskId,
        projectId,
        messageId,
        bookId,
        key: localKey,
        getExternalVersionId: true,
        url: oldVersion ? null : url,
        id: uploadedFile.id,
        shareId: share?.value?.id
      }

      if (oldVersion) {
        await request.promise()
        setFile({ id: uploadedFile.id, percent: -1, bookId: props.bookId })
        const method = props.isShared ? 'updateFileShared' : 'updateFile'
        const res = await attachmentService[method](updateOptions)
        uploadedFile = res.data.attachment
      } else {
        request.promise().then(() => {
          setFile({ id: uploadedFile.id, percent: -1, bookId: props.bookId })
          const method = props.isShared ? 'updateFileShared' : 'updateFile'
          attachmentService[method](updateOptions)
        })
      }

      handleLoading(false)

      return {
        ...uploadedFile,
        percent: 1,
        url
      }
    } catch (error) {
      handleLoading(false)
      console.log(error)
    }
  }

  function upload (files, oldVersion = null) {
    try {
      const map = files.map(file => uploadToS3(file, oldVersion))

      return Promise.allSettled(map).then(res => {
        return res.reduce((acc, file) => {
          if (file.value) acc.push(file.value)
          return acc
        }, [])
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    upload
  }
}
