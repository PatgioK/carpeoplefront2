import { PersonState } from "./peopleSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import { destroyPersonAsync } from "./peopleSlice";

interface pbutgroop {
  dispatch: Dispatch<any>;
  person: PersonState;
  toggleEditForm: () => void;
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
      className="editbutton"
      onClick={() => props.toggleEditForm()}
      >Edit</button>

      <button 
      className="delbutton" 
      onClick={(e) => handleDelClick(e)}
      >Delete</button>
    </div>
  );
}
