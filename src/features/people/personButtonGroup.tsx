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



  const delButton = () => {
    let text = "Are you sure?";
    if(window.confirm(text) == true) {
      handleDelClick()
    } else {
      return;
    }
  }

    function handleDelClick(
      // e: React.FormEvent<HTMLElement>
      ) 
      {
        const payload = {
            person: {
                person_id: props.person.id
                
            }
        }
        // console.log(JSON.stringify(payload));
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
      onClick={delButton}
      >Delete</button>}
    </div>
  );
}
