import { polyfill } from 'es6-promise';
import request from 'axios';

import { ProjectTypes } from 'types';

polyfill();

export function newProject() {
  return {
    type: ProjectTypes.NEW_PROJECT,
  };
}

export function projectChange(state) {
  return {
    type: ProjectTypes.CHANGE_PROJECT,
    state
  };
}

export function projectsChange(state) {
  return {
    type: ProjectTypes.CHANGE_PROJECTS,
    state
  };
}

export function toggleProjectAdd (data) {
  return {
    type: ProjectTypes.TOGGLE_PROJECT_ADD,
    data: data
  };
}

export function toggleProjectEdit (data) {
  return {
    type: ProjectTypes.TOGGLE_PROJECT_EDIT,
    data: data
  };
}

function makeProjectsRequest(method, data, api = '/projects') {
  return request[method](api, data);
}

export function fetchProjects(profId) {
  let path = '/projects/me'
  if (profId) path = '/projects/' + profId
  return {
    type: ProjectTypes.GET_PROJECTS,
    promise: makeProjectsRequest('get', {}, path)
  };
}

export function createProjectRequest(data) {
  return {
    type: ProjectTypes.CREATE_PROJECT,
    data: data
  };
}

export function createProjectSuccess(data) {
  return {
    type: ProjectTypes.CREATE_PROJECT_SUCCESS,
    data: data
  };
}

export function createProjectFailure(data) {
  return {
    type: ProjectTypes.CREATE_PROJECT_FAILURE,
    error: data.error
  };
}

export function updateProjectRequest(data) {
  return {
    type: ProjectTypes.UPDATE_PROJECT,
    data: data
  }
}

export function updateProjectSuccess(data) {
  return {
    type: ProjectTypes.UPDATE_PROJECT_SUCCESS,
    data: data
  }
}

export function updateProjectFailure(data) {
  return {
    type: ProjectTypes.UPDATE_PROJECT_FAILURE,
    error: data.error
  };
}

export function createProject(projectData) {
  return (dispatch) => {
    dispatch(createProjectRequest(projectData));
    
    return makeProjectsRequest('post', projectData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createProjectSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createProjectFailure({ error: 'Oops! Something went wrong and we couldn\'t create your project.'}));
      });
  }
}

export function updateProject(projectData) {
  return (dispatch) => {
    dispatch(updateProjectRequest(projectData));
    
    return makeProjectsRequest('put', projectData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateProjectSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateProjectFailure({ error: 'Oops! Something went wrong and we couldn\'t create your project.'}));
      });
  }

}

export function deleteProjectRequest (data) {
  return {
    type: ProjectTypes.DELETE_PROJECT_REQUEST,
    data: data
  }
}

export function deleteProjectSuccess (data) {
  return {
    type: ProjectTypes.DELETE_PROJECT_SUCCESS,
    data: data
  }
}

export function deleteProjectFailure (data) {
  return {
    type: ProjectTypes.DELETE_PROJECT_FAILURE,
    error: data.error
  }
}

export function deleteProject(project) {
  return (dispatch) => {

    dispatch(deleteProjectRequest(project));

    return makeProjectsRequest('delete', project, '/project/' + project._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteProjectSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteProjectFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your project.'}));
      });
  }

}
