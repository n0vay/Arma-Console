import BaseService from "../../common/services/BaseService";
import {instance as axiosClient} from "../../common/helpers/axios";
export default class PatientService extends BaseService{
    constructor() {
      super()
    }

    fetchPatients(data) {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
        
        return axiosClient.get('patients', data,requestOptions)
      }

      registerPatient(state){
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          }
          const passwordTobeKept = ""+state.first_name+"1234";
          state.password = passwordTobeKept;
          delete state.errMsg;
          console.log(state);
          
          return axiosClient.post('patients', state,requestOptions)
      } 

}