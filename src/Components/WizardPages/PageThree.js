import React from 'react';
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

const PageThree = (props) => {
    let diableButton = !props.likedColor || !props.about
    return (
        <div>
            <h4 className="text-center">Page Three</h4>
            <div className="row">
                <div className="col-md-3"> </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="sel1">Favorite Color:</label>
                        <select className="form-control" id="sel1" name="likedColor" value={props.likedColor} onChange={props.handleOnchange} >
                            <option value="" disabled>Choose a color</option>
                            {colors.map((val, index) => <option key={index}>{val}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            id="comment"
                            onChange={props.handleOnchange}
                            value={props.about}
                            name="about"
                        ></textarea>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                            name="employed"
                            checked={props.employed}
                            onChange={props.handleOnchange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck">Employed</label>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" className="btn btn-sm btn-success float-left" onClick={props.back}>Back</button>
                {props.update ?
                    <button type="button" disabled={diableButton} className="btn btn-sm btn-primary float-right" onClick={() => props.handleUpdate(props.updateId)}>Update</button>
                    :
                    <button type="button" disabled={diableButton} className="btn btn-sm btn-primary float-right" onClick={props.submit}>Submit</button>}
            </div>
        </div>
    )
};

export default PageThree;