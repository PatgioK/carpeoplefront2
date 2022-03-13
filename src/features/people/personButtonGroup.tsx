import { PersonState } from "./peopleSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { destroyPersonAsync } from "./peopleSlice";

interface pbutgroop {
  dispatch: Dispatch<any>;
  person: PersonState;
  toggleEditForm: () => void;
  isEditing: boolean;
}

export function PersonButtonGroup(props: pbutgroop) {

    function handleDelClick(e: React.FormEvent<HTMLElement>) {
        const payload = {
            person: {
                person_id: props.person.id
                
            }
        }
        console.log(JSON.stringify(payload));
        props.dispatch(destroyPersonAsync(payload));
    }

  return (
    <div className='pbutgroup'>
      <button 
      className="btn-warning"
      onClick={() => props.toggleEditForm()}
      >{props.isEditing? "Cancel" :  "Edit"}</button>

      {props.isEditing? "" :  <button 
      className="btn-danger" 
      onClick={(e) => handleDelClick(e)}
      >Delete</button>}
    </div>
  );
}
