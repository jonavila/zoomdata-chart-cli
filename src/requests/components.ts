import * as request from 'request-promise-native';
import { Component } from '../@types/zoomdata';
import { Config } from '../commands/config';
import { pick } from '../utilities';
import { send } from './index';

function getById(
  id: string,
  visualizationId: string,
  serverConfig: Config,
): Promise<Component> {
  const { application, username, password } = serverConfig;
  const url = `${application}/service/visualizations/${visualizationId}/components/${id}`;
  const requestOptions: request.Options = {
    auth: { username, password },
    headers: { 'content-type': 'application/vnd.zoomdata.v2+json' },
    url,
  };

  return send<Component>(requestOptions)
    .then(componentWithBody => componentWithBody)
    .catch(reason => {
      return Promise.reject(reason);
    });
}

function create(
  visualizationId: string,
  body: string,
  serverConfig: Config,
): Promise<Component> {
  const { application, username, password } = serverConfig;
  const url = `${application}/service/visualizations/${visualizationId}/components`;
  const requestOptions: request.Options = {
    auth: { username, password },
    body,
    headers: { 'content-type': 'application/vnd.zoomdata.v2+json' },
    method: 'POST',
    url,
  };

  return send<Component>(requestOptions).catch(reason => {
    return Promise.reject(reason);
  });
}

function remove(
  visualizationId: string,
  componentId: string,
  serverConfig: Config,
): Promise<void> {
  const { application, username, password } = serverConfig;
  const url = `${application}/service/visualizations/${visualizationId}/components/${componentId}`;
  const requestOptions: request.Options = {
    auth: { username, password },
    headers: { 'content-type': 'application/vnd.zoomdata.v2+json' },
    method: 'DELETE',
    url,
  };

  return send<void>(requestOptions).catch(reason => {
    return Promise.reject(reason);
  });
}

function updateBody(
  component: Component,
  body: string,
  serverConfig: Config,
): Promise<void> {
  const { id, visualizationId } = component;
  const { application, username, password } = serverConfig;
  const url = `${application}/service/visualizations/${visualizationId}/components/${id}`;
  const requestOptions: request.Options = {
    auth: { username, password },
    body: JSON.stringify({
      ...pick(component, 'name', 'order', 'type'),
      ...{ body },
    }),
    headers: { 'content-type': 'application/vnd.zoomdata.v2+json' },
    method: 'PUT',
    url,
  };

  return send<void>(requestOptions).catch(reason => {
    return Promise.reject(reason);
  });
}

export { getById, create, remove, updateBody };
