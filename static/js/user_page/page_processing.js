import {getUserData} from './user_data_js.js'
import {getListRoles} from './roles_data_js.js'

export function pageProcessing() {
    const accessJwtToken = localStorage.getItem('accessJwtToken');
    const refreshJwtToken = localStorage.getItem('refreshJwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': accessJwtToken,
        'refresh_token': refreshJwtToken
      }
    getUserData(headers)
    getListRoles(headers)
}