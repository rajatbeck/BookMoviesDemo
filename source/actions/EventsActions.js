/**
 * Created by rajatmareclbeck on 15/06/18.
 */
export const MODIFY_EVENT = "MODIFY_EVENT";


const modifyEvent = (events) => ({
    type: MODIFY_EVENT,
    events

});


export {modifyEvent};