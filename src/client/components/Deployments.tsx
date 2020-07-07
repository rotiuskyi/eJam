import './Deployments.css'

import { useCallback, FormEvent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Form,
  Table,
  Loader,
  Grid,
  Icon,
  Confirm,
  Modal,
  Dimmer,
} from 'semantic-ui-react'
import { RootState } from 'store'
import {
  useGetDeploymentsData,
  useCreateDeployment,
  useDeleteDeployment,
} from 'store/deployments/deployments.dispatch-hooks'
import { IDeploymentsState } from 'store/deployments/deployments.state'

const NO_INDEX = -1

enum FormFieldName {
  URL = 'url',
  TemplateName = 'templateName',
  TemplateVersion = 'templateVersion',
}

export default () => {
  const {
    deploymentTemplates,
    deployments,
    isLoading,
    deploymentsIsChanging,
  } = useSelector<RootState, IDeploymentsState>(
    (state) => state.deploymentsState
  )
  const getDeploymentsData = useGetDeploymentsData()
  const createDeployment = useCreateDeployment()
  const deleteDeployment = useDeleteDeployment()

  // draft deployment data
  const [url, setUrl] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [templateVersion, setTemplateVersion] = useState('')

  // delete deployment confirm/modal
  const [deploymentIndexToDelete, setDeploymentIndexToDelete] = useState(
    NO_INDEX
  )

  useEffect(() => {
    getDeploymentsData()
  }, [])

  const namedFieldChangeHandler = useCallback((_, { name, value }) => {
    switch (name) {
      case FormFieldName.URL:
        setUrl(value)
        return
      case FormFieldName.TemplateName:
        setTemplateName(value)
        setTemplateVersion('')
        return
      case FormFieldName.TemplateVersion:
        setTemplateVersion(value)
    }
  }, [])

  const resetForm = () => {
    setUrl('')
    setTemplateName('')
    setTemplateVersion('')
  }

  const createDeploymentHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      createDeployment({ url, templateName, version: templateVersion }).then(
        resetForm
      )
    },
    [url, templateName, templateVersion]
  )

  const deleteDeploymentHandler = (index: number) => () => {
    setDeploymentIndexToDelete(index)
  }

  const deleteDeploymentCloseHandler = useCallback(() => {
    setDeploymentIndexToDelete(NO_INDEX)
  }, [])

  const deleteDeploymentConfirmHandler = useCallback(() => {
    if (deploymentIndexToDelete !== NO_INDEX) {
      deleteDeployment(deployments[deploymentIndexToDelete]._id).then(
        deleteDeploymentCloseHandler
      )
    }
  }, [deploymentIndexToDelete])

  const formIsFilled =
    url !== '' && templateName !== '' && templateVersion !== ''

  return (
    <Container className="deployments">
      <Grid>
        <Grid.Row>
          <Grid.Column width="4">
            <Form
              onSubmit={createDeploymentHandler}
              loading={deploymentsIsChanging}
            >
              <Form.Input
                label="URL"
                name={FormFieldName.URL}
                value={url}
                onChange={namedFieldChangeHandler}
              />
              <Form.Select
                label="Deployment template"
                name={FormFieldName.TemplateName}
                value={templateName}
                onChange={namedFieldChangeHandler}
                options={deploymentTemplates.map((dt) => ({
                  text: dt.name,
                  value: dt.name,
                }))}
                selectOnBlur={false}
              />
              <Form.Select
                label="Template version"
                name={FormFieldName.TemplateVersion}
                value={templateVersion}
                onChange={namedFieldChangeHandler}
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
          </Grid.Column>

          {deploymentIndexToDelete !== NO_INDEX && (
            <Confirm
              open
              closeIcon
              size="mini"
              content={
                <Modal.Content>
                  {deploymentsIsChanging && (
                    <Dimmer active>
                      <Loader active />
                    </Dimmer>
                  )}
                  Delete deployment #{deploymentIndexToDelete}?
                </Modal.Content>
              }
              confirmButton="Delete"
              onCancel={deleteDeploymentCloseHandler}
              onConfirm={deleteDeploymentConfirmHandler}
            />
          )}

          <Grid.Column width="12">
            <h5>Deployments list</h5>
            {isLoading && <Loader active />}
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>URL</Table.HeaderCell>
                  <Table.HeaderCell>Template name</Table.HeaderCell>
                  <Table.HeaderCell>Template version</Table.HeaderCell>
                  <Table.HeaderCell>Deployed at</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {deployments.map((deployment, i) => (
                  <Table.Row key={deployment._id}>
                    <Table.Cell>{i}</Table.Cell>
                    <Table.Cell>{deployment.url}</Table.Cell>
                    <Table.Cell>{deployment.templateName}</Table.Cell>
                    <Table.Cell>{deployment.version}</Table.Cell>
                    <Table.Cell>
                      {deployment.deployedAt.toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        link
                        name="trash"
                        onClick={deleteDeploymentHandler(i)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
