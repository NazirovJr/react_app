import React, { useRef} from 'react'
import {useDispatch,shallowEqual,useSelector} from 'react-redux';
import { editCancel, editChange, editSubmit } from '../../store/actions';

export default function PostForm() {
     const dispatch = useDispatch();
     const edited  = useSelector((state) => state.edited,shallowEqual);
     const firstFocusEl = useRef(null);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(editSubmit());
        firstFocusEl.current.focus();
    };

    const handleReset = (ev) => {
        ev.preventDefault();
        dispatch(editCancel());
    }

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        dispatch(editChange(name, value));
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <textarea name="content" ref={firstFocusEl} value={edited.content || ''} onChange={handleChange}></textarea>
            <input name="tags"  value={edited.tags?.join(' ') || ''} onChange={handleChange}></input>
            <input name="photo"  placeholder="url"  onChange={handleChange}></input>
            <input name="alt" placeholder="alt"  onChange={handleChange}></input>
            <button >Ok</button>
        </form>
           {edited.id !== 0 ? <button onClick={handleReset}>Отменить</button> : null}
        </>
    )
};

