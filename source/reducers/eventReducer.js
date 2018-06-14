/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import Images from "../assets/images";
const initialState = {
    event: [
        {
            id: 1,
            event_name: 'Mission Impossible 6',
            event_location: 'Brazil',
            event_date: '27 July,2018',
            status: 'none',
            img_url: Images.ic_first,
        },
        {
            id: 2,
            event_name: 'Jurassic World',
            event_location: 'SPAIN',
            event_date: '21 May,2018',
            status: 'Going',
            img_url: Images.ic_second,

        },
        {
            id: 3,
            event_name: 'Sicario 2',
            event_location: 'South Korea',
            event_date: '27 June,2018',
            status:'none',
            img_url: Images.ic_third,
        },
        {
            id: 4,
            event_name: 'Ant man and Wasp',
            event_location: 'Brazil',
            event_date: '5 July,2018',
            status: 'Interested',
            img_url: Images.ic_fourth,
        }

    ]
};


const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default eventReducer;