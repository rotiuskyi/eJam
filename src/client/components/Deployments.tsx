import './Deployments.css'

import { useCallback, FormEvent, useState, useEffect } from 'react'
import { Container, Form, Table, Loader } from 'semantic-ui-react'
import {
  getDeployments,
  getDeploymentTemplates,
  createDeployment as createNewDeployment,
} from 'api/deployments'
import { IDeploymentTemplate, IDeployment } from 'shared'

export default () => {
  // loaded templates and deployments data
  const [deploymentTemplates, setDeploymentTemplates] = useState<
    IDeploymentTemplate[]
  >([])
  const [deployments, setDeployments] = useState<IDeployment[]>([])

  // draft deployment data
  const [url, setUrl] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [templateVersion, setTemplateVersion] = useState('')

  // errors
  const [reqErr, setReqErr] = useState<Error | null>(null)

  // busy indicators
  const [formIsBusy, setFormIsBusy] = useState(false)
  const [tableIsBusy, setTableIsBusy] = useState(false)

  useEffect(() => {
    setTableIsBusy(true)

    Promise.all([getDeploymentTemplates(), getDeployments()])
      .then(([deploymentTemplates, deployments]) => {
        setDeploymentTemplates(deploymentTemplates)
        setDeployments(deployments)
        setReqErr(null)
      })
      .catch((err) => {
        setReqErr(err)
      })
      .then(() => {
        setTableIsBusy(false)
      })
  }, [])

  const handleNamedFieldChange = useCallback(
    (e: React.SyntheticEvent, { name, value }) => {
      switch (name) {
        case 'url':
          setUrl(value)
          return
        case 'templateName':
          setTemplateName(value)
          setTemplateVersion('')
          return
        case 'templateVersion':
          setTemplateVersion(value)
      }
    },
    []
  )

  const createDeployment = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      try {
        setFormIsBusy(true)
        const deployment = await createNewDeployment({
          url,
          templateName,
          version: templateVersion,
        })

        setDeployments([...deployments, deployment])
        setReqErr(null)
      } catch (err) {
        setReqErr(err)
      } finally {
        setFormIsBusy(false)
      }
    },
    [url, templateName, templateVersion]
  )

  const formIsFilled =
    url !== '' && templateName !== '' && templateVersion !== ''

  return (
    <div className="deployments">
      <Container>
        <Form onSubmit={createDeployment} loading={formIsBusy}>
          <Form.Input
            label="URL"
            name="url"
            value={url}
            onChange={handleNamedFieldChange}
          />
          <Form.Select
            label="Deployment template"
            name="templateName"
            value={templateName}
            onChange={handleNamedFieldChange}
            options={deploymentTemplates.map((dt) => ({
              text: dt.name,
              value: dt.name,
            }))}
            selectOnBlur={false}
          />
          <Form.Select
            label="Template version"
            name="templateVersion"
            value={templateVersion}
            onChange={handleNamedFieldChange}
            options={
              deploymentTemplates
                .find((dt) => dt.name === templateName)
                ?.versions.map((version) => ({
                  text: version,
                  value: version,
                })) || []
            }
            disabled={templateName === ''}
          />
          <Form.Button fluid color="instagram" disabled={!formIsFilled}>
            Create deployment
          </Form.Button>
        </Form>

        {tableIsBusy && <Loader active />}
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>URL</Table.HeaderCell>
              <Table.HeaderCell>Template name</Table.HeaderCell>
              <Table.HeaderCell>Template version</Table.HeaderCell>
              <Table.HeaderCell>Deployed at</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {deployments.map((deployment) => (
              <Table.Row key={deployment._id}>
                <Table.Cell>{deployment.url}</Table.Cell>
                <Table.Cell>{deployment.templateName}</Table.Cell>
                <Table.Cell>{deployment.version}</Table.Cell>
                <Table.Cell>{deployment.deployedAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </div>
  )
}
